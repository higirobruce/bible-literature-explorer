"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LexiconSection } from "./LexiconSection";
import { RelatedConceptsSection } from "./RelatedConceptsSection";
import { ConnectionsSection } from "./ConnectionsSection";
import { X } from "lucide-react";

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
    <AnimatePresence>
      {word && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}
      <motion.div
        ref={panelRef}
        initial={{ x: "100%" }}
        animate={{ x: word ? 0 : "100%" }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full border-l border-border bg-surface shadow-lg sm:w-96",
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
            <X className="h-4 w-4" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={word ?? "empty"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="h-[calc(100%-3.5rem)] overflow-y-auto p-4"
          >
            {word ? (
              <div className="space-y-6">
                <LexiconSection word={word} />
                <RelatedConceptsSection word={word} />
                <ConnectionsSection word={word} />
              </div>
            ) : (
              <p className="text-sm text-muted">Click any word in the passage to inspect it.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
