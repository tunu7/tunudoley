"use client";

import { useRef, useState } from "react";
import { Tilt } from "./Tilt";

type Venture = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: string;
};

const SKINS = [
  "bg-[#fffaf0] text-ink",
  "bg-ink text-paper",
  "bg-sky text-ink",
];

/** A swipeable 3D deck of venture cards. */
export function VentureStack({ ventures }: { ventures: Venture[] }) {
  const n = ventures.length;
  const [index, setIndex] = useState(0);
  const [tossing, setTossing] = useState<number | null>(null);
  const dragStart = useRef<number | null>(null);

  const next = () => {
    if (tossing !== null) return;
    setTossing(index);
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % n);
      setTossing(null);
    }, 380);
  };

  const prev = () => {
    if (tossing !== null) return;
    setIndex((i) => (i - 1 + n) % n);
  };

  const goTo = (i: number) => {
    if (tossing !== null || i === index) return;
    setIndex(i);
  };

  return (
    <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-center">
      <div>
        <ul className="flex flex-col gap-1" aria-label="Choose a venture">
          {ventures.map((v, i) => (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === index}
                className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                  i === index ? "bg-ink text-paper" : "hover:bg-ink/5"
                }`}
              >
                <span className="font-mono text-xs opacity-50">{v.id}</span>
                <span className="text-lg font-medium tracking-tight">{v.name}</span>
                <span className="ml-auto text-sm opacity-60 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 px-4">
          <button type="button" onClick={prev} className="key-btn" aria-label="Previous venture">
            ←
          </button>
          <button type="button" onClick={next} className="key-btn" aria-label="Next venture">
            →
          </button>
          <span className="ml-2 text-sm text-ink/50">or swipe the card</span>
        </div>
      </div>

      <div
        className="deck relative grid touch-pan-y select-none pt-14"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
        onPointerDown={(e) => (dragStart.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragStart.current === null) return;
          const dx = e.clientX - dragStart.current;
          dragStart.current = null;
          if (dx < -50) next();
          else if (dx > 50) prev();
        }}
        onPointerCancel={() => (dragStart.current = null)}
      >
        {ventures.map((v, i) => {
          const offset = (i - index + n) % n;
          const isTossing = tossing === i;
          const transform = isTossing
            ? "translate3d(-120%, -30px, 120px) rotateY(35deg) rotateZ(-14deg)"
            : `translate3d(0, ${offset * -26}px, ${offset * -110}px) rotateX(${offset * 6}deg)`;

          return (
            <article
              key={v.id}
              aria-hidden={offset !== 0}
              className="deck-card col-start-1 row-start-1"
              style={{
                transform,
                zIndex: isTossing ? n + 1 : n - offset,
                opacity: offset > 2 ? 0 : 1,
              }}
            >
              <Tilt className={`h-full rounded-[28px] ${SKINS[i % SKINS.length]}`} max={8}>
                <div className="flex h-full min-h-[340px] flex-col p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)] sm:p-9 rounded-[28px]">
                  <div className="pop-z flex items-start justify-between gap-4">
                    <span className="font-serif text-7xl leading-none italic opacity-90">{v.id}</span>
                    <span className="rounded-full border border-current/20 px-3 py-1 text-xs">
                      ● {v.status}
                    </span>
                  </div>
                  <div className="pop-z-sm mt-auto pt-10">
                    <h3 className="text-3xl font-medium tracking-tight">{v.name}</h3>
                    <p className="mt-1 text-sm opacity-60">{v.category}</p>
                    <p className="mt-5 max-w-lg leading-relaxed opacity-75">{v.description}</p>
                  </div>
                </div>
              </Tilt>
            </article>
          );
        })}
      </div>
    </div>
  );
}
