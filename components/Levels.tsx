"use client";

import { useId, useState } from "react";
import { ventures } from "@/data/portfolio";

type Zone = { x: number; y: number; w: number; h: number; tone: "olive" | "indigo" | "amber"; label: string };

/* Each venture drawn as a floor plan: what it is made of, room by room. */
const PLANS: { title: string; caption: string; zones: Zone[] }[] = [
  {
    title: "Typical plan · the company",
    caption: "Users in, agents in the middle, real systems out",
    zones: [
      { x: 40, y: 50, w: 150, h: 200, tone: "olive", label: "Users" },
      { x: 210, y: 50, w: 180, h: 120, tone: "indigo", label: "Agent core" },
      { x: 210, y: 180, w: 180, h: 70, tone: "indigo", label: "Evals" },
      { x: 410, y: 50, w: 150, h: 200, tone: "amber", label: "Tools · Data" },
    ],
  },
  {
    title: "Typical plan · client work",
    caption: "Your team, one founder-engineer, a shipped product",
    zones: [
      { x: 40, y: 50, w: 200, h: 200, tone: "olive", label: "Your team" },
      { x: 260, y: 90, w: 80, h: 120, tone: "amber", label: "Me" },
      { x: 360, y: 50, w: 200, h: 200, tone: "indigo", label: "Shipped" },
    ],
  },
  {
    title: "Typical plan · experiments",
    caption: "Most rooms stay empty. The lit ones move upstairs",
    zones: [
      { x: 40, y: 50, w: 100, h: 90, tone: "amber", label: "Kept" },
      { x: 300, y: 160, w: 120, h: 90, tone: "olive", label: "Kept" },
      { x: 440, y: 50, w: 120, h: 90, tone: "indigo", label: "Shipped" },
    ],
  },
];

const TONES = {
  olive: "var(--color-olive)",
  indigo: "var(--color-indigo)",
  amber: "var(--color-amber)",
};

function Plan({ plan }: { plan: (typeof PLANS)[number] }) {
  const grid = plan.zones.length === 3 && plan.title.includes("experiments");
  return (
    <svg viewBox="0 0 600 300" className="h-auto w-full" role="img" aria-label={`${plan.title}: ${plan.caption}`}>
      <defs>
        <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="600" height="300" fill="url(#bp-grid)" />
      {/* Outer walls */}
      <rect x="30" y="40" width="540" height="220" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="3" />
      {/* Room dividers */}
      {grid &&
        [140, 300, 440].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="260" stroke="currentColor" strokeOpacity="0.35" />
        ))}
      {grid && <line x1="30" y1="150" x2="570" y2="150" stroke="currentColor" strokeOpacity="0.35" />}
      {plan.zones.map((z) => (
        <g key={`${z.label}-${z.x}`} className="zone">
          <rect x={z.x} y={z.y} width={z.w} height={z.h} fill={TONES[z.tone]} fillOpacity="0.78" />
          <rect x={z.x} y={z.y} width={z.w} height={z.h} fill="none" stroke="currentColor" strokeOpacity="0.5" />
          <text
            x={z.x + z.w / 2}
            y={z.y + z.h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-mono"
            fontSize="11"
            letterSpacing="1.5"
            fill="currentColor"
          >
            {z.label.toUpperCase()}
          </text>
        </g>
      ))}
      {/* Dimension line */}
      <g stroke="currentColor" strokeOpacity="0.45">
        <line x1="30" y1="282" x2="570" y2="282" />
        <line x1="30" y1="276" x2="30" y2="288" />
        <line x1="570" y1="276" x2="570" y2="288" />
      </g>
      <text x="300" y="20" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="2" fill="currentColor" fillOpacity="0.6">
        ↑ NORTH · ENTRANCE
      </text>
    </svg>
  );
}

/** Ventures presented like a residence's floor-plan viewer: pick a level, see the plan. */
export function Levels() {
  const [active, setActive] = useState(0);
  const base = useId();
  const v = ventures[active];
  const plan = PLANS[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : ventures.length - 1)) % ventures.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <div role="tablist" aria-label="Ventures" className="flex gap-2 lg:flex-col lg:gap-0" onKeyDown={onKey}>
          {ventures.map((item, i) => (
            <button
              key={item.id}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${base}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`level-tab ${i === active ? "is-active" : ""}`}
            >
              <span className="label">Level {item.id}</span>
              <span className="hidden font-serif text-2xl lg:block">{item.name}</span>
            </button>
          ))}
        </div>

        <div key={active} className="fade-in mt-10">
          <p className="label text-paper/50">
            Level {v.id} · {v.status}
          </p>
          <h3 className="mt-4 font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] uppercase leading-[0.95]">{v.name}</h3>
          <p className="label mt-5 text-paper/50">{v.category}</p>
          <p className="mt-5 max-w-md leading-relaxed text-paper/75">{v.description}</p>
        </div>
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${active}`}
        className="lg:col-span-8"
      >
        <div key={active} className="fade-in">
          <Plan plan={plan} />
          <p className="label mt-4 text-center text-paper/55">{plan.title}</p>
          <p className="mt-1 text-center text-sm text-paper/40">{plan.caption}</p>
        </div>
      </div>
    </div>
  );
}
