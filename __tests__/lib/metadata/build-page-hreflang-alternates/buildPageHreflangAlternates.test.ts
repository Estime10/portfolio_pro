import { afterEach, describe, expect, it, vi } from "vitest";
import { buildPageHreflangAlternates } from "@/lib/metadata/build-page-hreflang-alternates/buildPageHreflangAlternates";

describe("buildPageHreflangAlternates", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds fr, en and x-default URLs with the lang query param", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example.com");
    vi.stubEnv("NODE_ENV", "production");

    expect(buildPageHreflangAlternates("/projects")).toEqual({
      "fr-FR": "https://portfolio.example.com/projects?lang=fr",
      "en-US": "https://portfolio.example.com/projects?lang=en",
      "x-default": "https://portfolio.example.com/projects?lang=fr",
    });
  });
});
