import { Clock } from "./Clock";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#ventures", label: "Building" },
  { href: "#work", label: "Work with me" },
  { href: "#principles", label: "Rules" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper px-5 sm:px-8">
      <div className="flex h-14 items-center justify-between gap-4 border-b border-line font-mono text-[11px] uppercase tracking-[0.12em] sm:h-16">
        <a href="#top" className="font-sans text-sm font-bold normal-case tracking-tight">
          Tunu Doley
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-line">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden text-ink/55 sm:inline">
            <Clock />
          </span>
          <a href="#contact" className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="link-line">Say hi</span>
          </a>
        </div>
      </div>
    </header>
  );
}
