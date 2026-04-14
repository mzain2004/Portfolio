import { NextResponse } from "next/server";

const GITHUB_USERNAME = "mzain2004";
const GITHUB_API_BASE = "https://api.github.com";

type Repo = {
  languages_url: string;
};

type ContributionsGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions?: number;
        };
      };
    };
  };
};

function getGitHubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchJson<T>(url: string, token: string, context: string): Promise<T> {
  const response = await fetch(url, {
    headers: getGitHubHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed for ${context}: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

async function fetchYearlyContributions(token: string): Promise<number> {
  const now = new Date();
  const yearStart = `${now.getUTCFullYear()}-01-01T00:00:00Z`;
  const yearEnd = `${now.getUTCFullYear()}-12-31T23:59:59Z`;

  const response = await fetch(`${GITHUB_API_BASE}/graphql`, {
    method: "POST",
    headers: getGitHubHeaders(token),
    cache: "no-store",
    body: JSON.stringify({
      query: `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `,
      variables: {
        login: GITHUB_USERNAME,
        from: yearStart,
        to: yearEnd,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as ContributionsGraphQLResponse;
  return payload.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
}

async function fetchPublicRepos(token: string): Promise<Repo[]> {
  const repos: Repo[] = [];
  let page = 1;

  while (true) {
    const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?type=owner&visibility=public&per_page=100&page=${page}`;
    const batch = await fetchJson<Repo[]>(url, token, `public repos page ${page}`);
    repos.push(...batch);

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  return repos;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      console.error("GitHub stats error: missing GITHUB_TOKEN environment variable.");
      return NextResponse.json(
        { error: "GitHub token is not configured." },
        { status: 500 }
      );
    }

    const yearlyContributions = await fetchYearlyContributions(token);

    const userUrl = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`;
    const userData = await fetchJson<{ public_repos: number }>(userUrl, token, "user profile");

    const repos = await fetchPublicRepos(token);
    const languages: Record<string, number> = {};

    await Promise.all(
      repos.map(async (repo, index) => {
        try {
          const repoLanguages = await fetchJson<Record<string, number>>(
            repo.languages_url,
            token,
            `repo languages ${index + 1}`
          );

          for (const [name, bytes] of Object.entries(repoLanguages)) {
            languages[name] = (languages[name] ?? 0) + bytes;
          }
        } catch (languageError) {
          console.error("GitHub stats warning: failed to fetch repo languages.", {
            repoLanguagesUrl: repo.languages_url,
            error: languageError,
          });
        }
      })
    );

    return NextResponse.json({
      totalCommits: yearlyContributions,
      publicRepos: userData.public_repos ?? 0,
      languages,
    });
  } catch (error) {
    console.error("GitHub stats error: failed to build response for mzain2004.", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub statistics." },
      { status: 500 }
    );
  }
}
