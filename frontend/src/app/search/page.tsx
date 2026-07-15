"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { SearchInput } from "@/components/search/SearchInput";
import { SummaryCard } from "@/components/search/SummaryCard";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTransition } from "@/components/ui/page-transition";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BOOKS } from "@/data/books";
import { SearchX } from "lucide-react";

interface PassageResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
}

interface EntityHit {
  name: string;
  type: string;
  slug: string;
}

const facetTypes = [
  { id: "all", label: "All", kind: "passage" as const },
  { id: "passage", label: "Passages", kind: "passage" as const },
  { id: "people", label: "People", kind: "entity" as const, entityType: "Person" },
  { id: "places", label: "Places", kind: "entity" as const, entityType: "Place" },
  { id: "concepts", label: "Concepts", kind: "entity" as const, entityType: "Concept" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeFacet, setActiveFacet] = useState("all");
  const [activeBook, setActiveBook] = useState("all");

  const [passages, setPassages] = useState<PassageResult[]>([]);
  const [entities, setEntities] = useState<EntityHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlQuery = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("q") ?? ""
    : "";

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    const facet = facetTypes.find((f) => f.id === activeFacet) ?? facetTypes[0];
    if (!query.trim()) {
      setPassages([]);
      setEntities([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        if (facet.kind === "entity") {
          const res = await fetch(
            `http://localhost:4000/api/entities/search?q=${encodeURIComponent(query)}`
          );
          const hits: EntityHit[] = await res.json();
          const filtered = Array.isArray(hits)
            ? hits.filter((h) => h.type === facet.entityType).slice(0, 12)
            : [];
          setEntities(filtered);
          setPassages([]);
        } else {
          const params = new URLSearchParams({ q: query });
          if (activeBook !== "all") params.set("book", activeBook);
          const res = await fetch(`http://localhost:4000/api/search?${params.toString()}`);
          const data = await res.json();
          setPassages(Array.isArray(data.results) ? data.results : []);
          setEntities([]);
        }
      } catch {
        setError("Search failed. Please try again.");
        setPassages([]);
        setEntities([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [query, activeFacet, activeBook]);

  const facet = facetTypes.find((f) => f.id === activeFacet) ?? facetTypes[0];
  const hasResults = passages.length > 0 || entities.length > 0;

  return (
    <PageTransition className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-medium text-heading">
          Search
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Search across passages, people, places, and concepts.
        </p>
      </div>

      <SearchInput onSearch={handleSearch} initialQuery={urlQuery} />

      <div className="flex flex-wrap items-center gap-2">
        {facetTypes.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFacet(f.id)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150 ease-out",
              activeFacet === f.id
                ? "bg-accent text-white"
                : "border border-border bg-card text-secondary hover:border-accent hover:text-accent"
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="text-xs text-muted">|</span>
        <select
          value={activeBook}
          onChange={(e) => setActiveBook(e.target.value)}
          className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-secondary outline-none"
        >
          <option value="all">All Books</option>
          {BOOKS.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {!query && (
            <EmptyState
              icon={SearchX}
              title="Search the library"
              description="Enter a search term to find passages, people, places, and concepts."
            />
          )}

          {query && loading && (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          )}

          {query && !loading && error && (
            <EmptyState icon={SearchX} title="Search failed" description={error} />
          )}

          {query && !loading && !error && !hasResults && (
            <EmptyState
              icon={SearchX}
              title="No results found"
              description={`No ${facet.kind === "entity" ? facet.label.toLowerCase() : "passages"} found for "${query}". Try a different term.`}
            />
          )}

          {passages.map((r, i) => (
            <SummaryCard key={i} {...r} />
          ))}

          {entities.map((e) => (
            <Link
              key={`${e.type}-${e.slug}`}
              href={`/entity/${e.type.toLowerCase()}/${e.slug}`}
              className="block rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-150 ease-out hover:border-accent/30 hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-accent/30 px-2 py-0.5 text-xs font-medium text-accent">
                  {e.type}
                </span>
              </div>
              <p className="mt-1.5 font-heading text-base font-medium text-heading">{e.name}</p>
            </Link>
          ))}
        </div>

        <aside className="space-y-4">
          {hasResults && (
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Results
              </h3>
              <dl className="space-y-2 rounded-lg border border-border bg-card p-3">
                <div className="flex justify-between gap-2 text-sm">
                  <dt className="text-muted">Query</dt>
                  <dd className="text-right font-medium text-heading">{query}</dd>
                </div>
                <div className="flex justify-between gap-2 text-sm">
                  <dt className="text-muted">Scope</dt>
                  <dd className="text-right font-medium text-heading">{facet.label}</dd>
                </div>
                <div className="flex justify-between gap-2 text-sm">
                  <dt className="text-muted">Matches</dt>
                  <dd className="text-right font-medium text-heading">
                    {facet.kind === "entity" ? entities.length : passages.length}
                  </dd>
                </div>
              </dl>
            </section>
          )}
        </aside>
      </div>
    </PageTransition>
  );
}
