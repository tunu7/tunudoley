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
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={`mailto:${email}`} className="btn btn-ink">
        Write me an email ↗
      </a>
      <button type="button" onClick={copy} className="btn btn-line font-mono text-sm" aria-live="polite">
        {copied ? "Copied ✓" : email}
      </button>
    </div>
  );
}
