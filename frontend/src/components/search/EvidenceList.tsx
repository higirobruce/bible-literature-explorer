interface EvidenceItem {
  label: string;
  value: string;
}

const mockEvidence: EvidenceItem[] = [
  { label: "Manuscripts", value: "Earliest witness: Codex Vaticanus (c. 350 AD)" },
  { label: "Transmission", value: "Masoretic Text preserves Hebrew tradition" },
  { label: "Date", value: "Composition ~5th century BC" },
  { label: "Genre", value: "Narrative / Primeval History" },
  { label: "Context", value: "ANE cosmology shared with Mesopotamia" },
];

export function EvidenceList() {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Evidence
      </h3>
      <div className="space-y-2 rounded-lg border border-border bg-card p-3">
        {mockEvidence.map((item) => (
          <div key={item.label} className="text-sm">
            <span className="text-xs font-medium text-muted">{item.label}</span>
            <p className="text-primary">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
