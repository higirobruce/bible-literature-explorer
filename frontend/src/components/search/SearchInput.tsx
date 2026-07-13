"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchInput({ onSearch, initialQuery = "" }: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) onSearch(query.trim());
    },
    [query, onSearch]
  );

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search passages, people, places, concepts...'
        className="flex-1 rounded-l-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors duration-150 ease-out focus:border-accent"
      />
      <button
        type="submit"
        className="rounded-r-lg bg-deep-indigo px-6 py-3 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-[#252D4A]"
      >
        Search
      </button>
    </form>
  );
}
