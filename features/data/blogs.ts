import type { TBlog } from "../types";

export interface RateLimitInfo {
  limit: number;
  plan: string;
  remaining: number;
  reset: string;
  used: number;
}

export interface BlogsResponse {
  data: TBlog[];
  rateLimit: RateLimitInfo;
}

export function extractRateLimit(headers: Headers): RateLimitInfo {
  return {
    limit: Number(headers.get("X-RateLimit-Limit") ?? 0),
    remaining: Number(headers.get("X-RateLimit-Remaining") ?? 0),
    used: Number(headers.get("X-RateLimit-Used") ?? 0),
    reset: headers.get("X-RateLimit-Reset") ?? "",
    plan: headers.get("X-RateLimit-Plan") ?? "free",
  };
}

export async function getMyBlogs(): Promise<BlogsResponse> {
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
    res = await fetch(`${baseUrl}/getMyBlogs`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });
  } catch (err) {
    throw new Error(
      `Network error while fetching blogs: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  // Handle rate limit exceeded specifically
  if (res.status === 429) {
    const rateLimit = extractRateLimit(res.headers);
    throw new Error(
      `Rate limit exceeded. Plan: ${rateLimit.plan} (${rateLimit.limit}/month). Resets at ${rateLimit.reset}`,
    );
  }

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch blogs: ${res.status} ${res.statusText}${errorBody ? ` — ${errorBody}` : ""}`,
    );
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new Error("Failed to parse blog response as JSON");
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
    data: (body as { data: TBlog[] }).data,
    rateLimit: extractRateLimit(res.headers),
  };
}
