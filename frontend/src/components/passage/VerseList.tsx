import { VerseRow } from "./VerseRow";

interface WordToken {
  position: number;
  hebrew?: string;
  greek?: string;
  strongs?: string;
  transliteration?: string;
  gloss?: string;
  pos?: string;
  morph?: string;
  lemma?: string;
}

interface Verse {
  num: number;
  text: string;
  words?: WordToken[];
}

interface VerseListProps {
  verses: Verse[];
  layer?: number;
  activeVerse?: number | null;
  highlightedVerses?: Record<number, string>;
  onHighlight?: (verseNum: number) => void;
  fontSize?: number;
  showOriginal?: boolean;
  onWordClick?: (word: string, strongsNumber?: string, wordData?: WordToken) => void;
}

export function VerseList({
  verses,
  layer = 1,
  activeVerse,
  highlightedVerses,
  onHighlight,
  fontSize,
  showOriginal,
  onWordClick,
}: VerseListProps) {
  if (verses.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-card">
        <p className="text-sm text-muted">No verses found for this chapter.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-1">
      {verses.map((verse, i) => (
        <VerseRow
          key={verse.num}
          num={verse.num}
          text={verse.text}
          words={verse.words}
          layer={layer}
          active={activeVerse === verse.num}
          highlighted={highlightedVerses?.[verse.num]}
          onHighlight={onHighlight}
          fontSize={fontSize}
          showOriginal={showOriginal}
          onWordClick={onWordClick}
          index={i}
        />
      ))}
    </div>
  );
}
