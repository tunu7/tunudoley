"use client";

import Image from "next/image";
import { useRef } from "react";
import { ventures } from "@/data/portfolio";
import { img } from "@/lib/images";
import { useScrollVar } from "./useScrollVar";
import { FloorPlan, PLANS, TONE } from "./FloorPlan";

const PHOTOS = [
  { photo: img.launch, alt: "A rocket's long-exposure arc over the sea at dusk" },
  { photo: img.tunnel, alt: "The Large Hadron Collider tunnel" },
  { photo: img.chip, alt: "An opened 486 processor showing its silicon die" },
];

const PANELS = ventures.length + 2;

/**
 * Ventures as a pinned horizontal gallery: vertical scroll drives the track sideways on
 * large screens, while each arch photo slides at its own speed for depth. Stacks on mobile.
 */
export function Chapters() {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref, "track");

  return (
    <section
      ref={ref}
      id="ventures"
      data-rail="03"
      aria-labelledby="ventures-heading"
      className="chapters relative bg-dark text-paper"
      style={{ "--n": PANELS } as React.CSSProperties}
    >
      <div className="chapters-pin">
        <div className="chapters-track">
          {/* Intro */}
          <div className="chapter-panel flex flex-col justify-center px-5 py-28 sm:px-8 lg:px-24">
            <p className="label text-paper/55">(02) The work</p>
            <h2 id="ventures-heading" className="display mt-6 text-[clamp(3.4rem,8vw,8rem)]">
              Where my
              <br />
              <em>hours go.</em>
            </h2>
            <p className="mt-8 max-w-md text-lg text-paper/65">
              One company. A few client projects. Way too many side experiments. Three floors of the same building.
            </p>
            <p className="label mt-12 hidden items-center gap-4 text-paper/50 lg:flex">
              Keep scrolling <span className="block h-px w-16 bg-current" /> →
            </p>
          </div>

          {ventures.map((v, i) => (
            <article
              key={v.id}
              className="chapter-panel grid content-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-24"
              style={{ "--i": i + 1 } as React.CSSProperties}
              aria-labelledby={`chapter-${v.id}`}
            >
              <div className="relative lg:col-span-5">
                <span
                  aria-hidden="true"
                  className="chapter-number caps pointer-events-none absolute -top-[0.28em] left-[-0.06em] z-0 text-[clamp(9rem,22vw,20rem)]"
                >
                  {v.id}
                </span>
                <div className="arch relative z-10 ml-auto aspect-[3/4] w-[min(100%,24rem)] lg:mr-6">
                  <div className="chapter-photo absolute -inset-x-[18%] inset-y-0">
                    <Image src={PHOTOS[i].photo} alt={PHOTOS[i].alt} fill sizes="(min-width: 1024px) 30vw, 90vw" placeholder="blur" className="object-cover" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <p className="label text-paper/50">
                  Chapter {v.id} · {v.status}
                </p>
                <h3 id={`chapter-${v.id}`} className="caps mt-4 text-[clamp(2.8rem,5vw,4.6rem)]">
                  {v.name}
                </h3>
                <p className="label mt-4 text-paper/50">{v.category}</p>
                <p className="mt-6 max-w-lg leading-relaxed text-paper/75">{v.description}</p>
                <div className="mt-8 max-w-md border-t border-paper/15 pt-6">
                  <FloorPlan level={i} />
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {PLANS[i].legend.map(([tone, text]) => (
                      <li key={text} className="label flex items-center gap-2 text-paper/60">
                        <span className="size-2.5" style={{ background: TONE[tone] }} />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}

          {/* Outro */}
          <div className="chapter-panel relative grid place-items-center overflow-hidden px-5 text-center">
            <Image src={img.nebula} alt="The Tarantula Nebula, imaged by the James Webb Space Telescope" fill sizes="100vw" placeholder="blur" className="object-cover opacity-70" />
            <div className="relative">
              <p className="label text-paper/70">Chapter 04 · Always on</p>
              <p className="display mt-6 text-[clamp(2.8rem,6.5vw,6.5rem)]">
                Most die quietly.
                <br />
                <em>The good ones sneak into everything else.</em>
              </p>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="label absolute inset-x-5 bottom-6 hidden items-center gap-5 text-paper/50 sm:inset-x-8 lg:inset-x-24 lg:flex">
          <span>The work</span>
          <span className="relative h-px flex-1 bg-paper/20">
            <span className="chapters-progress absolute inset-y-0 left-0 bg-paper" />
          </span>
          <span className="tabular-nums">0{PANELS}</span>
        </div>
      </div>
    </section>
  );
}
