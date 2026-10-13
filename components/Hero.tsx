"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { founder } from "@/data/portfolio";
import { img } from "@/lib/images";
import { useScrollVar } from "./useScrollVar";
import { Atom } from "./Glyphs";

/**
 * The window. Name on paper either side of an arch; the photo and the atom inside sit at
 * different depths and drift with the pointer. Scrolling opens the arch to full bleed.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref, "track");

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={ref} id="top" data-rail="01" aria-labelledby="hero-heading" className="hero relative h-[260svh] bg-paper">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-paper">
        {/* The window */}
        <div className="hero-window absolute inset-0 bg-dark text-paper">
          <div className="hero-photo absolute -inset-[6%]">
            <Image
              src={img.hero}
              alt="Clouds over Southeast Asia at sunrise, seen from orbit"
              fill
              sizes="100vw"
              placeholder="blur"
              preload
              className="object-cover"
            />
          </div>
          <div className="hero-shade absolute inset-0 bg-dark" />
          <Atom className="hero-atom absolute left-1/2 top-[44%] w-[min(46vw,24rem)] text-paper/70" />

          {/* What you find once you are through the window */}
          <div className="hero-inside absolute inset-x-0 bottom-0 px-5 pb-12 sm:px-8 lg:px-24 lg:pb-16">
            <p className="label text-paper/60">(00) Why AI?</p>
            <p className="display mt-5 max-w-4xl text-[clamp(2.2rem,4.6vw,4.4rem)]">
              AI just opened up a whole new pile of <em>hard problems worth solving.</em>
            </p>
            <p className="mt-6 max-w-md text-paper/70">
              So I&apos;m building a company around it, and I bring the same hands-on habit to every client project.
            </p>
          </div>
        </div>

        {/* Name, either side of the arch */}
        <h1 id="hero-heading" className="hero-name caps pointer-events-none absolute inset-0 text-white mix-blend-difference">
          <span className="hero-tunu absolute">
            <span className="hero-in block">Tunu</span>
          </span>
          <span className="hero-doley absolute">
            <span className="hero-in block" style={{ "--d": "0.12s" } as React.CSSProperties}>
              Doley
            </span>
          </span>
        </h1>

        <div className="hero-meta absolute inset-x-0 bottom-0">
        <div className="hero-in grid grid-cols-2 items-end gap-6 px-5 pb-7 text-ink sm:px-8 lg:grid-cols-3 lg:px-12" style={{ "--d": "0.3s" } as React.CSSProperties}>
          <p className="display max-w-[16rem] text-xl leading-tight sm:text-2xl">
            I build AI that <em>actually</em> works.
          </p>
          <p className="label hidden text-center text-ink/55 lg:block">Scroll into the window ↓</p>
          <p className="label text-right text-ink/55">
            Founder · AI
            <br />
            {founder.location}
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
