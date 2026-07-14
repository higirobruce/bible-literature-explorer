"use client";

import { useSession } from "next-auth/react";
import { apiGet, apiSend } from "@/lib/api";

export function useApi() {
  const { data: session } = useSession();
  const token = session?.backendToken ?? null;

  return {
    token,
    isAuthed: !!token,
    get: <T,>(path: string) => apiGet<T>(path, token),
    send: <T,>(path: string, method: "POST" | "PUT" | "DELETE", body?: Record<string, unknown>) =>
      apiSend<T>(path, method, token as string, body),
  };
}
