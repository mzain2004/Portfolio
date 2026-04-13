import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Zain | Cyber Security Engineer",
  description:
    "Founder of Phish-Slayer. Building Next-Gen EDR platforms with AI threat intelligence, real-time WebSocket monitoring, and secure cloud architecture.",
  icons: {
    icon: "/favicon.svg",
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
