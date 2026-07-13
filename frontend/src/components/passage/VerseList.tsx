import { VerseRow } from "./VerseRow";

interface Verse {
  num: number;
  text: string;
}

interface VerseListProps {
  verses: Verse[];
  onWordClick?: (word: string) => void;
}

export function VerseList({ verses, onWordClick }: VerseListProps) {
  if (verses.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-card">
        <p className="text-sm text-muted">No verses found for this chapter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {verses.map((verse) => (
        <VerseRow key={verse.num} num={verse.num} text={verse.text} onWordClick={onWordClick} />
      ))}
    </div>
  );
}
