"use client";

import { useEffect, useState } from "react";
import { DiscoveryCard } from "./DiscoveryCard";

interface CardData {
  title: string;
  description: string;
  icon: string;
  variant: "default" | "ancient" | "literature" | "people" | "places" | "question";
}

interface DiscoveryResponse {
  cards: CardData[];
  passageId: string;
}

export function DiscoveryCardDeck() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const book = pathParts[2] ?? "genesis";
    const chapter = pathParts[3] ?? "1";
    const passageId = `${book}-${chapter}`;

    fetch(`http://localhost:4000/api/discovery/${passageId}`)
      .then((res) => res.json())
      .then((data: DiscoveryResponse) => {
        setCards(data.cards);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Discoveries
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[240px] max-w-[280px] shrink-0 animate-pulse rounded-lg border border-border bg-card p-4"
            >
              <div className="h-5 w-5 rounded bg-muted/30" />
              <div className="mt-2 h-4 w-3/4 rounded bg-muted/30" />
              <div className="mt-1 h-3 w-full rounded bg-muted/30" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (cards.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Discoveries
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {cards.map((card) => (
          <DiscoveryCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={card.icon}
            variant={card.variant}
          />
        ))}
      </div>
    </section>
  );
}
