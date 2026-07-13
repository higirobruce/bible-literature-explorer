import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const recent = [
  { title: "Research Workspace", description: "Notes: Genesis 1-11 \u00b7 Comparison: 4 Gospels" },
  { title: "Collections", description: "Messianic Prophecies \u00b7 Exodus Motif \u00b7 Wisdom Psalms" },
];

export function ContinueReading() {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Recent Activity
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {recent.map((item) => (
          <Card key={item.title}>
            <CardTitle className="text-sm">{item.title}</CardTitle>
            <CardDescription className="mt-1 text-xs">
              {item.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}
