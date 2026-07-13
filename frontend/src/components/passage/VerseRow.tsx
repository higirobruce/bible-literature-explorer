"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/auth/Highlighter";

interface VerseRowProps {
  num: number;
  text: string;
  highlighted?: string | null;
  onWordClick?: (word: string) => void;
  onHighlight?: (verseNum: number, color: string) => void;
}

export function VerseRow({ num, text, highlighted, onWordClick, onHighlight }: VerseRowProps) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={cn(
        "group flex gap-3 rounded-md px-2 py-1.5 transition-colors duration-150 ease-out",
        highlighted && "bg-accent-subtle/40"
      )}
      style={highlighted ? { backgroundColor: highlighted + "40" } : undefined}
    >
      <div className="mt-0.5 flex flex-col items-center gap-1">
        <span className="min-w-[1.5rem] text-right text-xs font-medium text-muted select-none">
          {num}
        </span>
        {onHighlight && <Highlighter verseNum={num} onHighlight={onHighlight} />}
      </div>
      <p className="flex-1 text-base leading-relaxed text-primary">
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            onClick={() => onWordClick?.(word.replace(/[^a-zA-Z]/g, ""))}
            className="cursor-pointer rounded-sm px-[1px] transition-colors duration-150 ease-out hover:bg-accent-subtle/60 hover:text-accent"
            title={`Click to inspect "${word.replace(/[^a-zA-Z]/g, "")}"`}
          >
            {word}{" "}
          </span>
        ))}
      </p>
      <button
        onClick={() => setBookmarked(!bookmarked)}
        className={cn(
          "opacity-0 group-hover:opacity-100 rounded p-1 transition-all duration-150 ease-out self-start mt-0.5",
          bookmarked ? "text-accent" : "text-muted hover:text-accent"
        )}
        title={bookmarked ? "Remove bookmark" : "Bookmark verse"}
      >
        <svg className="h-3.5 w-3.5" fill={bookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    </div>
  );
}
