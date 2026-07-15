"use client";

import { useState, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import { cn } from "@/lib/utils";

const oauthLabels: Record<string, string> = {
  google: "Continue with Google",
  apple: "Continue with Apple",
};

export function SignInForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthProviders, setOauthProviders] = useState<string[]>([]);

  useEffect(() => {
    getProviders().then((p) => {
      if (!p) return;
      setOauthProviders(
        Object.values(p)
          .map((prov) => prov.id)
          .filter((id) => id !== "credentials"),
      );
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      mode,
      redirect: false,
    });
    setLoading(false);
    if (!res?.ok) {
      setError(
        mode === "register"
          ? "Could not create account. Email may already be in use."
          : "Invalid email or password.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-md py-16">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-xl font-medium text-heading">
          {mode === "register" ? "Create your account" : "Sign in"}
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Save highlights, bookmarks, and notes across devices.
        </p>

        <div className="mt-5 flex gap-1 rounded-lg border border-border bg-base p-1">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(null); }}
              className={cn(
                "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                mode === m ? "bg-accent text-white" : "text-secondary hover:text-accent",
              )}
            >
              {m === "login" ? "Sign in" : "Register"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <div>
            <label className="text-xs font-medium text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-base px-3 py-2 text-sm text-primary outline-none focus:border-accent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-base px-3 py-2 text-sm text-primary outline-none focus:border-accent"
              placeholder={mode === "register" ? "At least 6 characters" : "Your password"}
            />
          </div>

          {error && <p className="text-xs text-terracotta">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "register" ? "Create account" : "Sign in"}
          </button>
        </form>

        {oauthProviders.length > 0 && (
          <>
            <div className="my-4 flex items-center gap-3 text-xs text-muted">
              <span className="h-px flex-1 bg-border" />
              or
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-2">
              {oauthProviders.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => signIn(id)}
                  className="w-full rounded-lg border border-border bg-base px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  {oauthLabels[id] ?? `Continue with ${id}`}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
