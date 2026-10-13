import { ventures } from "@/data/portfolio";

type Tone = "olive" | "indigo" | "amber";
type UnitId = "A" | "B" | "C" | "D" | "E";

/* One floor plate, five units around a central core, like a residential tower. */
const UNITS: Record<UnitId, { pts: string; cx: number; cy: number; walls: string }> = {
  A: { pts: "90,80 300,80 300,230 90,230", cx: 195, cy: 155, walls: "M90 160 H190 M190 80 V230 M240 160 H300" },
  B: { pts: "90,230 300,230 300,400 90,400", cx: 195, cy: 315, walls: "M90 310 H170 M170 230 V400 M230 330 H300" },
  C: { pts: "300,210 500,210 500,400 300,400", cx: 400, cy: 305, walls: "M300 300 H380 M420 300 H500 M400 300 V400" },
  D: { pts: "500,230 710,230 710,400 500,400", cx: 605, cy: 315, walls: "M630 230 V400 M630 310 H710 M500 330 H570" },
  E: { pts: "500,80 710,80 710,230 500,230", cx: 605, cy: 155, walls: "M610 80 V230 M610 160 H710 M500 160 H560" },
};

export const PLANS: { units: Partial<Record<UnitId, { tone: Tone; label: string }>>; legend: [Tone, string][] }[] = [
  {
    units: {
      A: { tone: "olive", label: "Users" },
      B: { tone: "olive", label: "Feedback" },
      C: { tone: "indigo", label: "Agents" },
      E: { tone: "amber", label: "Tools" },
      D: { tone: "amber", label: "Data" },
    },
    legend: [
      ["olive", "Real people, real work"],
      ["indigo", "AI in the middle"],
      ["amber", "Systems it acts on"],
    ],
  },
  {
    units: {
      A: { tone: "olive", label: "Your team" },
      B: { tone: "olive", label: "Roadmap" },
      C: { tone: "amber", label: "Me" },
      E: { tone: "indigo", label: "Shipped" },
      D: { tone: "indigo", label: "Handover" },
    },
    legend: [
      ["olive", "Your side"],
      ["amber", "One founder-engineer"],
      ["indigo", "What you keep"],
    ],
  },
  {
    units: {
      A: { tone: "amber", label: "Kept" },
      E: { tone: "indigo", label: "Shipped" },
    },
    legend: [
      ["amber", "Survived the weekend"],
      ["indigo", "Moved upstairs"],
    ],
  },
];

export const TONE = { olive: "var(--color-olive)", indigo: "var(--color-indigo)", amber: "var(--color-amber)" };

export function FloorPlan({ level }: { level: number }) {
  const plan = PLANS[level];
  return (
    <svg viewBox="0 0 800 470" className="h-auto w-full text-paper" role="img" aria-label={`Floor plan of level ${ventures[level].id}`}>
      <defs>
        <pattern id={`hatch-${level}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeOpacity="0.35" />
        </pattern>
      </defs>

      {(Object.keys(UNITS) as UnitId[]).map((id) => {
        const u = UNITS[id];
        const fill = plan.units[id];
        return (
          <g key={id}>
            <polygon
              points={u.pts}
              fill={fill ? TONE[fill.tone] : "currentColor"}
              fillOpacity={fill ? 0.82 : 0.04}
              className="transition-[fill-opacity] duration-500"
            />
            <path d={u.walls} stroke="currentColor" strokeOpacity="0.45" fill="none" />
            <text
              x={u.cx}
              y={u.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-geist-mono)"
              fontSize="11"
              letterSpacing="2"
              fill="currentColor"
              fillOpacity={fill ? 1 : 0.35}
            >
              {(fill?.label ?? "Archive").toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Core: lifts and stairs */}
      <rect x="320" y="80" width="160" height="130" fill={`url(#hatch-${level})`} stroke="currentColor" strokeOpacity="0.5" />
      <rect x="340" y="100" width="45" height="45" fill="var(--color-dark)" stroke="currentColor" strokeOpacity="0.6" />
      <rect x="415" y="100" width="45" height="45" fill="var(--color-dark)" stroke="currentColor" strokeOpacity="0.6" />
      <text x="400" y="185" textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="10" letterSpacing="2" fill="currentColor" fillOpacity="0.7">
        CORE
      </text>

      {/* Door swings */}
      <g stroke="currentColor" strokeOpacity="0.45" fill="none">
        <path d="M300 250 A20 20 0 0 1 280 270" />
        <path d="M500 250 A20 20 0 0 0 520 270" />
        <path d="M380 210 A20 20 0 0 0 400 230" />
      </g>

      {/* Outer walls */}
      <polygon points="90,80 320,80 320,60 480,60 480,80 710,80 710,400 90,400" fill="none" stroke="currentColor" strokeWidth="3.5" />

      {/* Orientation */}
      <g fontFamily="var(--font-geist-mono)" fontSize="9.5" letterSpacing="2" fill="currentColor" fillOpacity="0.55">
        <text x="400" y="40" textAnchor="middle">RESEARCH</text>
        <text x="400" y="428" textAnchor="middle">PRODUCTION</text>
        <text x="60" y="240" textAnchor="middle" transform="rotate(-90 60 240)">USER SIDE VIEW</text>
        <text x="740" y="240" textAnchor="middle" transform="rotate(90 740 240)">SYSTEMS</text>
      </g>
      <g stroke="currentColor" strokeOpacity="0.6" fill="none">
        <circle cx="755" cy="60" r="14" />
        <path d="M755 48 L760 66 L755 62 L750 66 Z" fill="currentColor" />
      </g>
      <text x="400" y="458" textAnchor="middle" fontFamily="var(--font-geist-mono)" fontSize="11" letterSpacing="2.5" fill="currentColor">
        TYPICAL FLOOR PLAN OF LEVEL {ventures[level].id}
      </text>
    </svg>
  );
}

