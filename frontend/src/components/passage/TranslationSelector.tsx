"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const translations = [
  { id: "web", label: "WEB" },
  { id: "kjv", label: "KJV" },
  { id: "asv", label: "ASV" },
  { id: "esv", label: "ESV" },
];

interface TranslationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TranslationSelector({ value, onChange }: TranslationSelectorProps) {
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
        {translations.find((t) => t.id === value)?.label ?? value.toUpperCase()}
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 w-28 rounded-lg border border-border bg-card p-1 shadow-lg">
          {translations.map((t) => (
            <button
              key={t.id}
              className={cn(
                "w-full rounded-md px-3 py-1.5 text-left text-xs font-medium transition-colors",
                value === t.id
                  ? "bg-accent-subtle text-accent"
                  : "text-secondary hover:bg-surface hover:text-heading"
              )}
              onClick={() => {
                onChange(t.id);
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
