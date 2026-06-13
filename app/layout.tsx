import "./globals.css";
import type { Metadata } from "next";
import { Inter, Barlow, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import { content } from "@/config/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Muhammad Zain — CEO & Director, Cygnus Ventures | Founder of PhishSlayer",
    template: "%s | Muhammad Zain",
  },
  description:
    "Muhammad Zain is CEO & Director of Cygnus Ventures SMC Pvt Ltd and founder of PhishSlayer, building autonomous SOC intelligence and MSSP-focused cybersecurity automation.",
  keywords: [
    "Muhammad Zain",
    "Cygnus Ventures",
    "Cygnus Ventures SMC Pvt Ltd",
    "PhishSlayer",
    "autonomous SOC",
    "SOC intelligence platform",
    "MSSP platform",
    "cybersecurity founder",
    "security engineer",
    "AI SOC",
    "LangGraph",
    "Wazuh",
    "Microsoft Azure",
    "Next.js",
    "Docker",
    "CI/CD",
    "DevSecOps",
    "phishing investigation",
    "identity investigation",
    "threat intelligence",
  ],
  authors: [{ name: "Muhammad Zain", url: siteConfig.url }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Muhammad Zain — CEO & Director, Cygnus Ventures | Founder of PhishSlayer",
    description:
      "Muhammad Zain is CEO & Director of Cygnus Ventures SMC Pvt Ltd and founder of PhishSlayer, building autonomous SOC intelligence and MSSP-focused cybersecurity automation.",
    url: siteConfig.url,
    siteName: "mzain.me",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Zain — CEO & Director, Cygnus Ventures | Founder of PhishSlayer",
    description:
      "Muhammad Zain is CEO & Director of Cygnus Ventures SMC Pvt Ltd and founder of PhishSlayer, building autonomous SOC intelligence and MSSP-focused cybersecurity automation.",
    creator: "@mzain2004",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: content.hero.name,
  url: siteConfig.url,
  jobTitle: "CEO & Director, Security Founder",
  description: content.hero.philosophy,
  email: siteConfig.email,
  sameAs: siteConfig.socials.map((s) => s.href),
  worksFor: {
    "@type": "Organization",
    name: "Cygnus Ventures SMC Pvt Ltd",
  },
  brand: {
    "@type": "Brand",
    name: "PhishSlayer",
    url: siteConfig.phishSlayerUrl,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Air University Multan Campus",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
