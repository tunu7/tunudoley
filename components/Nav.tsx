import { Clock } from "./Clock";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#ventures", label: "The work" },
  { href: "#work", label: "Work with me" },
  { href: "#principles", label: "Rules" },
];

/* Blends with `difference`, so the same bar reads over photos, paper and green. */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 text-white mix-blend-difference sm:px-8 lg:px-12">
      <div className="flex h-20 items-center justify-between gap-4">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-serif text-[1.7rem] tracking-tight">Tunu Doley</span>
          <span className="label mt-1 text-[8.5px] opacity-60">Tech Entrepreneur</span>
        </a>

        <nav aria-label="Main navigation" className="label hidden items-center gap-9 lg:flex">
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
          <a href="#contact" className="link-line flex items-center gap-2">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
