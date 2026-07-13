interface QuickFact {
  label: string;
  value: string;
}

const facts: QuickFact[] = [
  { label: "Total verses", value: "31" },
  { label: "Key terms", value: "God (34x), light (6x), day (7x)" },
  { label: "Translation tradition", value: "ESV (2001)" },
  { label: "Notable", value: "Most quoted chapter in NT" },
];

export function QuickFacts() {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Quick Facts
      </h3>
      <dl className="space-y-2 rounded-lg border border-border bg-card p-3">
        {facts.map((f) => (
          <div key={f.label} className="flex justify-between gap-2 text-sm">
            <dt className="text-muted">{f.label}</dt>
            <dd className="text-right font-medium text-heading">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
