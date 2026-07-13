import { cn } from "@/lib/utils";

interface DiscoveryCardProps {
  title: string;
  description: string;
  icon: string;
  variant?: "default" | "ancient" | "literature" | "people" | "places" | "question";
}

const variantStyles: Record<string, string> = {
  default: "border-border hover:border-accent/30",
  ancient: "border-terracotta/20 hover:border-terracotta/40",
  literature: "border-olive/20 hover:border-olive/40",
  people: "border-deep-indigo/20 hover:border-deep-indigo/40",
  places: "border-sand/20 hover:border-sand/40",
  question: "border-muted-copper/20 hover:border-muted-copper/40",
};

export function DiscoveryCard({ title, description, icon, variant = "default" }: DiscoveryCardProps) {
  return (
    <div
      className={cn(
        "min-w-[240px] max-w-[280px] shrink-0 rounded-lg border bg-card p-4 shadow-sm transition-all duration-150 ease-out cursor-pointer hover:shadow-md",
        variantStyles[variant]
      )}
    >
      <span className="text-lg">{icon}</span>
      <h4 className="mt-2 text-sm font-medium text-heading">{title}</h4>
      <p className="mt-1 text-xs text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
