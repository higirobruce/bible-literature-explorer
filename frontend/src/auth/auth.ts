import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
      id: "dev",
      name: "Dev Sign-In",
      credentials: {
        name: { label: "Display Name", type: "text", placeholder: "Enter any name" },
      },
      async authorize(credentials) {
        if (!credentials?.name?.trim()) return null;
        return {
          id: credentials.name.trim().toLowerCase().replace(/\s+/g, "-"),
          name: credentials.name.trim(),
          email: `${credentials.name.trim().toLowerCase().replace(/\s+/g, ".")}@dev.local`,
        };
      },
    }),
  ],
  pages: {
    signIn: "/profile",
  },
  callbacks: {
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
