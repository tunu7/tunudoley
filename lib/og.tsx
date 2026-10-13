import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Tunu Doley: an arch of clouds seen from orbit, with the name set across it. I build AI that actually works.";

const asset = (p: string) => readFile(join(process.cwd(), "assets", p));

const PAPER = "#f2f0eb";
const INK = "#1a1916";

/* Arch window, centred so a square crop (what most phone chat apps show) keeps the essentials. */
const ARCH = { x: 455, y: 92, w: 290, h: 440 };

/**
 * Shared social card for Open Graph and X/Twitter, echoing the hero: the name either side of
 * an arch of clouds on paper. Everything that matters sits inside the central 630×630 square.
 */
export async function renderOgImage() {
  const [photo, serif, serifItalic] = await Promise.all([
    asset("og-arch.jpg"),
    asset("fonts/InstrumentSerif-Regular.ttf"),
    asset("fonts/InstrumentSerif-Italic.ttf"),
  ]);
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  /*
   * The site's hero inverts the name where it crosses the photo (mix-blend-mode), which the
   * renderer here doesn't support. So: the name in ink, then again in paper clipped to the arch.
   */
  const Name = ({ color, dx = 0, dy = 0 }: { color: string; dx?: number; dy?: number }) => (
    <>
      <span style={{ position: "absolute", left: 300 - dx, top: 52 - dy, fontSize: 176, lineHeight: 0.8, letterSpacing: -1, color }}>TUNU</span>
      <span style={{ position: "absolute", left: 482 - dx, top: 418 - dy, fontSize: 176, lineHeight: 0.8, letterSpacing: -1, color }}>DOLEY</span>
    </>
  );
  const archBox = {
    position: "absolute",
    left: ARCH.x,
    top: ARCH.y,
    width: ARCH.w,
    height: ARCH.h,
    display: "flex",
    overflow: "hidden",
    borderRadius: `${ARCH.w / 2}px ${ARCH.w / 2}px 0 0`,
  } as const;
  const mono = { fontFamily: "sans-serif", fontSize: 17, letterSpacing: 4, color: "rgba(26,25,22,0.55)" };

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: PAPER, color: INK, fontFamily: "Instrument Serif" }}>
        {/* Arch window */}
        <div style={archBox}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" width={ARCH.w} height={ARCH.h} style={{ objectFit: "cover" }} />
        </div>

        {/* Atom, drawn over the clouds */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          style={{ position: "absolute", left: ARCH.x + ARCH.w / 2 - 100, top: ARCH.y + 120 }}
        >
          <g fill="none" stroke="rgba(242,240,235,0.8)" strokeWidth="1.6">
            <ellipse cx="100" cy="100" rx="82" ry="30" />
            <ellipse cx="100" cy="100" rx="82" ry="30" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="82" ry="30" transform="rotate(120 100 100)" />
            <circle cx="100" cy="100" r="9" />
          </g>
          <circle cx="100" cy="100" r="3.5" fill="rgba(242,240,235,0.9)" />
          <circle cx="182" cy="100" r="4.5" fill="rgba(242,240,235,0.9)" />
        </svg>

        {/* Name: TUNU over the arch's upper left, DOLEY over its lower right, as on the mobile hero */}
        <Name color={INK} />
        <div style={archBox}>
          <Name color={PAPER} dx={ARCH.x} dy={ARCH.y} />
        </div>

        {/* Margins: wordmark, URL and the line */}
        <div style={{ position: "absolute", left: 56, top: 48, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 38, lineHeight: 1 }}>Tunu Doley</span>
          <span style={{ ...mono, fontSize: 13, marginTop: 8 }}>TECH ENTREPRENEUR</span>
        </div>
        <span style={{ ...mono, position: "absolute", right: 56, top: 58 }}>TUNUDOLEY.IN</span>
        <div style={{ position: "absolute", left: 56, bottom: 48, display: "flex", flexDirection: "column", fontSize: 40, lineHeight: 1.05 }}>
          <span>I build AI that</span>
          <span>
            <span style={{ fontStyle: "italic" }}>actually</span>&nbsp;works.
          </span>
        </div>
        <span style={{ ...mono, position: "absolute", right: 56, bottom: 52 }}>BUILDING IN AI · INDIA</span>
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
