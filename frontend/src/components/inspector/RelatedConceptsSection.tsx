import Link from "next/link";
import { cn } from "@/lib/utils";

interface RelatedConceptsSectionProps {
  word: string;
}

const related = [
  { name: "Creation", type: "Concept", slug: "creation" },
  { name: "Elohim", type: "Person", slug: "elohim" },
  { name: "Genesis", type: "Text", slug: "genesis" },
];

export function RelatedConceptsSection({ word }: RelatedConceptsSectionProps) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Related Concepts
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {related.map((item) => (
          <Link
            key={item.name}
            href={`/entity/${item.type.toLowerCase()}/${item.slug}`}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-150 ease-out",
              item.type === "Person"
                ? "border-terracotta/30 text-terracotta hover:bg-terracotta/10"
                : item.type === "Concept"
                  ? "border-deep-indigo/30 text-deep-indigo hover:bg-deep-indigo/10"
                  : "border-olive/30 text-olive hover:bg-olive/10"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
