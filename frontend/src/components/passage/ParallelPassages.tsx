"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ParallelPassage, getParallelPassages } from "@/data/parallels";

interface ParallelPassagesProps {
  book: string;
  chapter: number;
}

const TYPE_STYLES: Record<string, string> = {
  synoptic: "bg-blue-50 text-blue-700 border-blue-200",
  intertextual: "bg-amber-50 text-amber-700 border-amber-200",
  quotation: "bg-green-50 text-green-700 border-green-200",
};

const TYPE_LABELS: Record<string, string> = {
  synoptic: "Synoptic",
  intertextual: "Intertextual",
  quotation: "Quotation",
};

export function ParallelPassages({ book, chapter }: ParallelPassagesProps) {
  const passages = getParallelPassages(book, chapter);

  if (passages.length === 0) return null;

  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 font-heading text-xs font-semibold uppercase tracking-wider text-muted">
        Parallel Passages
      </h3>

      <div className="space-y-2">
        {passages.map((p, i) => (
          <motion.a
            key={i}
            href={`/passage/${p.reference.toLowerCase().replace(/\s+/g, "/").replace(/:/, "/")}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            className="block rounded-md border border-border p-3 transition-colors duration-150 ease-out hover:border-accent/30 hover:bg-surface"
          >
            <div className="flex items-start gap-2">
              <span
                className={cn(
                  "mt-0.5 inline-block shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                  TYPE_STYLES[p.type] ?? TYPE_STYLES.intertextual,
                )}
              >
                {TYPE_LABELS[p.type] ?? p.type}
              </span>
              <div className="min-w-0">
                <span className="text-sm font-medium text-accent">{p.reference}</span>
                <p className="mt-0.5 text-xs text-muted">{p.description}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
