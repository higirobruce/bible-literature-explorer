"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/auth/Highlighter";

interface WordToken {
  position: number;
  hebrew?: string;
  greek?: string;
  strongs?: string;
  transliteration?: string;
  gloss?: string;
}

interface VerseRowProps {
  num: number;
  text: string;
  words?: WordToken[];
  highlighted?: string | null;
  active?: boolean;
  layer?: number;
  onWordClick?: (word: string, strongsNumber?: string) => void;
  onHighlight?: (verseNum: number, color: string) => void;
  fontSize?: number;
  index?: number;
}

export function VerseRow({
  num,
  text,
  words,
  highlighted,
  active = false,
  layer = 1,
  onWordClick,
  onHighlight,
  fontSize,
  index = 0,
}: VerseRowProps) {
  const handleEnglishWord = (raw: string) => {
    const cleaned = raw.replace(/[^a-zA-Z]/g, "");
    if (!cleaned || !onWordClick) return;
    const strongsNumber = resolveStrongs(cleaned, words);
    onWordClick(cleaned, strongsNumber);
  };

  return (
    <motion.div
      id={`verse-${num}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "group flex gap-3 rounded-md px-2 py-2 transition-colors duration-150 ease-out scroll-mt-28",
        highlighted && "bg-accent-subtle/40",
        active && "bg-accent-subtle/50 ring-1 ring-accent/30",
      )}
      style={highlighted && !active ? { backgroundColor: highlighted + "40" } : undefined}
    >
      <div className="mt-1 flex flex-col items-center gap-1">
        <span className="min-w-[1.5rem] text-right text-xs font-medium text-muted select-none tabular-nums">
          {num}
        </span>
        {onHighlight && <Highlighter verseNum={num} onHighlight={onHighlight} />}
      </div>
      <div className="flex-1">
        <p
          className="flex-1 text-[1.05rem] leading-8 text-primary"
          style={fontSize ? { fontSize: `${fontSize}px`, lineHeight: 1.7 } : undefined}
        >
          {text.split(" ").map((word, i) => (
            <span
              key={i}
              onClick={() => handleEnglishWord(word)}
              className="cursor-pointer rounded-sm px-[1px] transition-colors duration-150 ease-out hover:bg-accent-subtle/60 hover:text-accent"
              title={`Click to inspect "${word.replace(/[^a-zA-Z]/g, "")}"`}
            >
              {word}{" "}
            </span>
          ))}
        </p>
        {layer === 3 && words && words.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-dashed border-border pt-2">
            {words.map((w) => (
              <button
                key={w.position}
                onClick={() => onWordClick?.(w.hebrew ?? "", w.strongs)}
                className="group/word flex flex-col items-center leading-none"
                title={`${w.transliteration ?? ""} — ${w.gloss ?? ""}`}
              >
                <span
                  className="font-medium text-heading transition-colors duration-150 ease-out hover:text-accent"
                  lang="he"
                  dir="rtl"
                >
                  {w.hebrew}
                </span>
                <span className="text-[10px] text-muted group-hover/word:text-accent">
                  {w.strongs}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function resolveStrongs(
  english: string,
  words?: WordToken[],
): string | undefined {
  if (!words || words.length === 0) return undefined;
  const target = english.toLowerCase();
  let best: { strongs?: string; score: number } = { score: 0 };
  for (const w of words) {
    let score = 0;
    const translit = (w.transliteration ?? "").toLowerCase();
    const gloss = (w.gloss ?? "").toLowerCase();
    if (translit && translit.includes(target)) score += 3;
    if (gloss.includes(target)) score += 1;
    if (score > best.score) best = { strongs: w.strongs, score };
  }
  return best.score > 0 ? best.strongs : undefined;
}
