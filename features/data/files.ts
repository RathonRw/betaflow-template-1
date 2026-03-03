import type { TFile } from "../types";
import { extractRateLimit, type RateLimitInfo } from "./blogs";

export interface FilesResponse {
  data: TFile[];
  rateLimit: RateLimitInfo;
}

export async function getMyFiles(): Promise<FilesResponse> {
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
    res = await fetch(`${baseUrl}/getMyFiles`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });
  } catch (err) {
    throw new Error(
      `Network error while fetching files: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  if (res.status === 429) {
    const rateLimit = extractRateLimit(res.headers);
    throw new Error(
      `Rate limit exceeded. Plan: ${rateLimit.plan} (${rateLimit.limit}/month). Resets at ${rateLimit.reset}`,
    );
  }

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch files: ${res.status} ${res.statusText}${errorBody ? ` — ${errorBody}` : ""}`,
    );
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new Error("Failed to parse files response as JSON");
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("data" in body) ||
    !Array.isArray((body as { data: unknown }).data)
  ) {
    throw new Error(
      `Unexpected response shape: expected { data: [] }, got ${typeof body}`,
    );
  }

  return {
    data: (body as { data: TFile[] }).data,
    rateLimit: extractRateLimit(res.headers),
  };
}
