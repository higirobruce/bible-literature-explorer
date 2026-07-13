"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Highlighter as HighlighterIcon, Check } from "lucide-react";

const colors = [
  { id: "yellow", value: "#FDE68A", label: "Yellow" },
  { id: "green", value: "#86EFAC", label: "Green" },
  { id: "blue", value: "#93C5FD", label: "Blue" },
  { id: "pink", value: "#F9A8D4", label: "Pink" },
  { id: "orange", value: "#FDBA74", label: "Orange" },
];

interface HighlighterProps {
  verseNum: number;
  onHighlight: (verseNum: number, color: string) => void;
}

export function Highlighter({ verseNum, onHighlight }: HighlighterProps) {
  const [open, setOpen] = useState(false);

  const handleColor = useCallback(
    (color: string) => {
      onHighlight(verseNum, color);
      setOpen(false);
    },
    [verseNum, onHighlight]
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="opacity-0 group-hover:opacity-100 rounded p-1 text-muted hover:text-accent transition-all duration-150 ease-out"
        title="Highlight verse"
      >
        <HighlighterIcon className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-10 mt-1 flex gap-1 rounded-lg border border-border bg-card p-1.5 shadow-lg">
          {colors.map((c) => (
            <button
              key={c.id}
              onClick={() => handleColor(c.value)}
              className="h-5 w-5 rounded-full border border-border transition-transform hover:scale-110"
              style={{ backgroundColor: c.value }}
              title={c.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}
