"use client";

import { useState } from "react";
import { Tilt } from "./Tilt";

export function FlipCard({
  name,
  location,
  email,
}: {
  name: string;
  location: string;
  email: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Tilt className="mx-auto w-full max-w-[340px] rounded-[28px]" max={14} glare={false}>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? "Flip card to front" : "Flip card to see quick facts"}
        className="flip-card block aspect-[3/4] w-full cursor-pointer rounded-[28px] text-left"
        data-flipped={flipped}
      >
        {/* Front */}
        <span className="flip-face flex flex-col justify-between rounded-[28px] bg-accent p-7 text-white shadow-[0_30px_80px_-20px_rgba(255,91,41,0.6)]">
          <span className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/80">
            <span>Hello card</span>
            <span>No. 001</span>
          </span>
          <span className="pop-z block">
            <span className="block font-serif text-[7.5rem] leading-[0.8] italic">
              TD
            </span>
            <span className="mt-4 block text-2xl font-medium tracking-tight">{name}</span>
            <span className="block text-white/80">Founder, building in AI · {location}</span>
          </span>
          <span className="flex items-center gap-2 text-sm text-white/90">
            <span className="inline-block animate-[spin_4s_linear_infinite]">↻</span>
            Tap to flip
          </span>
        </span>

        {/* Back */}
        <span className="flip-face flip-back flex flex-col justify-between rounded-[28px] bg-ink p-7 text-paper shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
          <span className="text-xs uppercase tracking-[0.18em] text-paper/50">Quick facts</span>
          <span className="pop-z flex flex-col gap-3 text-base">
            <Fact label="Currently" value="Building an AI company" />
            <Fact label="Also" value="Taking on select projects" />
            <Fact label="Based in" value={location} />
            <Fact label="Reach me" value={email} />
          </span>
          <span className="text-sm text-paper/50">↻ Tap to flip back</span>
        </span>
      </button>
    </Tilt>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <span className="block border-b border-paper/10 pb-2.5">
      <span className="block text-[11px] uppercase tracking-[0.16em] text-paper/45">{label}</span>
      <span className="block break-words">{value}</span>
    </span>
  );
}
