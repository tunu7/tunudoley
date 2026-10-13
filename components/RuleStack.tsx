"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { principles } from "@/data/portfolio";
import { img } from "@/lib/images";
import { glyphs, type GlyphName } from "./Glyphs";

const CARDS: { photo: (typeof img)[keyof typeof img]; icon: GlyphName }[] = [
  { photo: img.launch, icon: "Pendulum" },
  { photo: img.nebula, icon: "Prism" },
  { photo: img.blackboard, icon: "Network" },
  { photo: img.chip, icon: "Chip" },
  { photo: img.array, icon: "Orbit" },
  { photo: img.racks, icon: "Code" },
  { photo: img.observatory, icon: "Wave" },
  { photo: img.sunrise, icon: "Atom" },
];

/**
 * The eight rules as a deck of sticky photo cards. Each card sinks back (smaller, darker)
 * as the next one slides over it, so the stack reads in depth.
 */
export function RuleStack() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const top = next.getBoundingClientRect().top;
        const stuck = card.getBoundingClientRect().top;
        const cover = Math.min(1, Math.max(0, 1 - (top - stuck) / (vh - stuck)));
        card.style.setProperty("--c", cover.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className="rule-stack space-y-[18svh] pb-[8svh]">
      {principles.map((rule, i) => {
        const { photo, icon } = CARDS[i];
        const Icon = glyphs[icon];
        return (
          <li
            key={rule}
            className="rule-card sticky h-[78svh] min-h-[28rem]"
            style={{ "--i": i, top: `calc(5.5rem + ${i} * 0.9rem)` } as React.CSSProperties}
          >
            <div className="rule-card-inner relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-dark p-6 text-paper shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-10 lg:p-14">
              <Image src={photo} alt="" fill sizes="100vw" placeholder="blur" className="object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-dark/10" />
              <div className="relative flex items-start justify-between">
                <span className="label text-paper/70">
                  Rule {String(i + 1).padStart(2, "0")} / {String(principles.length).padStart(2, "0")}
                </span>
                <Icon className="size-14 text-paper/80 sm:size-20" />
              </div>
              <p className="display relative max-w-5xl text-[clamp(2.8rem,7.5vw,7.5rem)]">{rule}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
