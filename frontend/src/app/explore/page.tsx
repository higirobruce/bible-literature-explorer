"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageTransition } from "@/components/ui/page-transition";
import { EmptyState } from "@/components/ui/empty-state";
import { API_BASE } from "@/lib/api";
import { SearchX } from "lucide-react";

interface EntityHit {
  name: string;
  type: string;
  slug: string;
}

const TYPE_ORDER = ["Person", "Place", "Concept", "Event", "Text"];

export default function ExplorePage() {
  const [entities, setEntities] = useState<EntityHit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/entities`)
      .then((r) => r.json())
      .then((data: EntityHit[]) => setEntities(Array.isArray(data) ? data : []))
      .catch(() => setEntities([]))
      .finally(() => setLoading(false));
  }, []);

  const grouped = TYPE_ORDER.map((type) => ({
    type,
    items: entities.filter((e) => e.type === type),
  })).filter((g) => g.items.length > 0);

  return (
    <PageTransition className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-medium text-heading">Explore</h1>
        <p className="mt-1 text-sm text-secondary">
          Browse the people, places, and concepts that appear across the biblical literature.
        </p>
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
      )}

      {!loading && entities.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="No entities yet"
          description="The knowledge base is still being populated."
        />
      )}

      {!loading &&
        grouped.map((group) => (
          <section key={group.type}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {group.type}s
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((e) => (
                <Link key={`${e.type}-${e.slug}`} href={`/entity/${e.type.toLowerCase()}/${e.slug}`}>
                  <Card className="h-full transition-colors duration-150 ease-out hover:border-accent/40">
                    <CardTitle className="text-base">{e.name}</CardTitle>
                    <CardDescription>{e.type}</CardDescription>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
    </PageTransition>
  );
}
