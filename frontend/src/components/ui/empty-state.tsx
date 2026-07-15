import { cn } from "@/lib/utils";
import { type LucideIcon, SearchX, BookOpen, Bookmark } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

const icons = { SearchX, BookOpen, Bookmark };

export function EmptyState({
  icon: Icon = BookOpen,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-border bg-card px-6 text-center",
        className
      )}
    >
      <Icon className="h-10 w-10 text-muted" />
      <h3 className="mt-3 text-sm font-medium text-heading">{title}</h3>
      {description && (
        <p className="mt-1 text-xs text-muted">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-3 rounded-lg bg-deep-indigo px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#252D4A]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
