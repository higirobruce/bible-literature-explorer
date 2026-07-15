"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { VerseList } from "@/components/passage/VerseList";
import { ChapterNav } from "@/components/passage/ChapterNav";
import { Breadcrumb } from "@/components/passage/Breadcrumb";
import { TranslationSelector } from "@/components/passage/TranslationSelector";
import { LayerPills } from "@/components/passage/LayerPills";
import { PassageTimeline } from "@/components/passage/PassageTimeline";
import { ParallelPassages } from "@/components/passage/ParallelPassages";
import { InspectorPanel } from "@/components/inspector/InspectorPanel";
import { DiscoveryCardDeck } from "@/components/discovery/DiscoveryCardDeck";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { VerseSkeleton } from "@/components/ui/skeleton";
import { PageTransition } from "@/components/ui/page-transition";
import { BookOpen } from "lucide-react";
import { BOOKS } from "@/data/books";
import { useApi } from "@/hooks/useApi";
import { cn } from "@/lib/utils";

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
  transliteration?: string;
  gloss?: string;
  pos?: string;
  morph?: string;
  lemma?: string;
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
  gloss?: string;
  transliteration?: string;
  pos?: string;
  morph?: string;
  lemma?: string;
}

interface SavedHighlight {
  _id: string;
  passageId: string;
  verseRange: string;
  color: string;
}

const HIGHLIGHT_COLOR = "#FDE68A";

