"use client";

import { useState, useCallback } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SummaryCard } from "@/components/search/SummaryCard";
import { EvidenceList } from "@/components/search/EvidenceList";
import { QuickFacts } from "@/components/search/QuickFacts";
import { cn } from "@/lib/utils";

interface SearchResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
}

const facetTypes = [
  { id: "all", label: "All" },
  { id: "passage", label: "Passages" },
  { id: "people", label: "People" },
  { id: "places", label: "Places" },
  { id: "concepts", label: "Concepts" },
];

const books = [
  { id: "all", label: "All Books" },
  { id: "genesis", label: "Genesis" },
  { id: "exodus", label: "Exodus" },
  { id: "psalms", label: "Psalms" },
  { id: "isaiah", label: "Isaiah" },
  { id: "matthew", label: "Matthew" },
];

const mockResults: SearchResult[] = [
  { book: "genesis", chapter: 1, verse: 1, text: "In the beginning, God created the heavens and the earth.", translation: "esv" },
  { book: "genesis", chapter: 1, verse: 3, text: "And God said, \"Let there be light,\" and there was light.", translation: "esv" },
  { book: "genesis", chapter: 1, verse: 26, text: "Then God said, \"Let us make man in our image, after our likeness.\"", translation: "esv" },
  { book: "john", chapter: 1, verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God.", translation: "esv" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeFacet, setActiveFacet] = useState("all");
  const [activeBook, setActiveBook] = useState("all");

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-medium text-heading">
          Search
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Search across passages, people, places, and concepts.
        </p>
      </div>

      <SearchInput onSearch={handleSearch} />

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
          {books.map((b) => (
            <option key={b.id} value={b.id}>{b.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {query && mockResults.length > 0 && (
            <p className="text-xs text-muted">
              {mockResults.length} result{mockResults.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </p>
          )}
          {query ? (
            mockResults.map((r, i) => (
              <SummaryCard key={i} {...r} />
            ))
          ) : (
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-card">
              <p className="text-sm text-muted">
                Enter a search term to find passages, people, places, and concepts.
              </p>
            </div>
          )}
          {query && mockResults.length === 0 && (
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-card">
              <p className="text-sm text-muted">
                No results found for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          {query && <EvidenceList />}
          {query && <QuickFacts />}
        </aside>
      </div>
    </div>
  );
}
