"use client";

import Image from "next/image";
import { useState } from "react";
import { services } from "@/data/portfolio";
import { img } from "@/lib/images";
import { Chip, Network, Orbit } from "./Glyphs";

const ART = [
  { photo: img.corridor, alt: "A long, bright corridor of server racks", Icon: Network },
  { photo: img.chip, alt: "An opened 486 processor showing the silicon die", Icon: Chip },
  { photo: img.array, alt: "Radio telescope dishes pointed at the same patch of sky", Icon: Orbit },
];

/** The amenities list: hover or focus a service and the photograph beside it changes. */
export function Services() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-center gap-10 md:grid-cols-12 lg:gap-20">
      <div className="relative aspect-[4/5] max-h-[78svh] overflow-hidden md:col-span-5">
        {ART.map(({ photo, alt }, i) => (
          <Image
            key={alt}
            src={photo}
            alt={alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            placeholder="blur"
            className={`object-cover transition-[opacity,transform] duration-[1200ms] ${
              i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
          />
        ))}
        <p className="label absolute bottom-4 left-4 text-paper mix-blend-difference">Fig. 0{active + 1}</p>
      </div>

      <ol className="md:col-span-7">
        {services.map((s, i) => {
          const { Icon } = ART[i];
          const on = i === active;
          return (
            <li key={s.title} className="border-b border-line">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="group flex w-full items-start gap-5 py-6 text-left"
              >
                <Icon className={`mt-1 size-9 shrink-0 transition-opacity ${on ? "opacity-100" : "opacity-30"}`} />
                <span className="min-w-0">
                  <span
                    className={`display block text-[clamp(1.8rem,3.2vw,2.6rem)] transition-colors duration-300 ${
                      on ? "text-ink" : "text-ink/35 group-hover:text-ink/70"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-md pt-3 leading-relaxed text-ink/65">{s.body}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
