"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { LexiconSection } from "./LexiconSection";
import { RelatedConceptsSection } from "./RelatedConceptsSection";
import { ConnectionsSection } from "./ConnectionsSection";

interface InspectorPanelProps {
  word: string | null;
  onClose: () => void;
}

export function InspectorPanel({ word, onClose }: InspectorPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {word && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        ref={panelRef}
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full border-l border-border bg-surface shadow-lg transition-transform duration-250 ease-out sm:w-96",
          word ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <span className="font-heading text-sm font-medium text-heading">
            {word ? `"${word}"` : "Inspector"}
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted transition-colors hover:text-heading"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-[calc(100%-3.5rem)] overflow-y-auto p-4">
          {word ? (
            <div className="space-y-6">
              <LexiconSection word={word} />
              <RelatedConceptsSection word={word} />
              <ConnectionsSection word={word} />
            </div>
          ) : (
            <p className="text-sm text-muted">Click any word in the passage to inspect it.</p>
          )}
        </div>
      </div>
    </>
  );
}
