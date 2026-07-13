"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const translations = [
  { id: "esv", label: "ESV" },
  { id: "niv", label: "NIV" },
  { id: "kjv", label: "KJV" },
  { id: "nasb", label: "NASB" },
  { id: "nrsv", label: "NRSV" },
];

export function TranslationSelector() {
  const [selected, setSelected] = useState("esv");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className={cn(
          "flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-secondary",
          "transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
        )}
        onClick={() => setOpen(!open)}
      >
        {translations.find((t) => t.id === selected)?.label}
        <svg
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 w-28 rounded-lg border border-border bg-card p-1 shadow-lg">
          {translations.map((t) => (
            <button
              key={t.id}
              className={cn(
                "w-full rounded-md px-3 py-1.5 text-left text-xs font-medium transition-colors",
                selected === t.id
                  ? "bg-accent-subtle text-accent"
                  : "text-secondary hover:bg-surface hover:text-heading"
              )}
              onClick={() => {
                setSelected(t.id);
                setOpen(false);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
