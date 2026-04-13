import { NextResponse } from 'next/server';

const GITHUB_JOIN_DATE = '2022-10-09T00:00:00Z';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function githubGraphQL<T>(token: string, query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${json.errors[0].message}`);
  }
  if (!json.data) {
    throw new Error('GitHub GraphQL error: Missing data payload');
  }

  return json.data;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("WARNING: GITHUB_TOKEN is missing in the environment variables.");
    return NextResponse.json(
      { error: "Internal Server Error: Missing Configuration" },
      { status: 500 }
    );
  }

  try {
    // Fetch ALL-TIME commits using the REST Search API
    const commitRes = await fetch(
      'https://api.github.com/search/commits?q=author:mzain2004',
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.cloak-preview+json',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!commitRes.ok) {
      throw new Error('Failed to fetch commit data');
    }

    const commitData = await commitRes.json() as { total_count?: number };
    const allTimeCommits = commitData.total_count ?? 0;

    // Build year ranges from join date to present for all-time stats
    const startYear = new Date(GITHUB_JOIN_DATE).getFullYear();
    const currentYear = new Date().getFullYear();
    const yearRanges: { from: string; to: string }[] = [];

    for (let year = startYear; year <= currentYear; year++) {
      const from = year === startYear
        ? GITHUB_JOIN_DATE
        : `${year}-01-01T00:00:00Z`;
      const to = year === currentYear
        ? new Date().toISOString()
        : `${year + 1}-01-01T00:00:00Z`;
      yearRanges.push({ from, to });
    }

    // Build a single GraphQL query with aliased contributionsCollection per year
    const contributionFragments = yearRanges
      .map((range, i) => `
        year${i}: contributionsCollection(from: "${range.from}", to: "${range.to}") {
          contributionCalendar {
            totalContributions
          }
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
        }
      `)
      .join('\n');

    const query = `
      query {
        viewer {
          repositories(privacy: PUBLIC, affiliations: OWNER) {
            totalCount
          }
          ${contributionFragments}
        }
      }
    `;

    const contributionData = await githubGraphQL<{
      viewer: {
        repositories: { totalCount: number };
        [key: string]: {
          contributionCalendar: { totalContributions: number };
          totalCommitContributions: number;
          totalPullRequestContributions: number;
          totalPullRequestReviewContributions: number;
        } | { totalCount: number };
      };
    }>(token, query);

    const viewer = contributionData.viewer;
  const publicRepos = viewer.repositories.totalCount;
  const totalCommits = allTimeCommits;

    // Sum all-time contribution surfaces across every year range.
    let totalPRs = 0;
    let totalReviews = 0;

    for (let i = 0; i < yearRanges.length; i++) {
      const yearData = viewer[`year${i}`] as {
        contributionCalendar: { totalContributions: number };
        totalPullRequestContributions: number;
        totalPullRequestReviewContributions: number;
      };
      totalPRs += yearData.totalPullRequestContributions || 0;
      totalReviews += yearData.totalPullRequestReviewContributions || 0;
    }

    const totalContributions = yearRanges.reduce((sum, _, i) => {
      const yearData = viewer[`year${i}`] as { contributionCalendar: { totalContributions: number } };
      return sum + (yearData.contributionCalendar.totalContributions || 0);
    }, 0);

    return NextResponse.json({
      totalCommits,
      totalContributions,
      totalPRs,
      totalReviews,
      publicRepos,
      codingHours: 850  // Static fallback — deep commit parsing would be needed for accuracy
    });

  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub statistics" },
      { status: 500 }
    );
  }
}
