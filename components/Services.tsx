"use client";

import { useState } from "react";
import { services } from "@/data/portfolio";
import { glyphs, type GlyphName } from "./Glyphs";

const ART: GlyphName[] = ["Network", "Orbit", "Chip"];

/** Amenities-style list: hover or focus a service and the framed drawing beside it changes. */
export function Services() {
  const [active, setActive] = useState(0);
  const Art = glyphs[ART[active]];

  return (
    <div className="grid items-start gap-10 md:grid-cols-12 lg:gap-16">
      <div className="frame relative aspect-square bg-dark text-paper md:col-span-5 lg:col-span-4">
        <div key={active} className="fade-in absolute inset-0 grid place-items-center p-10">
          <Art className="w-full max-w-[18rem]" />
        </div>
        <p className="label absolute bottom-5 left-5 text-paper/55">Fig. 0{active + 1}</p>
      </div>

      <ol className="md:col-span-7 lg:col-span-8">
        {services.map((s, i) => (
          <li key={s.title} className="border-t border-line last:border-b">
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className="group flex w-full items-baseline gap-6 py-7 text-left"
            >
              <span className="label shrink-0 text-ink/45">0{i + 1}</span>
              <span>
                <span
                  className={`block font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] leading-none transition-colors duration-300 ${
                    i === active ? "text-ink" : "text-ink/35 group-hover:text-ink/70"
                  }`}
                >
                  {s.title}
                </span>
                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                    i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="block max-w-md pt-4 leading-relaxed text-ink/70">{s.body}</span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
