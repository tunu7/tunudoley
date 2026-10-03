"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./hooks";

/** A 3D carousel of principles: drifts on its own, drag to spin, buttons to step. */
export function PrinciplesRing({ principles }: { principles: string[] }) {
  const n = principles.length;
  const step = 360 / n;
  const calm = useReducedMotion();
  const ring = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const motion = useRef({
    rot: 0,
    vel: 0,
    target: null as number | null,
    dragging: false,
    lastX: 0,
    idleAt: 0,
  });
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const el = ring.current;
    const box = wrap.current;
    if (!el || !box) return;
    let raf = 0;
    let visible = false;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const m = motion.current;

      if (!m.dragging) {
        if (m.target !== null) {
          m.rot += (m.target - m.rot) * (1 - Math.exp(-8 * dt));
          if (Math.abs(m.target - m.rot) < 0.05) {
            m.rot = m.target;
            m.target = null;
            m.idleAt = now;
          }
        } else if (Math.abs(m.vel) > 0.02) {
          m.rot += m.vel;
          m.vel *= Math.exp(-3 * dt);
          if (Math.abs(m.vel) <= 0.3) {
            m.vel = 0;
            m.target = Math.round(m.rot / step) * step;
          }
        } else if (!calm && now - m.idleAt > 2500) {
          m.rot -= 8 * dt;
        }
      }

      el.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${m.rot}deg)`;
      const idx = (((Math.round(-m.rot / step) % n) + n) % n);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    observer.observe(box);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [calm, n, step]);

  const stepBy = (dir: number) => {
    const m = motion.current;
    const base = m.target ?? Math.round(m.rot / step) * step;
    m.vel = 0;
    m.target = base - dir * step;
  };

  return (
    <div>
      <div
        ref={wrap}
        className="ring-stage relative h-[340px] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[400px]"
        onPointerDown={(e) => {
          const m = motion.current;
          m.dragging = true;
          m.target = null;
          m.vel = 0;
          m.lastX = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const m = motion.current;
          if (!m.dragging) return;
          const dx = e.clientX - m.lastX;
          m.lastX = e.clientX;
          m.rot += dx * 0.35;
          m.vel = dx * 0.35;
        }}
        onPointerUp={() => {
          const m = motion.current;
          m.dragging = false;
          m.idleAt = performance.now();
          if (Math.abs(m.vel) < 0.3) m.target = Math.round(m.rot / step) * step;
        }}
        onPointerCancel={() => (motion.current.dragging = false)}
        aria-hidden="true"
      >
        <div ref={ring} className="ring">
          {principles.map((p, i) => (
            <div
              key={p}
              className={`ring-panel ${i === active ? "is-active" : ""}`}
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--r))` }}
            >
              <span className="font-mono text-xs opacity-50">
                {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <span className="font-serif text-[1.75rem] leading-[1.05] italic">{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button type="button" className="key-btn" onClick={() => stepBy(-1)} aria-label="Previous principle">
          ←
        </button>
        <p className="min-w-[14ch] text-center text-sm text-ink/55" aria-live="polite">
          {String(active + 1).padStart(2, "0")} — drag to spin
        </p>
        <button type="button" className="key-btn" onClick={() => stepBy(1)} aria-label="Next principle">
          →
        </button>
      </div>

      <ol className="sr-only">
        {principles.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>
    </div>
  );
}
