/*
 * Line-art illustrations that stand in for photography: physics, code and machines,
 * drawn in currentColor so each panel can set its own tone. Motion lives in globals.css.
 */

type GlyphProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** Bohr-style atom: three tilted orbits, each with an electron riding it. */
export function Atom({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...stroke}>
        {[0, 60, 120].map((r, i) => (
          <g key={r} transform={`rotate(${r} 100 100)`}>
            <ellipse cx="100" cy="100" rx="82" ry="30" opacity="0.7" />
            <g className="spin" style={{ animationDuration: `${7 + i * 3}s`, transformOrigin: "100px 100px" }}>
              <circle cx="182" cy="100" r="3.5" fill="currentColor" stroke="none" />
            </g>
          </g>
        ))}
        <circle cx="100" cy="100" r="9" />
        <circle cx="100" cy="100" r="3" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** Damped sine on an oscilloscope grid. */
export function Wave({ className }: GlyphProps) {
  const pts = Array.from({ length: 121 }, (_, i) => {
    const x = 10 + i * 1.5;
    const y = 100 - Math.sin(i / 6) * 55 * Math.exp(-i / 90);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...stroke}>
        {[40, 70, 100, 130, 160].map((y) => (
          <line key={`h${y}`} x1="10" x2="190" y1={y} y2={y} opacity={y === 100 ? 0.5 : 0.15} />
        ))}
        {[40, 70, 100, 130, 160].map((x) => (
          <line key={`v${x}`} y1="20" y2="180" x1={x} x2={x} opacity="0.15" />
        ))}
        <polyline points={pts} className="trace" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

/** Small feed-forward network, pulses travelling along the edges. */
export function Network({ className }: GlyphProps) {
  const layers = [
    [50, 100, 150],
    [35, 80, 120, 165],
    [60, 140],
    [100],
  ];
  const xs = [30, 80, 130, 175];
  const edges: [number, number, number, number][] = [];
  layers.forEach((col, l) => {
    if (l === layers.length - 1) return;
    col.forEach((y1) => layers[l + 1].forEach((y2) => edges.push([xs[l], y1, xs[l + 1], y2])));
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...stroke}>
        {edges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.3" />
        ))}
        {edges
          .filter((_, i) => i % 3 === 0)
          .map(([x1, y1, x2, y2], i) => (
            <line
              key={`p${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="pulse"
              style={{ animationDelay: `${(i * 0.37) % 2.4}s` }}
            />
          ))}
        {layers.map((col, l) =>
          col.map((y) => <circle key={`${l}-${y}`} cx={xs[l]} cy={y} r="6" fill="var(--glyph-bg, var(--color-dark))" />),
        )}
      </g>
    </svg>
  );
}

/** Code brackets with a blinking caret. */
export function Code({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...stroke} strokeWidth="1.6">
        <polyline points="62,58 22,100 62,142" />
        <polyline points="138,58 178,100 138,142" />
        <line x1="112" y1="48" x2="88" y2="152" opacity="0.6" />
      </g>
      <g {...stroke} opacity="0.5">
        <line x1="70" y1="172" x2="120" y2="172" />
      </g>
      <rect x="126" y="164" width="8" height="14" fill="currentColor" className="blink" />
    </svg>
  );
}

/** Light through a prism, splitting into a spectrum of rays. */
export function Prism({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...stroke}>
        <polygon points="100,40 150,140 50,140" strokeWidth="1.6" />
        <line x1="10" y1="118" x2="78" y2="96" />
        <line x1="78" y1="96" x2="124" y2="100" opacity="0.6" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="124" y1="100" x2="192" y2={108 + i * 11} opacity={1 - i * 0.15} className="ray" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </g>
    </svg>
  );
}

/** Planet on an elliptical orbit with a swept-area wedge (Kepler's second law). */
export function Orbit({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...stroke}>
        <ellipse cx="100" cy="100" rx="85" ry="55" opacity="0.7" />
        <ellipse cx="100" cy="100" rx="60" ry="38" opacity="0.25" strokeDasharray="2 4" />
        <path d="M128 100 L185 100 A85 55 0 0 0 160 61 Z" fill="currentColor" opacity="0.08" />
        <circle cx="128" cy="100" r="11" />
        <circle cx="128" cy="100" r="4" fill="currentColor" stroke="none" />
        <g className="spin" style={{ animationDuration: "14s", transformOrigin: "100px 100px" }}>
          <circle cx="100" cy="45" r="4.5" fill="currentColor" stroke="none" />
        </g>
      </g>
    </svg>
  );
}

/** Chip with traces running out to pads. */
export function Chip({ className }: GlyphProps) {
  const pins = [70, 90, 110, 130];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...stroke}>
        <rect x="60" y="60" width="80" height="80" rx="4" strokeWidth="1.6" />
        <rect x="80" y="80" width="40" height="40" opacity="0.5" />
        {pins.map((p) => (
          <g key={p}>
            <polyline points={`${p},60 ${p},35 ${p - 10},22`} opacity="0.6" />
            <polyline points={`${p},140 ${p},165 ${p + 10},178`} opacity="0.6" />
            <polyline points={`60,${p} 35,${p} 22,${p + 10}`} opacity="0.6" />
            <polyline points={`140,${p} 165,${p} 178,${p - 10}`} opacity="0.6" />
            <circle cx={p - 10} cy="22" r="2.5" />
            <circle cx={p + 10} cy="178" r="2.5" />
          </g>
        ))}
        <circle cx="100" cy="100" r="5" fill="currentColor" stroke="none" className="blink" />
      </g>
    </svg>
  );
}

/** Pendulum swinging over its arc of travel. */
export function Pendulum({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...stroke}>
        <line x1="50" y1="24" x2="150" y2="24" strokeWidth="1.6" />
        <path d="M44 150 A120 120 0 0 0 156 150" opacity="0.3" strokeDasharray="2 4" />
        {[-24, 24].map((a) => (
          <g key={a} transform={`rotate(${a} 100 24)`} opacity="0.18">
            <line x1="100" y1="24" x2="100" y2="160" />
            <circle cx="100" cy="166" r="8" />
          </g>
        ))}
        <g className="swing">
          <line x1="100" y1="24" x2="100" y2="160" />
          <circle cx="100" cy="166" r="9" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}

export const glyphs = { Atom, Wave, Network, Code, Prism, Orbit, Chip, Pendulum };
export type GlyphName = keyof typeof glyphs;
