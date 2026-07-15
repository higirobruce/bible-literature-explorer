"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SignInForm } from "@/components/auth/SignInForm";
import { useApi } from "@/hooks/useApi";
import { ArrowLeft } from "lucide-react";

const TRANSLATIONS = [
  { id: "web", label: "World English Bible (WEB)" },
  { id: "kjv", label: "King James Version (KJV)" },
  { id: "asv", label: "American Standard Version (ASV)" },
];

interface Preferences {
  defaultTranslation: string;
  fontSize: number;
  theme: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const { get, send } = useApi();

  const [prefs, setPrefs] = useState<Preferences>({
    defaultTranslation: "web",
    fontSize: 16,
    theme: "light",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!session?.backendToken) return;
    setLoading(true);
    try {
      const data = await get<Preferences>("/api/users/me/preferences");
      setPrefs({
        defaultTranslation: data.defaultTranslation ?? "web",
        fontSize: data.fontSize ?? 16,
        theme: data.theme ?? "light",
      });
    } catch {
      // keep defaults
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
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-40 w-full rounded-lg" />
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

  const save = () => {
    setSaving(true);
    setMessage(null);
    send<Preferences>("/api/users/me/preferences", "PUT", {
      defaultTranslation: prefs.defaultTranslation,
      fontSize: prefs.fontSize,
      theme: prefs.theme,
    })
      .then((data) => {
        setPrefs({
          defaultTranslation: data.defaultTranslation ?? "web",
          fontSize: data.fontSize ?? 16,
          theme: data.theme ?? "light",
        });
        setMessage("Preferences saved.");
      })
      .catch(() => setMessage("Could not save preferences."))
      .finally(() => setSaving(false));
  };

  return (
    <PageTransition className="space-y-6">
      <Link
        href="/profile"
        className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Profile
      </Link>

      <div>
        <h1 className="font-heading text-2xl font-medium text-heading">Settings</h1>
        <p className="mt-1 text-sm text-secondary">
          Your preferences sync across devices when you are signed in.
        </p>
      </div>

      <Card className="space-y-6 p-5">
        <div>
          <h3 className="text-sm font-semibold text-heading">Default translation</h3>
          <p className="mb-2 text-xs text-muted">
            Used when you open a passage without choosing a translation.
          </p>
          <select
            value={prefs.defaultTranslation}
            onChange={(e) => setPrefs((p) => ({ ...p, defaultTranslation: e.target.value }))}
            disabled={loading}
            className="w-full rounded-lg border border-border bg-base px-3 py-2 text-sm text-primary outline-none focus:border-accent"
          >
            {TRANSLATIONS.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-heading">
            Reading font size
          </h3>
          <p className="mb-2 text-xs text-muted">Adjusts the size of verse text.</p>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={13}
              max={24}
              value={prefs.fontSize}
              onChange={(e) => setPrefs((p) => ({ ...p, fontSize: Number(e.target.value) }))}
              disabled={loading}
              className="flex-1 accent-accent"
            />
            <span className="w-12 text-right text-sm tabular-nums text-secondary">
              {prefs.fontSize}px
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-muted">
            {message ?? (saving ? "Saving…" : "")}
          </span>
          <button
            onClick={save}
            disabled={saving || loading}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save preferences"}
          </button>
        </div>
      </Card>
    </PageTransition>
  );
}
