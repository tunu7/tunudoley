import { founder } from "@/data/portfolio";

/** A single-line arch with an atom inside draws itself, then the curtain lifts. Pure CSS. */
export function Preloader() {
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    pathLength: 1,
    className: "draw",
    vectorEffect: "non-scaling-stroke" as const,
  };
  return (
    <div
      aria-hidden="true"
      className="preloader pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-dark text-paper"
    >
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 120 170" className="w-24 sm:w-28">
          <path d="M20 160 V60 A40 40 0 0 1 100 60 V160" {...line} />
          <path d="M8 160 H112" {...line} />
          <ellipse cx="60" cy="98" rx="26" ry="10" {...line} />
          <ellipse cx="60" cy="98" rx="26" ry="10" transform="rotate(60 60 98)" {...line} />
          <ellipse cx="60" cy="98" rx="26" ry="10" transform="rotate(120 60 98)" {...line} />
          <circle cx="60" cy="98" r="2.5" fill="currentColor" className="fade" />
        </svg>
        <p className="fade caps mt-10 text-2xl tracking-[0.06em]">{founder.name}</p>
        <p className="fade label mt-3 text-paper/50">Founder · {founder.location}</p>
      </div>
    </div>
  );
}
