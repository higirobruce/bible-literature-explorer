"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LexiconSectionProps {
  word: string;
  strongsNumber?: string;
}

interface LexiconData {
  strongs: string;
  lemma: string;
  hebrew?: string;
  greek?: string;
  transliteration: string;
  pronunciation: string;
  partOfSpeech: string;
  gloss: string;
  occurrences: number;
}

export function LexiconSection({ word, strongsNumber }: LexiconSectionProps) {
  const [data, setData] = useState<LexiconData | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!word) return;
    setLoading(true);
    setNotFound(false);
    setData(null);

    const url = strongsNumber
      ? `http://localhost:4000/api/lexicon/${strongsNumber}`
      : `http://localhost:4000/api/lexicon?q=${word}`;

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) {
          setData(d[0]);
        } else if (!d.error) {
          setData(d);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [word, strongsNumber]);

  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Lexicon
      </h3>
      {loading && (
        <div className="space-y-2 rounded-lg border border-border bg-card p-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      )}
      {!loading && data && (
        <div className="space-y-2 rounded-lg border border-border bg-card p-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {data.hebrew && (
              <div>
                <span className="text-xs text-muted">Hebrew</span>
                <p className="font-medium text-heading" lang="he" dir="rtl">{data.hebrew}</p>
              </div>
            )}
            {data.greek && (
              <div>
                <span className="text-xs text-muted">Greek</span>
                <p className="font-medium text-heading">{data.greek}</p>
              </div>
            )}
            <div>
              <span className="text-xs text-muted">Strong&apos;s</span>
              <p className="font-medium text-heading">{data.strongs}</p>
            </div>
            <div>
              <span className="text-xs text-muted">Transliteration</span>
              <p className="font-medium text-heading italic">{data.transliteration}</p>
            </div>
            <div>
              <span className="text-xs text-muted">Pronunciation</span>
              <p className="font-medium text-heading">{data.pronunciation}</p>
            </div>
            <div>
              <span className="text-xs text-muted">{data.partOfSpeech}</span>
              <p className="font-medium text-heading">{data.occurrences} occurrences</p>
            </div>
          </div>
          <div>
            <span className="text-xs text-muted">Gloss</span>
            <p className="text-sm text-primary">{data.gloss}</p>
          </div>
        </div>
      )}
      {!loading && notFound && (
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-xs text-muted">
            No lexical data available for &ldquo;{word}&rdquo;.
          </p>
        </div>
      )}
    </section>
  );
}
