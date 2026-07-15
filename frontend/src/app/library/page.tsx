"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BOOKS, BOOK_SECTIONS, BibleBook } from "@/data/books";
import { cn } from "@/lib/utils";
import { ChevronLeft, BookOpen } from "lucide-react";

type Step = "book" | "chapter" | "verse";

export default function LibraryPage() {
  const router = useRouter();
  const [book, setBook] = useState<BibleBook | null>(null);
  const [chapter, setChapter] = useState<number | null>(null);
  const [verseCount, setVerseCount] = useState<number>(0);
  const [loadingVerses, setLoadingVerses] = useState(false);

  const step: Step = chapter !== null ? "verse" : book ? "chapter" : "book";

  const selectBook = (b: BibleBook) => {
    setBook(b);
    setChapter(null);
    setVerseCount(0);
    window.scrollTo({ top: 0 });
  };

  const selectChapter = (c: number) => {
    if (!book) return;
    setChapter(c);
    setLoadingVerses(true);
    fetch(`http://localhost:4000/api/passages/${book.id}/${c}?translation=web`)
      .then((r) => r.json())
      .then((d) => setVerseCount(Array.isArray(d.verses) ? d.verses.length : 0))
      .catch(() => setVerseCount(0))
      .finally(() => setLoadingVerses(false));
    window.scrollTo({ top: 0 });
  };

  const goBook = () => {
    setBook(null);
    setChapter(null);
    setVerseCount(0);
  };
  const goChapter = () => {
    setChapter(null);
    setVerseCount(0);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb / step indicator */}
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <button
          onClick={goBook}
          className={cn(
            "transition-colors hover:text-accent",
            step === "book" && "text-heading font-medium",
          )}
        >
          Books
        </button>
        {book && (
          <>
            <span>/</span>
            <button
              onClick={goChapter}
              className={cn(
                "transition-colors hover:text-accent",
                step === "chapter" && "text-heading font-medium",
              )}
            >
              {book.name}
            </button>
          </>
        )}
        {book && chapter !== null && (
          <>
            <span>/</span>
            <span className="text-heading font-medium">Chapter {chapter}</span>
          </>
        )}
      </div>

      <div>
        <h1 className="font-heading text-2xl font-medium text-heading">
          {step === "book" && "Library"}
          {step === "chapter" && `${book?.name} — choose a chapter`}
          {step === "verse" && `${book?.name} ${chapter} — choose a verse`}
        </h1>
        <p className="mt-1 text-sm text-secondary">
          {step === "book" &&
            "Browse all 66 books of the Bible. Three public-domain translations are available."}
          {step === "chapter" && "Select a chapter to read or jump to a specific verse."}
          {step === "verse" && "Select a verse to open it in the reader."}
        </p>
      </div>

      {step === "book" && (
        <div className="space-y-8">
          {BOOK_SECTIONS.map((section) => {
            const books = BOOKS.filter((b) => b.section === section);
            if (books.length === 0) return null;
            return (
              <section key={section}>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  {section}
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {books.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => selectBook(b)}
                      className="group flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-colors duration-150 ease-out hover:border-accent/40 hover:bg-accent-subtle/30"
                    >
                      <span className="text-sm font-medium text-heading transition-colors group-hover:text-accent">
                        {b.name}
                      </span>
                      <span className="text-xs text-muted">{b.chapters}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {step === "chapter" && book && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {Array.from({ length: book.chapters }, (_, i) => i + 1).map((c) => (
            <button
              key={c}
              onClick={() => selectChapter(c)}
              className="rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-heading transition-colors duration-150 ease-out hover:border-accent/40 hover:bg-accent-subtle/30"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {step === "verse" && book && chapter !== null && (
        <div>
          {loadingVerses ? (
            <p className="text-sm text-muted">Loading verses…</p>
          ) : (
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
              {Array.from({ length: verseCount }, (_, i) => i + 1).map((v) => (
                <button
                  key={v}
                  onClick={() => router.push(`/passage/${book.id}/${chapter}?verse=${v}`)}
                  className="rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-heading transition-colors duration-150 ease-out hover:border-accent/40 hover:bg-accent-subtle/30"
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {step === "book" && (
        <div className="rounded-lg border border-border bg-card p-4 text-sm text-secondary">
          <BookOpen className="mb-2 h-4 w-4 text-accent" />
          Tip: open any book to drill down to a specific chapter and verse.
        </div>
      )}
    </div>
  );
}
