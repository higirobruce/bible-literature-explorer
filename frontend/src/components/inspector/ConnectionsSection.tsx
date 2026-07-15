"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ConnectionsSectionProps {
  word: string;
}

interface EntityDetail {
  type: string;
  slug: string;
  occurrences: { reference: string; text: string }[];
}

const BOOK_TO_ID: Record<string, string> = {
  genesis: "gen", exodus: "exod", leviticus: "lev", numbers: "num", deuteronomy: "deut",
  joshua: "josh", judges: "judg", ruth: "ruth",
  "1samuel": "1sam", "2samuel": "2sam", "1kings": "1kgs", "2kings": "2kgs",
  "1chronicles": "1chr", "2chronicles": "2chr",
  ezra: "ezra", nehemiah: "neh", esther: "esth",
  job: "job", psalms: "ps", proverbs: "prov", ecclesiastes: "eccl",
  "song of solomon": "song", isaiah: "isa", jeremiah: "jer",
  lamentations: "lam", ezekiel: "ezek", daniel: "dan",
  hosea: "hos", joel: "joel", amos: "amos", obadiah: "obad", jonah: "jonah",
  micah: "mic", nahum: "nah", habakkuk: "hab", zephaniah: "zeph",
  haggai: "hag", zechariah: "zech", malachi: "mal",
  matthew: "matt", mark: "mark", luke: "luke", john: "john", acts: "acts",
  romans: "rom", "1corinthians": "1cor", "2corinthians": "2cor",
  galatians: "gal", ephesians: "eph", philippians: "phil", colossians: "col",
  "1thessalonians": "1thess", "2thessalonians": "2thess",
  "1timothy": "1tim", "2timothy": "2tim", titus: "titus", philemon: "phlm",
  hebrews: "heb", james: "jas", "1peter": "1pet", "2peter": "2pet",
  "1john": "1john", "2john": "2john", "3john": "3john", jude: "jude", revelation: "rev",
};

function refToHref(reference: string): string {
  const [book, rest] = reference.split(" ");
  const chapter = (rest ?? "").split(":")[0];
  const id = BOOK_TO_ID[book.toLowerCase().replace(/[^a-z]/g, "")] ?? book.toLowerCase();
  return `/passage/${id}/${chapter}`;
}

export function ConnectionsSection({ word }: ConnectionsSectionProps) {
  const [refs, setRefs] = useState<{ reference: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!word) return;
    setLoading(true);
    const query = word.replace(/[^a-zA-Zא-ת]/g, "");
    fetch(`http://localhost:4000/api/entities/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((hits: { type: string; slug: string }[]) => {
        if (!Array.isArray(hits) || hits.length === 0) {
          setRefs([]);
          return;
        }
        const top = hits[0];
        return fetch(
          `http://localhost:4000/api/entities/${top.type.toLowerCase()}/${top.slug}`,
        )
          .then((r) => (r.ok ? r.json() : null))
          .then((detail: EntityDetail | null) => {
            setRefs(detail?.occurrences?.slice(0, 5) ?? []);
          });
      })
      .catch(() => setRefs([]))
      .finally(() => setLoading(false));
  }, [word]);

  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Cross References
      </h3>
      {loading && <Skeleton className="h-16 w-full" />}
      {!loading && refs.length === 0 && (
        <p className="text-xs text-muted">No cross-references indexed for “{word}”.</p>
      )}
      {!loading && refs.length > 0 && (
        <div className="space-y-2">
          {refs.map((conn) => (
            <a
              key={conn.reference}
              href={refToHref(conn.reference)}
              className={cn(
                "block rounded-lg border border-border bg-card p-3 transition-colors hover:border-accent/30",
              )}
            >
              <span className="text-xs font-medium text-accent">{conn.reference}</span>
              <p className="mt-0.5 text-sm text-secondary">{conn.text}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
