import { DiscoveryCard } from "./DiscoveryCard";

const cards = [
  {
    title: "ANE Cosmology",
    description: "The ancient Near Eastern view of a dome-shaped firmament separating waters above from waters below — shared with Mesopotamian cosmology.",
    icon: "\u2606",
    variant: "ancient" as const,
  },
  {
    title: "Enuma Elish",
    description: "The Babylonian creation epic (c. 1750 BC) shares structural parallels with Genesis 1: order from chaos, divine speech, celestial bodies.",
    icon: "\u2630",
    variant: "literature" as const,
  },
  {
    title: "Connected to: Abraham",
    description: "The God who creates in Genesis 1 is the same God who calls Abraham in Genesis 12 — establishing a covenantal framework.",
    icon: "\u263C",
    variant: "people" as const,
  },
  {
    title: "Location: Mesopotamia",
    description: "The setting of Genesis 1-11 reflects Mesopotamian geography — the Tigris-Euphrates river system.",
    icon: "\u2601",
    variant: "places" as const,
  },
  {
    title: "Why \"Let us\"?",
    description: "The plural \"Let us make man\" has been interpreted as divine council, royal plural, or Trinity — a major interpretive question.",
    icon: "?",
    variant: "question" as const,
  },
];

export function DiscoveryCardDeck() {
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
