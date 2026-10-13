"use client";

import Image, { type StaticImageData } from "next/image";
import { Fragment, useRef } from "react";
import { img } from "@/lib/images";
import { useScrollVar } from "./useScrollVar";

type Token = string | { photo: StaticImageData; alt: string };

/* The about copy, word by word, with small photographs set into the line like editorial inline art. */
const TEXT: Token[] = [
  "Some people pitch. I'd rather ship. I write the code,",
  { photo: img.code, alt: "Code on a monitor" },
  "talk to the users",
  { photo: img.blackboard, alt: "A discussion at a blackboard" },
  "and fix the thing at 2am,",
  { photo: img.racks, alt: "Server rack status lights" },
  "because that's how you actually find out what works.",
];

/** Words light up in reading order as the paragraph crosses the screen. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollVar(ref, "through", { start: 0.9, end: 0.2 });

  let w = 0;
  const parts = TEXT.map((t, i) => {
    if (typeof t !== "string") {
      const idx = w++;
      return (
        <span
          key={i}
          className="manifesto-word manifesto-photo relative mx-[0.12em] inline-block h-[0.78em] w-[1.5em] overflow-hidden rounded-full align-baseline"
          style={{ "--w": idx } as React.CSSProperties}
        >
          <Image src={t.photo} alt={t.alt} fill sizes="8rem" placeholder="blur" className="object-cover" />
        </span>
      );
    }
    return (
      <Fragment key={i}>
        {t.split(" ").map((word, j) => (
          <Fragment key={j}>
            <span className="manifesto-word" style={{ "--w": w++ } as React.CSSProperties}>
              {word}
            </span>{" "}
          </Fragment>
        ))}
      </Fragment>
    );
  });

  return (
    <p ref={ref} className="manifesto display text-[clamp(2.3rem,5.6vw,5.4rem)] leading-[1.02]" style={{ "--n": w } as React.CSSProperties}>
      {parts}
    </p>
  );
}
