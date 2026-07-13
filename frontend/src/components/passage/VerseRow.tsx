import { cn } from "@/lib/utils";

interface VerseRowProps {
  num: number;
  text: string;
  isHighlighted?: boolean;
  onWordClick?: (word: string) => void;
}

export function VerseRow({ num, text, isHighlighted, onWordClick }: VerseRowProps) {
  return (
    <div
      className={cn(
        "group flex gap-3 rounded-md px-2 py-1.5 transition-colors duration-150 ease-out",
        isHighlighted && "bg-accent-subtle/40"
      )}
    >
      <span className="mt-0.5 min-w-[1.5rem] text-right text-xs font-medium text-muted select-none">
        {num}
      </span>
      <p className="text-base leading-relaxed text-primary">
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            onClick={() => onWordClick?.(word.replace(/[^a-zA-Z]/g, ""))}
            className="cursor-pointer rounded-sm px-[1px] transition-colors duration-150 ease-out hover:bg-accent-subtle/60 hover:text-accent"
            title={`Click to inspect "${word.replace(/[^a-zA-Z]/g, "")}"`}
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}
