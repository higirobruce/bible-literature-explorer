import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const entityCategories = [
  {
    title: "People",
    description: "Abraham, Moses, David, Isaiah, Paul",
    entities: [
      { name: "Abraham", slug: "abraham" },
    ],
  },
  {
    title: "Places",
    description: "Canaan, Egypt, Babylon, Jerusalem, Nineveh",
    entities: [
      { name: "Canaan", slug: "canaan" },
    ],
  },
  {
    title: "Concepts",
    description: "Covenant, Divine Council, Wisdom, Atonement, Exile",
    entities: [
      { name: "Covenant", slug: "covenant" },
    ],
  },
];

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-medium text-heading">Explore</h1>
        <p className="mt-1 text-sm text-secondary">
          Browse people, places, concepts, and events in biblical literature.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {entityCategories.map((cat) => (
          <Card key={cat.title}>
            <CardTitle>{cat.title}</CardTitle>
            <CardDescription className="mt-1">{cat.description}</CardDescription>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {cat.entities.map((e) => (
                <Link
                  key={e.slug}
                  href={`/entity/${cat.title.toLowerCase()}/${e.slug}`}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-secondary hover:border-accent hover:text-accent transition-colors"
                >
                  {e.name}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
