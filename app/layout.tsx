import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mzain.me"),
  title: {
    default: "Muhammad Zain",
    template: "%s | Muhammad Zain",
  },
  description:
    "Founder of PhishSlayer, an AI powered SOC SaaS. BS Cybersecurity student at Air University Multan. Building threat intelligence infrastructure from scratch.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Muhammad Zain",
    description:
      "Founder of PhishSlayer, an AI powered SOC SaaS. BS Cybersecurity student at Air University Multan. Building threat intelligence infrastructure from scratch.",
    url: "https://mzain.me",
    siteName: "mzain.me",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Zain",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Zain",
    description:
      "Founder of PhishSlayer, an AI powered SOC SaaS. BS Cybersecurity student at Air University Multan. Building threat intelligence infrastructure from scratch.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
