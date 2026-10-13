import { Clock } from "./Clock";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#ventures", label: "Building" },
  { href: "#work", label: "Work with me" },
  { href: "#principles", label: "Rules" },
];

/* Blends with `difference`, so the same bar reads on paper, dark and green sections. */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 text-white mix-blend-difference sm:px-8">
      <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#top" className="font-serif text-2xl leading-none tracking-tight">
          Tunu Doley<span className="label ml-2 align-middle text-[9px] opacity-60">Founder</span>
        </a>

        <nav aria-label="Main navigation" className="label hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-line">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="label flex items-center gap-6">
          <span className="hidden opacity-60 sm:inline">
            <Clock />
          </span>
          <a href="#contact" className="rounded-full border border-current px-4 py-2 transition-opacity hover:opacity-70">
            Let&apos;s talk
          </a>
        </div>
      </div>
    </header>
  );
}
