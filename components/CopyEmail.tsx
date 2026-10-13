"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
      <button type="button" onClick={copy} className="pill" aria-live="polite">
        <span className="truncate">{copied ? "Copied to clipboard ✓" : email}</span>
        <span className="label shrink-0 opacity-60">{copied ? "" : "Copy"}</span>
      </button>
      <a href={`mailto:${email}`} className="label link-line whitespace-nowrap text-paper">
        Write to me →
      </a>
    </div>
  );
}
