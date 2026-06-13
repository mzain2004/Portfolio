type SiteConfig = {
  url: string;
  phishSlayerUrl: string;
  email: string;
  resumeUrl?: string;
  socials: Array<{
    name: string;
    href: string;
    iconName: "github" | "linkedin" | "twitter";
  }>;
};

export const siteConfig: SiteConfig = {
  url: "https://mzain.me",
  phishSlayerUrl: "https://phishslayer.tech",
  email: "zain@cygnusventures.dev",
  // resumeUrl: "/resume.pdf", // TODO: Add public/resume.pdf when available
  socials: [
    {
      name: "GitHub",
      href: "https://github.com/mzain2004/",
      iconName: "github",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mzain-founder/",
      iconName: "linkedin",
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/mzain2004",
      iconName: "twitter",
    },
  ],
};
