import Link from "next/link";
import { cn } from "@/lib/utils";

interface Connection {
  id: string;
  name: string;
  type: string;
  relationship: string;
}

interface EntityConnectionsProps {
  connections: Connection[];
}

const typeColors: Record<string, string> = {
  Person: "border-terracotta/30 text-terracotta hover:bg-terracotta/10",
  Place: "border-deep-indigo/30 text-deep-indigo hover:bg-deep-indigo/10",
  Concept: "border-olive/30 text-olive hover:bg-olive/10",
  Event: "border-sand/30 text-sand hover:bg-sand/10",
};

export function EntityConnections({ connections }: EntityConnectionsProps) {
  if (connections.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Connections
      </h2>
      <div className="flex flex-wrap gap-2">
        {connections.map((conn) => (
          <Link
            key={conn.id}
            href={`/entity/${conn.type.toLowerCase()}/${conn.slug ?? conn.name.toLowerCase()}`}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ease-out",
              typeColors[conn.type] ?? "border-border text-secondary hover:bg-surface"
            )}
            title={conn.relationship}
          >
            {conn.name}
            <span className="text-xs opacity-60">({conn.relationship})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
