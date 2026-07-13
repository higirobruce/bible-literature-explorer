interface ConnectionsSectionProps {
  word: string;
}

const connections = [
  { reference: "John 1:1", text: "In the beginning was the Word" },
  { reference: "Proverbs 8:22", text: "The LORD possessed me at the beginning of his work" },
  { reference: "Isaiah 46:10", text: "declaring the end from the beginning" },
];

export function ConnectionsSection({ word }: ConnectionsSectionProps) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Cross References
      </h3>
      <div className="space-y-2">
        {connections.map((conn) => (
          <a
            key={conn.reference}
            href={`/passage/${conn.reference.split(" ")[0].toLowerCase()}/${conn.reference.split(" ")[1].replace(":", "/")}`}
            className="block rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent/30"
          >
            <span className="text-xs font-medium text-accent">{conn.reference}</span>
            <p className="mt-0.5 text-sm text-secondary">{conn.text}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
