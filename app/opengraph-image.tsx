import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Muhammad Zain | CEO & Director, Cygnus Ventures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #090d16 100%)",
          color: "#f4f4f5",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#38bdf8",
            marginBottom: 24,
          }}
        >
          CEO & Director · Security Founder
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>
          Muhammad Zain
        </div>
        <div style={{ fontSize: 28, color: "#a1a1aa", maxWidth: 800, lineHeight: 1.4 }}>
          Founder of PhishSlayer · Autonomous SOC Intelligence for MSSPs
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            fontSize: 20,
            color: "#71717a",
          }}
        >
          <span>mzain.me</span>
          <span>·</span>
          <span>phishslayer.tech</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
