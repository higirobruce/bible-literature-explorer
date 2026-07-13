"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { EntityConnections } from "@/components/entity/EntityConnections";
import { EntityTimeline } from "@/components/entity/EntityTimeline";
import { ErrorState } from "@/components/ui/error-state";
import { EntitySkeleton } from "@/components/ui/skeleton";
import { PageTransition } from "@/components/ui/page-transition";
import { ArrowLeft } from "lucide-react";

interface EntityPageProps {
  params: {
    type: string;
    slug: string;
  };
}

interface EntityData {
  id: string;
  name: string;
  type: string;
  summary: string;
  background: string;
  dateRange?: string;
  occurrences: { reference: string; text: string }[];
  connections: { id: string; name: string; type: string; relationship: string; slug?: string }[];
  timeline: { date: string; label: string }[];
}

export default function EntityPage({ params }: EntityPageProps) {
  const { type, slug } = params;
  const [entity, setEntity] = useState<EntityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntity = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:4000/api/entities/${type}/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Entity not found");
        return res.json();
      })
      .then((data) => {
        setEntity(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [type, slug]);

  useEffect(() => { fetchEntity(); }, [fetchEntity]);

  if (loading) return <PageTransition><EntitySkeleton /></PageTransition>;

  if (error) return (
    <PageTransition>
      <ErrorState title="Failed to load entity" message={error} onRetry={fetchEntity} />
    </PageTransition>
  );

  if (!entity) return (
    <PageTransition>
      <ErrorState title="Entity not found" message={`No ${type} found with the slug "${slug}".`} />
    </PageTransition>
  );

  return (
    <PageTransition className="space-y-8">
      <Link
        href="/explore"
        className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Explore
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-accent/30 px-2 py-0.5 text-xs font-medium text-accent">
            {entity.type}
          </span>
          {entity.dateRange && (
            <span className="text-xs text-muted">{entity.dateRange}</span>
          )}
        </div>
        <h1 className="mt-2 font-heading text-3xl font-medium text-heading">
          {entity.name}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-secondary">
          {entity.summary}
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Historical Background
        </h2>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm leading-relaxed text-primary">{entity.background}</p>
        </div>
      </section>

      <EntityTimeline items={entity.timeline} />

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Occurrences
        </h2>
        <div className="space-y-2">
          {entity.occurrences.length === 0 && (
            <p className="text-sm text-muted">No occurrences listed.</p>
          )}
          {entity.occurrences.map((occ) => {
            const [book, ref] = occ.reference.split(" ");
            const [ch] = (ref ?? "1").split(":");
            return (
              <Link
                key={occ.reference}
                href={`/passage/${book.toLowerCase()}/${ch}`}
                className="block rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent/30"
              >
                <span className="text-xs font-medium text-accent">{occ.reference}</span>
                <p className="mt-0.5 text-sm text-secondary">{occ.text}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <EntityConnections connections={entity.connections} />
    </PageTransition>
  );
}
