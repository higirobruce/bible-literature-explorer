import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChapterNavProps {
  book: string;
  chapter: number;
  totalChapters: number;
}

export function ChapterNav({ book, chapter, totalChapters }: ChapterNavProps) {
  const prevChapter = chapter > 1 ? chapter - 1 : null;
  const nextChapter = chapter < totalChapters ? chapter + 1 : null;

  return (
    <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
      {prevChapter ? (
        <Link
          href={`/passage/${book}/${prevChapter}`}
          className={cn(
            "rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary",
            "transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          )}
        >
          &larr; Chapter {prevChapter}
        </Link>
      ) : (
        <div />
      )}

      <span className="text-xs text-muted">
        Chapter {chapter} of {totalChapters}
      </span>

      {nextChapter ? (
        <Link
          href={`/passage/${book}/${nextChapter}`}
          className={cn(
            "rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary",
            "transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          )}
        >
          Chapter {nextChapter} &rarr;
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
