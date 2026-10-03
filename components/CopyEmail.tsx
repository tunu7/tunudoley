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
    <div className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className="key-btn key-btn-accent h-14 px-7 text-base">
        Write me an email ↗
      </a>
      <button type="button" onClick={copy} className="key-btn key-btn-ghost h-14 px-6 text-base" aria-live="polite">
        {copied ? "Copied ✓" : "Copy address"}
      </button>
    </div>
  );
}
