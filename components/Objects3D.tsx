/** Small pure-CSS 3D objects used as card illustrations. */

export function Cube({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`css-scene ${className}`}>
      <div className="cube">
        {["front", "back", "right", "left", "top", "bottom"].map((face) => (
          <span key={face} className={`cube-face cube-${face}`} />
        ))}
      </div>
    </div>
  );
}

export function Layers({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`css-scene ${className}`}>
      <div className="layers">
        <span className="layer bg-ink" />
        <span className="layer bg-sky" />
        <span className="layer bg-accent" />
      </div>
    </div>
  );
}

export function Orbit({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`css-scene ${className}`}>
      <div className="orbit">
        <span className="orbit-core" />
        <span className="orbit-ring" />
        <span className="orbit-ring orbit-ring-2" />
        <span className="orbit-ring orbit-ring-3" />
      </div>
    </div>
  );
}
