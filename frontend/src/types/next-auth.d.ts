import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    backendToken?: string;
    user: {
      id?: string;
    } & DefaultSession["user"];
  }

  interface User {
    backendToken?: string;
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    id?: string;
  }
}
