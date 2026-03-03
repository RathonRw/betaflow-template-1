import type { TUser } from "../types";
import { extractRateLimit, type RateLimitInfo } from "./blogs";

export interface UserResponse {
  data: TUser | null;
  rateLimit: RateLimitInfo;
}

export async function getMe(): Promise<UserResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL;
  const apiKey = process.env.USER_API_KEY;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_SITE_URL is not set");
  }
  if (!apiKey) {
    throw new Error("USER_API_KEY is not set");
  }

  let res: Response;
  try {
    res = await fetch(`${baseUrl}/getMe`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });
  } catch (err) {
    throw new Error(
      `Network error while fetching user: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  // Handle rate limit exceeded
  if (res.status === 429) {
    const rateLimit = extractRateLimit(res.headers);
    throw new Error(
      `Rate limit exceeded. Plan: ${rateLimit.plan} (${rateLimit.limit}/month). Resets at ${rateLimit.reset}`,
    );
  }

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch user: ${res.status} ${res.statusText}${errorBody ? ` — ${errorBody}` : ""}`,
    );
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new Error("Failed to parse user response as JSON");
  }

  if (typeof body !== "object" || body === null || !("data" in body)) {
    throw new Error(
      `Unexpected response shape: expected { data: {} }, got ${typeof body}`,
    );
  }

  return {
    data: (body as { data: TUser }).data ?? null,
    rateLimit: extractRateLimit(res.headers),
  };
}
