"use client";

import { useState } from "react";
import { sceneBus } from "./scene/bus";

/** A card that lights up its matching part of the 3D scene on hover, focus, or tap. */
export function FocusCard({
  index,
  children,
  className = "",
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  const on = () => {
    sceneBus.focus = index;
    setActive(true);
  };
  const off = () => {
    if (sceneBus.focus === index) sceneBus.focus = -1;
    setActive(false);
  };

  return (
    <article
      tabIndex={0}
      onPointerEnter={(e) => e.pointerType === "mouse" && on()}
      onPointerLeave={(e) => e.pointerType === "mouse" && off()}
      onClick={() => (active ? off() : on())}
      onFocus={on}
      onBlur={off}
      data-active={active}
      className={`panel focus-card ${className}`}
    >
      {children}
    </article>
  );
}
