import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Tunu Doley: founder building an AI company, open to interesting work";

/** Shared social card used for both Open Graph and X/Twitter. */
export function renderOgImage() {
  const dots = Array.from({ length: 180 }, (_, i) => {
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / 180);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    return {
      x: 930 + Math.cos(theta) * Math.sin(phi) * 190,
      y: 315 + Math.cos(phi) * 190,
      z: Math.sin(theta) * Math.sin(phi),
      accent: i % 9 === 0,
    };
  }).filter((d) => d.z > -0.2);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0a0b",
          color: "#f4f4f5",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: 6,
              height: 6,
              borderRadius: 6,
              background: d.accent ? "#c6ff3d" : "#e9e9ec",
              opacity: 0.35 + d.z * 0.5,
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 680 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "#c6ff3d",
                color: "#0a0a0b",
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              TD
            </div>
            Tunu Doley
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.05 }}>
            <span>Building an AI company.</span>
            <div style={{ display: "flex", flexWrap: "wrap", color: "#8a8a8f" }}>
              <span style={{ flexShrink: 0 }}>{"Open to\u00a0"}</span>
              <span style={{ flexShrink: 0, color: "#c6ff3d" }}>{"interesting\u00a0"}</span>
              <span style={{ flexShrink: 0 }}>work.</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#a1a1a6" }}>tunudoley.in</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
