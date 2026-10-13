import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Tunu Doley, a founder building AI that actually works, over clouds seen from orbit.";

const asset = (p: string) => readFile(join(process.cwd(), "assets", p));

/** Shared social card for Open Graph and X/Twitter: the site's title card over the clouds. */
export async function renderOgImage() {
  const [photo, serif, serifItalic] = await Promise.all([
    asset("og-hero.jpg"),
    asset("fonts/InstrumentSerif-Regular.ttf"),
    asset("fonts/InstrumentSerif-Italic.ttf"),
  ]);
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const paper = "#f2f0eb";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0c0c0b" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background: "linear-gradient(90deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.45) 50%, rgba(8,8,8,0.1) 85%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "48px 72px 56px",
            color: paper,
            fontFamily: "Instrument Serif",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, lineHeight: 1 }}>Tunu Doley</span>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, letterSpacing: 4, opacity: 0.6, marginTop: 6 }}>
                FOUNDER · AI
              </span>
            </div>
            <span style={{ fontFamily: "sans-serif", fontSize: 15, letterSpacing: 4, opacity: 0.7 }}>TUNUDOLEY.IN</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 168, lineHeight: 0.84 }}>
              <span>TUNU</span>
              <span>DOLEY</span>
            </div>
            <div style={{ display: "flex", width: 56, height: 1, background: paper, opacity: 0.6, marginTop: 30 }} />
            <div style={{ display: "flex", alignItems: "baseline", marginTop: 22, fontSize: 40 }}>
              <span>I build AI that&nbsp;</span>
              <span style={{ fontStyle: "italic" }}>actually</span>
              <span>&nbsp;works.&nbsp;</span>
              <span style={{ opacity: 0.5 }}>Not just in demos.</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}
