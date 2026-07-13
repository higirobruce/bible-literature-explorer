import { cn } from "@/lib/utils";
import { Star, BookOpen, Users, MapPin, HelpCircle, type LucideIcon } from "lucide-react";

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

const iconVariantStyles: Record<string, string> = {
  default: "text-accent",
  ancient: "text-terracotta",
  literature: "text-olive",
  people: "text-deep-indigo",
  places: "text-sand",
  question: "text-muted-copper",
};

const iconMap: Record<string, LucideIcon> = {
  star: Star,
  "book-open": BookOpen,
  users: Users,
  "map-pin": MapPin,
  "help-circle": HelpCircle,
};

export function DiscoveryCard({ title, description, icon, variant = "default" }: DiscoveryCardProps) {
  const Icon = iconMap[icon] ?? HelpCircle;

  return (
    <div
      className={cn(
        "min-w-[240px] max-w-[280px] shrink-0 rounded-lg border bg-card p-4 shadow-sm transition-all duration-150 ease-out cursor-pointer hover:shadow-md",
        variantStyles[variant]
      )}
    >
      <Icon className={cn("h-5 w-5", iconVariantStyles[variant])} />
      <h4 className="mt-2 text-sm font-medium text-heading">{title}</h4>
      <p className="mt-1 text-xs text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