export default function PassagePage({ params }: PassagePageProps) {
  const { book, chapter } = params;
  const router = useRouter();
  const { isAuthed, get, send } = useApi();
  const bookName = book.charAt(0).toUpperCase() + book.slice(1);
  const totalChapters = BOOKS.find((b) => b.id === book)?.chapters ?? 50;
  const passageId = `${book}-${chapter}`;

  const [selectedWord, setSelectedWord] = useState<SelectedWord | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [translation, setTranslation] = useState("web");
  const [layer, setLayer] = useState(1);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);

  const [highlightedVerses, setHighlightedVerses] = useState<Record<number, string>>({});
  const [highlightIds, setHighlightIds] = useState<Record<number, string>>({});
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState<number | null>(null);
  const [showOriginal, setShowOriginal] = useState(false); // Hebrew/Greek toggle
  const prefsApplied = useRef(false);

  useEffect(() => {
    const v = parseInt(new URLSearchParams(window.location.search).get("verse") ?? "", 10);
    setActiveVerse(Number.isFinite(v) && v > 0 ? v : null);
  }, [book, chapter]);

  useEffect(() => {
    if (activeVerse && !loading && verses.length > 0) {
      const el = document.getElementById(`verse-${activeVerse}`);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
    }
  }, [activeVerse, verses, loading]);

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

  useEffect(() => {
    if (!isAuthed) {
      setHighlightedVerses({});
      setHighlightIds({});
      setBookmarked(false);
      return;
    }
    Promise.all([
      get<SavedHighlight[]>("/api/users/me/highlights"),
      get<string[]>("/api/users/me/bookmarks"),
    ])
      .then(([hls, bms]) => {
        const map: Record<number, string> = {};
        const ids: Record<number, string> = {};
        hls
          .filter((h) => h.passageId === passageId)
          .forEach((h) => {
            const vNum = parseInt(h.verseRange.split(":")[0], 10);
            if (vNum) {
              map[vNum] = h.color;
              ids[vNum] = h._id;
            }
          });
        setHighlightedVerses(map);
        setHighlightIds(ids);
        setBookmarked(bms.includes(passageId));
      })
      .catch(() => {});
  }, [isAuthed, book, chapter, get]);

  useEffect(() => {
    if (!isAuthed || prefsApplied.current) return;
    get<{ defaultTranslation?: string; fontSize?: number }>("/api/users/me/preferences")
      .then((p) => {
        if (p.defaultTranslation) setTranslation(p.defaultTranslation);
        if (p.fontSize) setFontSize(p.fontSize);
      })
      .catch(() => {})
      .finally(() => {
        prefsApplied.current = true;
      });
  }, [isAuthed, get]);

  const handleWordClick = useCallback((word: string, strongsNumber?: string, wordData?: WordData) => {
    const cleaned = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const display = strongsNumber ? word : cleaned;
    if (!display && !strongsNumber) return;
    setSelectedWord({
      word: display,
      strongs: strongsNumber,
      gloss: wordData?.gloss,
      transliteration: wordData?.transliteration,
      pos: wordData?.pos,
      morph: wordData?.morph,
      lemma: wordData?.lemma,
    });
  }, []);

  const handleHighlight = useCallback(
    (verseNum: number) => {
      if (!isAuthed) {
        router.push("/profile");
        return;
      }
      const existingId = highlightIds[verseNum];
      if (existingId) {
        send(`/api/users/me/highlights/${existingId}`, "DELETE")
          .then(() => {
            setHighlightIds((prev) => {
              const n = { ...prev };
              delete n[verseNum];
              return n;
            });
            setHighlightedVerses((prev) => {
              const n = { ...prev };
              delete n[verseNum];
              return n;
            });
          })
          .catch(() => {});
      } else {
        send<SavedHighlight>("/api/users/me/highlights", "POST", {
          passageId,
          verseRange: String(verseNum),
          color: HIGHLIGHT_COLOR,
        })
          .then((h) => {
            setHighlightIds((prev) => ({ ...prev, [verseNum]: h._id }));
            setHighlightedVerses((prev) => ({ ...prev, [verseNum]: h.color }));
          })
          .catch(() => {});
      }
    },
    [isAuthed, highlightIds, passageId, router, send],
  );

  const toggleBookmark = useCallback(() => {
    if (!isAuthed) {
      router.push("/profile");
      return;
    }
    if (bookmarked) {
      send(`/api/users/me/bookmarks/${passageId}`, "DELETE")
        .then(() => setBookmarked(false))
        .catch(() => {});
    } else {
      send("/api/users/me/bookmarks", "POST", { passageId })
        .then(() => setBookmarked(true))
        .catch(() => {});
    }
  }, [isAuthed, bookmarked, passageId, router, send]);

  return (
    <PageTransition className="space-y-6">
      <div className="sticky top-14 z-20 -mx-1 rounded-lg border border-border bg-base/85 px-2 py-3 backdrop-blur sm:top-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Breadcrumb book={bookName} chapter={chapter} />
            <h1 className="font-heading text-2xl font-medium text-heading sm:text-3xl">
              {bookName} {chapter}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleBookmark}
              title={bookmarked ? "Remove bookmark" : "Bookmark this passage"}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors duration-150 ease-out hover:border-accent hover:text-accent",
                bookmarked && "border-accent text-accent",
              )}
            >
              <Bookmark className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              title={showOriginal ? "Hide Hebrew/Greek" : "Show Hebrew/Greek"}
              className={cn(
                "flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-medium transition-colors duration-150 ease-out hover:border-accent hover:text-accent",
                showOriginal && "border-accent text-accent",
              )}
            >
              <span className="font-serif">א</span>
              <span>Original</span>
            </button>
            <LayerPills value={layer} onChange={setLayer} />
            <TranslationSelector value={translation} onChange={setTranslation} />
          </div>
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
        <VerseList
          verses={verses}
          layer={layer}
          activeVerse={activeVerse}
          highlightedVerses={highlightedVerses}
          fontSize={fontSize ?? undefined}
          showOriginal={showOriginal}
          onHighlight={handleHighlight}
          onWordClick={handleWordClick}
        />
      )}

      <DiscoveryCardDeck />

      <ChapterNav book={book} chapter={parseInt(chapter)} totalChapters={totalChapters} />

      {layer >= 2 && <PassageTimeline bookId={book} />}
      {layer >= 2 && <ParallelPassages book={book} chapter={parseInt(chapter)} />}

      <InspectorPanel
        word={selectedWord?.word ?? null}
        strongsNumber={selectedWord?.strongs}
        gloss={selectedWord?.gloss}
        transliteration={selectedWord?.transliteration}
        pos={selectedWord?.pos}
        morph={selectedWord?.morph}
        lemma={selectedWord?.lemma}
        onClose={() => setSelectedWord(null)}
      />
    </PageTransition>
  );
}
