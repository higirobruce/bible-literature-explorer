import Link from "next/link";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
  className?: string;
}

export function SummaryCard({
  book,
  chapter,
  verse,
  text,
  translation,
  className,
}: SummaryCardProps) {
  const bookName = book.charAt(0).toUpperCase() + book.slice(1);

  return (
    <Link
      href={`/passage/${book}/${chapter}?verse=${verse}`}
      className={cn(
        "block rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-150 ease-out hover:border-accent/30 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs text-muted">
        <span className="font-medium text-accent">
          {bookName} {chapter}:{verse}
        </span>
        <span className="text-muted">{translation.toUpperCase()}</span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-primary">{text}</p>
    </Link>
  );
}
