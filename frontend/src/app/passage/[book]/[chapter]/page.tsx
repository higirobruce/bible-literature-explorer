"use client";

import { useState, useEffect, useCallback } from "react";
import { VerseList } from "@/components/passage/VerseList";
import { ChapterNav } from "@/components/passage/ChapterNav";
import { Breadcrumb } from "@/components/passage/Breadcrumb";
import { TranslationSelector } from "@/components/passage/TranslationSelector";
import { LayerPills } from "@/components/passage/LayerPills";
import { InspectorPanel } from "@/components/inspector/InspectorPanel";
import { DiscoveryCardDeck } from "@/components/discovery/DiscoveryCardDeck";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { VerseSkeleton } from "@/components/ui/skeleton";
import { PageTransition } from "@/components/ui/page-transition";
import { BookOpen } from "lucide-react";

interface PassagePageProps {
  params: {
    book: string;
    chapter: string;
  };
}

interface WordData {
  position: number;
  hebrew?: string;
  greek?: string;
  strongs?: string;
}

interface Verse {
  num: number;
  text: string;
  translation?: string;
  words?: WordData[];
}

interface SelectedWord {
  word: string;
  strongs?: string;
}

export default function PassagePage({ params }: PassagePageProps) {
  const { book, chapter } = params;
  const bookName = book.charAt(0).toUpperCase() + book.slice(1);
  const [selectedWord, setSelectedWord] = useState<SelectedWord | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [translation, setTranslation] = useState("web");

  const fetchPassage = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:4000/api/passages/${book}/${chapter}?translation=${translation}`)
      .then((res) => {
        if (!res.ok) throw new Error("Passage not found");
        return res.json();
      })
      .then((data) => {
        setVerses(data.verses ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [book, chapter, translation]);

  useEffect(() => { fetchPassage(); }, [fetchPassage]);

  const handleWordClick = useCallback((word: string) => {
    const cleaned = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    let strongs: string | undefined;

    for (const verse of verses) {
      if (verse.words) {
        const wordAtPosition = verse.words.find((w) => w.strongs);
        if (wordAtPosition?.strongs) {
          strongs = wordAtPosition.strongs;
          break;
        }
      }
    }

    setSelectedWord({ word: cleaned, strongs });
  }, [verses]);

  return (
    <PageTransition className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumb book={bookName} chapter={chapter} />
          <h1 className="font-heading text-2xl font-medium text-heading sm:text-3xl">
            {bookName} {chapter}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LayerPills />
          <TranslationSelector value={translation} onChange={setTranslation} />
        </div>
      </div>

      {loading && <VerseSkeleton />}

      {error && (
        <ErrorState
          title="Failed to load passage"
          message={error}
          onRetry={fetchPassage}
        />
      )}

      {!loading && !error && verses.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title="No verses found"
          description={`No verses found for ${bookName} ${chapter}.`}
        />
      )}

      {!loading && !error && verses.length > 0 && (
        <VerseList verses={verses} onWordClick={handleWordClick} />
      )}

      <DiscoveryCardDeck />

      <ChapterNav book={book} chapter={parseInt(chapter)} totalChapters={50} />

      <InspectorPanel word={selectedWord?.word ?? null} strongsNumber={selectedWord?.strongs} onClose={() => setSelectedWord(null)} />
    </PageTransition>
  );
}
