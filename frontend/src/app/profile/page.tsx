"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTransition } from "@/components/ui/page-transition";
import { SignInForm } from "@/components/auth/SignInForm";
import { useApi } from "@/hooks/useApi";
import { BOOKS } from "@/data/books";
import { Bookmark, Highlighter, StickyNote, LogOut, Plus, Trash2, X, Settings } from "lucide-react";

interface Highlight {
  _id: string;
  passageId: string;
  verseRange: string;
  color: string;
  createdAt?: string;
}

interface Note {
  _id: string;
  passageId: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

function passageHref(passageId: string) {
  return `/passage/${passageId.replace("-", "/")}`;
}

function passageLabel(passageId: string) {
  const [bookId, chapter] = passageId.split("-");
  const book = BOOKS.find((b) => b.id === bookId);
  return book ? `${book.name} ${chapter}` : passageId;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { get, send } = useApi();

  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const [noteRef, setNoteRef] = useState("");
  const [noteText, setNoteText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const load = useCallback(async () => {
    if (!session?.backendToken) return;
    setLoading(true);
    try {
      const [hls, bms, nts] = await Promise.all([
        get<Highlight[]>("/api/users/me/highlights"),
        get<string[]>("/api/users/me/bookmarks"),
        get<Note[]>("/api/users/me/notes"),
      ]);
      setHighlights(hls);
      setBookmarks(bms);
      setNotes(nts);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [session, get]);

  useEffect(() => {
    if (session?.backendToken) load();
  }, [session, load]);

  if (status === "loading") {
    return (
      <PageTransition>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="mt-2 h-6 w-12" />
                <Skeleton className="mt-1 h-3 w-20" />
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!session) {
    return (
      <PageTransition>
        <SignInForm />
      </PageTransition>
    );
  }

  const deleteHighlight = (id: string) => {
    send(`/api/users/me/highlights/${id}`, "DELETE")
      .then(() => setHighlights((prev) => prev.filter((h) => h._id !== id)))
      .catch(() => {});
  };

  const removeBookmark = (passageId: string) => {
    send(`/api/users/me/bookmarks/${passageId}`, "DELETE")
      .then(() => setBookmarks((prev) => prev.filter((b) => b !== passageId)))
      .catch(() => {});
  };

  const addNote = () => {
    const ref = noteRef.trim() || "gen-1";
    const text = noteText.trim();
    if (!text) return;
    send<Note>("/api/users/me/notes", "POST", { passageId: ref, text })
      .then((n) => {
        setNotes((prev) => [n, ...prev]);
        setNoteText("");
        setNoteRef("");
      })
      .catch(() => {});
  };

  const saveNoteEdit = (id: string) => {
    const text = editingText.trim();
    if (!text) return;
    send<Note>(`/api/users/me/notes/${id}`, "PUT", { text })
      .then((n) => {
        setNotes((prev) => prev.map((x) => (x._id === id ? n : x)));
        setEditingId(null);
      })
      .catch(() => {});
  };

  const deleteNote = (id: string) => {
    send(`/api/users/me/notes/${id}`, "DELETE")
      .then(() => setNotes((prev) => prev.filter((n) => n._id !== id)))
      .catch(() => {});
  };

  return (
    <PageTransition className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-heading">
            {session.user?.name ?? "Profile"}
          </h1>
          <p className="text-sm text-secondary">{session.user?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/settings"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <Settings className="h-3.5 w-3.5" />
            Settings
          </Link>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <Highlighter className="h-5 w-5 text-terracotta" />
          <CardTitle className="mt-2 text-lg font-medium">{highlights.length}</CardTitle>
          <CardDescription>Highlights</CardDescription>
        </Card>
        <Card>
          <Bookmark className="h-5 w-5 text-deep-indigo" />
          <CardTitle className="mt-2 text-lg font-medium">{bookmarks.length}</CardTitle>
          <CardDescription>Bookmarks</CardDescription>
        </Card>
        <Card>
          <StickyNote className="h-5 w-5 text-olive" />
          <CardTitle className="mt-2 text-lg font-medium">{notes.length}</CardTitle>
          <CardDescription>Notes</CardDescription>
        </Card>
      </div>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Recent Highlights
        </h2>
        {loading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : highlights.length === 0 ? (
          <EmptyState icon={Highlighter} title="No highlights yet" description="Highlight verses while reading to see them here." />
        ) : (
          <div className="space-y-2">
            {highlights.map((h) => (
              <div key={h._id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <div className="h-4 w-4 shrink-0 rounded" style={{ backgroundColor: h.color }} />
                <Link href={passageHref(h.passageId)} className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-heading">{passageLabel(h.passageId)}</span>
                  <span className="ml-2 text-xs text-muted">Verse {h.verseRange}</span>
                </Link>
                <button
                  onClick={() => deleteHighlight(h._id)}
                  className="text-muted transition-colors hover:text-terracotta"
                  title="Delete highlight"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Bookmarked Passages
        </h2>
        {loading ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-7 w-16 rounded-full" />
            ))}
          </div>
        ) : bookmarks.length === 0 ? (
          <EmptyState icon={Bookmark} title="No bookmarks yet" description="Bookmark passages while reading to see them here." />
        ) : (
          <div className="flex flex-wrap gap-2">
            {bookmarks.map((b) => (
              <span key={b} className="group flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-secondary">
                <Link href={passageHref(b)} className="transition-colors hover:text-accent">
                  {passageLabel(b)}
                </Link>
                <button
                  onClick={() => removeBookmark(b)}
                  className="text-muted transition-colors hover:text-terracotta"
                  title="Remove bookmark"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Recent Notes
        </h2>
        <div className="mb-4 rounded-lg border border-border bg-card p-3">
          <div className="flex gap-2">
            <input
              value={noteRef}
              onChange={(e) => setNoteRef(e.target.value)}
              placeholder="Passage (e.g. ps-23)"
              className="w-40 rounded-lg border border-border bg-base px-2.5 py-1.5 text-xs text-primary outline-none focus:border-accent"
            />
            <input
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              placeholder="Write a note…"
              className="flex-1 rounded-lg border border-border bg-base px-2.5 py-1.5 text-xs text-primary outline-none focus:border-accent"
            />
            <button
              onClick={addNote}
              className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
        </div>
        {loading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <EmptyState icon={StickyNote} title="No notes yet" description="Add notes to passages while reading to see them here." />
        ) : (
          <div className="space-y-2">
            {notes.map((n) => (
              <div key={n._id} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <Link href={passageHref(n.passageId)} className="text-xs font-medium text-accent">
                    {passageLabel(n.passageId)}
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingId(n._id); setEditingText(n.text); }}
                      className="text-xs text-muted transition-colors hover:text-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(n._id)}
                      className="text-muted transition-colors hover:text-terracotta"
                      title="Delete note"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {editingId === n._id ? (
                  <div className="mt-2 flex gap-2">
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={3}
                      className="flex-1 rounded-lg border border-border bg-base px-2.5 py-1.5 text-sm text-primary outline-none focus:border-accent"
                    />
                    <button
                      onClick={() => saveNoteEdit(n._id)}
                      className="self-start rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-primary">{n.text}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
