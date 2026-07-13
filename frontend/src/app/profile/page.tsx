"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Bookmark, Highlighter, StickyNote, LogIn, LogOut, User } from "lucide-react";

const mockHighlights = [
  { passageId: "genesis-1", verseRange: "1:1-3", color: "#FDE68A", createdAt: "2026-07-13" },
  { passageId: "genesis-1", verseRange: "1:26", color: "#93C5FD", createdAt: "2026-07-12" },
];

const mockBookmarks = ["genesis-1", "psalms-23", "isaiah-53"];

const mockNotes = [
  { passageId: "genesis-1", text: "The creation account parallels Enuma Elish in structure but differs in theology.", createdAt: "2026-07-13" },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <User className="mx-auto h-12 w-12 text-muted" />
        <h1 className="mt-4 font-heading text-xl font-medium text-heading">Sign in</h1>
        <p className="mt-2 text-sm text-secondary">
          Sign in to sync highlights, bookmarks, and notes across devices.
        </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => signIn("google")}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Continue with Google
          </button>
          <button
            onClick={() => signIn("apple")}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Continue with Apple
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-medium text-heading">
            {session.user.name ?? "Profile"}
          </h1>
          <p className="text-sm text-secondary">{session.user.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-secondary hover:border-accent hover:text-accent transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <Highlighter className="h-5 w-5 text-terracotta" />
          <CardTitle className="mt-2 text-lg font-medium">
            {mockHighlights.length}
          </CardTitle>
          <CardDescription>Highlights</CardDescription>
        </Card>
        <Card>
          <Bookmark className="h-5 w-5 text-deep-indigo" />
          <CardTitle className="mt-2 text-lg font-medium">
            {mockBookmarks.length}
          </CardTitle>
          <CardDescription>Bookmarks</CardDescription>
        </Card>
        <Card>
          <StickyNote className="h-5 w-5 text-olive" />
          <CardTitle className="mt-2 text-lg font-medium">
            {mockNotes.length}
          </CardTitle>
          <CardDescription>Notes</CardDescription>
        </Card>
      </div>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Recent Highlights
        </h2>
        <div className="space-y-2">
          {mockHighlights.map((h) => (
            <div key={h.verseRange} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              <div className="h-4 w-4 rounded" style={{ backgroundColor: h.color }} />
              <div>
                <span className="text-sm font-medium text-heading">{h.passageId}</span>
                <span className="ml-2 text-xs text-muted">Verse {h.verseRange}</span>
              </div>
              <span className="ml-auto text-xs text-muted">{h.createdAt}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Bookmarked Passages
        </h2>
        <div className="flex flex-wrap gap-2">
          {mockBookmarks.map((b) => (
            <a
              key={b}
              href={`/passage/${b.replace("-", "/")}`}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-secondary hover:border-accent hover:text-accent transition-colors"
            >
              {b}
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Recent Notes
        </h2>
        <div className="space-y-2">
          {mockNotes.map((n) => (
            <div key={n.createdAt} className="rounded-lg border border-border bg-card p-3">
              <span className="text-xs font-medium text-accent">{n.passageId}</span>
              <p className="mt-1 text-sm text-primary">{n.text}</p>
              <span className="mt-1 block text-xs text-muted">{n.createdAt}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
