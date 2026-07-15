"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimelineEvent, getTimelineForBook } from "@/data/timeline";
import { ChevronDown } from "lucide-react";

interface PassageTimelineProps {
  bookId: string;
}

const TYPE_STYLES: Record<string, { label: string; classes: string }> = {
  composition: { label: "Composition", classes: "border-blue-400 text-blue-600 bg-blue-50" },
  historical: { label: "Historical", classes: "border-terracotta text-terracotta bg-terracotta/5" },
  manuscript: { label: "Manuscript", classes: "border-emerald-400 text-emerald-600 bg-emerald-50" },
  figure: { label: "Figure", classes: "border-purple-400 text-purple-600 bg-purple-50" },
};

export function PassageTimeline({ bookId }: PassageTimelineProps) {
  const [expanded, setExpanded] = useState(false);
  const events = getTimelineForBook(bookId);
  const visibleEvents = expanded ? events : events.slice(0, 5);

  if (!events.length || events[0].label === "Timeline data pending") {
    return null;
  }

  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted">
          Timeline
        </h3>
        {events.length > 5 && (
          <ChevronDown
            className={cn("h-4 w-4 text-muted transition-transform", expanded && "rotate-180")}
          />
        )}
      </button>

      <div className="relative mt-3 pl-4">
        <div className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-px bg-border" />

        <div className="space-y-4">
          {visibleEvents.map((event, i) => {
            const style = TYPE_STYLES[event.type] ?? TYPE_STYLES.historical;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="relative pl-4"
              >
                <div
                  className={cn(
                    "absolute left-[-13px] top-1.5 h-2.5 w-2.5 rounded-full border-2 bg-card",
                    style.classes.split(" ")[0],
                  )}
                />

                <div className="flex items-start gap-2">
                  <span className="min-w-[80px] text-xs font-medium text-accent">{event.year}</span>
                  <div className="flex-1">
                    <span
                      className={cn(
                        "inline-block rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                        style.classes,
                      )}
                    >
                      {style.label}
                    </span>
                    <p className="mt-1 text-sm font-medium text-heading">{event.label}</p>
                    <p className="mt-0.5 text-xs text-muted">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {events.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
        >
          {expanded ? "Show fewer" : `Show all ${events.length} events`}
        </button>
      )}
    </section>
  );
}
