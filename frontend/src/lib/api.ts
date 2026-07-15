export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function authHeaders(token?: string | null): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function apiGet<T>(path: string, token?: string | null): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function apiSend<T>(
  path: string,
  method: "POST" | "PUT" | "DELETE",
  token: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: authHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}
