const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = Readonly<{
  count: number;
  resetAt: number;
}>;

export type ContactSubmissionRateLimitResult = Readonly<{
  allowed: boolean;
  retryAfterSeconds?: number;
}>;

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkContactSubmissionRateLimit(
  clientKey: string,
): ContactSubmissionRateLimitResult {
  const now = Date.now();
  const current = rateLimitStore.get(clientKey);

  if (!current || now >= current.resetAt) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  rateLimitStore.set(clientKey, {
    count: current.count + 1,
    resetAt: current.resetAt,
  });

  return { allowed: true };
}
