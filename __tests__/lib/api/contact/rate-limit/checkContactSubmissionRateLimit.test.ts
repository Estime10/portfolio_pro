import { describe, expect, it } from "vitest";
import { checkContactSubmissionRateLimit } from "@/lib/api/contact/rate-limit/checkContactSubmissionRateLimit";

describe("checkContactSubmissionRateLimit", () => {
  it("allows the first requests for a client key", () => {
    const clientKey = "test-client-allows";

    expect(checkContactSubmissionRateLimit(clientKey).allowed).toBe(true);
    expect(checkContactSubmissionRateLimit(clientKey).allowed).toBe(true);
  });

  it("blocks after the configured number of requests", () => {
    const clientKey = "blocked-client-rate-limit";

    for (let index = 0; index < 5; index += 1) {
      expect(checkContactSubmissionRateLimit(clientKey).allowed).toBe(true);
    }

    const blocked = checkContactSubmissionRateLimit(clientKey);

    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});
