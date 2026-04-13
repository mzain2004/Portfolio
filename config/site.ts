type SiteConfig = {
  phishSlayerUrl: string;
  email: string;
  socials: Array<{
    name: string;
    href: string;
    iconName: "github" | "linkedin" | "twitter";
  }>;
};

export const siteConfig: SiteConfig = {
  phishSlayerUrl: "https://phishslayer.tech",
  email: "zainrana605890@gmail.com",
  socials: [
    {
      name: 'GitHub',
      href: 'https://github.com/mzain2004/',
      iconName: 'github'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mzain-founder/',
      iconName: 'linkedin'
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/mzain2004',
      iconName: 'twitter'
    }
  ]
};
