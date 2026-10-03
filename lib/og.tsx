import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Tunu Doley: I build AI that actually works. Not just in demos.";

/** Shared social card used for both Open Graph and X/Twitter: the site's paper and ink. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#eeebe4",
          color: "#0e0e0e",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, color: "#6b6a66" }}>
          <span>FOUNDER · AI · PRODUCT ENGINEER</span>
          <span>TUNUDOLEY.IN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 200, fontWeight: 800, lineHeight: 0.86, letterSpacing: -12 }}>
          <span>Tunu</span>
          <span style={{ alignSelf: "flex-end" }}>Doley</span>
        </div>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: -1.5 }}>
          <span>I build AI that actually works.&nbsp;</span>
          <span style={{ color: "#ff4a1c" }}>Not just in demos.</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
