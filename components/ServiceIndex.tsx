"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/portfolio";
import { img } from "@/lib/images";
import { Chip, Network, Orbit } from "./Glyphs";

const ART = [
  { photo: img.corridor, alt: "A long, bright corridor of server racks", Icon: Network },
  { photo: img.streak, alt: "A sounding rocket climbing into the night", Icon: Chip },
  { photo: img.array, alt: "Radio telescope dishes pointed at the same patch of sky", Icon: Orbit },
];

/**
 * Services as an editorial index. On pointer devices an arch-framed photograph follows the
 * cursor, lagging slightly behind it; on touch the photo sits inline in each row.
 */
export function ServiceIndex() {
  const [active, setActive] = useState<number | null>(null);
  const float = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = float.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${((tx - x) * 0.04).toFixed(2)}deg)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX + 28;
      ty = e.clientY - 140;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div onMouseLeave={() => setActive(null)}>
      <ol className="border-t border-ink">
        {services.map((s, i) => {
          const { Icon, photo, alt } = ART[i];
          return (
            <li
              key={s.title}
              onMouseEnter={() => setActive(i)}
              className="service-row group grid gap-5 border-b border-line py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10"
            >
              <div className="flex items-center gap-5 md:col-span-1">
                <span className="label text-ink/45">0{i + 1}</span>
              </div>
              <h3 className="display text-[clamp(2.4rem,5.4vw,5rem)] transition-transform duration-700 ease-out md:col-span-6 group-hover:md:translate-x-4">
                {s.title}
              </h3>
              <div className="flex items-start gap-4 md:col-span-4 md:col-start-9">
                <Icon className="size-9 shrink-0 text-ink/70" />
                <p className="leading-relaxed text-ink/65">{s.body}</p>
              </div>
              <div className="arch relative aspect-[4/3] w-full md:hidden">
                <Image src={photo} alt={alt} fill sizes="90vw" placeholder="blur" className="object-cover" />
              </div>
            </li>
          );
        })}
      </ol>

      {/* Cursor-following preview (desktop) */}
      <div
        ref={float}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:md:block"
      >
        <div
          className={`arch relative aspect-[3/4] w-56 transition-[opacity,scale] duration-500 ${
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {ART.map(({ photo }, i) => (
            <Image
              key={i}
              src={photo}
              alt=""
              fill
              sizes="14rem"
              placeholder="blur"
              className={`object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
