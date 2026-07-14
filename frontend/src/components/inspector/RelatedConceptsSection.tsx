"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedConceptsSectionProps {
  word: string;
}

interface EntityHit {
  name: string;
  type: string;
  slug: string;
}

const TYPE_STYLES: Record<string, string> = {
  Person: "border-terracotta/30 text-terracotta hover:bg-terracotta/10",
  Place: "border-olive/30 text-olive hover:bg-olive/10",
  Concept: "border-deep-indigo/30 text-deep-indigo hover:bg-deep-indigo/10",
  Event: "border-deep-indigo/30 text-deep-indigo hover:bg-deep-indigo/10",
  Text: "border-border text-secondary hover:border-accent hover:text-accent",
};

export function RelatedConceptsSection({ word }: RelatedConceptsSectionProps) {
  const [items, setItems] = useState<EntityHit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!word) return;
    setLoading(true);
    const query = word.replace(/[^a-zA-Zא-ת]/g, "");
    fetch(`http://localhost:4000/api/entities/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d: EntityHit[]) => setItems(Array.isArray(d) ? d.slice(0, 6) : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [word]);

  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Related Concepts
      </h3>
      {loading && <Skeleton className="h-7 w-full" />}
      {!loading && items.length === 0 && (
        <p className="text-xs text-muted">No linked concepts for “{word}”.</p>
      )}
      {!loading && items.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <Link
              key={`${item.type}-${item.slug}`}
              href={`/entity/${item.type.toLowerCase()}/${item.slug}`}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-150 ease-out",
                TYPE_STYLES[item.type] ?? TYPE_STYLES.Text,
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
