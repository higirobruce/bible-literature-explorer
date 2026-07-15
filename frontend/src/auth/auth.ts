import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";
import { API_BASE } from "@/lib/api";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
    ...(process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET
      ? [
          Apple({
            clientId: process.env.AUTH_APPLE_ID,
            clientSecret: process.env.AUTH_APPLE_SECRET,
          }),
        ]
      : []),
    Credentials({
      id: "credentials",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
        mode: { label: "Mode", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const mode = credentials.mode === "register" ? "register" : "login";
        try {
          const res = await fetch(`${API_BASE}/api/auth/${mode}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          if (!res.ok) return null;
          const data = await res.json();
          if (!data?.access_token) return null;
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.email,
            backendToken: data.access_token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/profile",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const email = (token.email as string) ?? (user?.email as string);
      if (user && (user as { backendToken?: string }).backendToken) {
        token.backendToken = (user as { backendToken?: string }).backendToken;
        token.id = (user as { id: string }).id;
        token.email = (user as { email: string }).email;
      } else if (account && account.provider !== "credentials" && email) {
        try {
          const res = await fetch(`${API_BASE}/api/auth/sso`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (res.ok) {
            const data = await res.json();
            token.backendToken = data.access_token;
            token.id = data.user.id;
          }
        } catch {
          // ignore — OAuth session still works, saved items will prompt re-auth
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token?.id) {
        (session.user as { id?: string }).id = token.id as string;
        (session as { backendToken?: string }).backendToken = token.backendToken as string;
      }
      return session;
    },
  },
};
