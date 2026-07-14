"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HomeSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-6 flex max-w-lg">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='e.g. "Who are the Nephilim?" or "Genesis 1"'
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
