import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl } from "@/lib/metadata/get-site-url/getSiteUrl";

describe("getSiteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.com/portfolio");
    vi.stubEnv("NODE_ENV", "production");

    expect(getSiteUrl().toString()).toBe("https://www.example.com/");
  });

  it("adds https when the env value has no protocol", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "portfolio.example.com");
    vi.stubEnv("NODE_ENV", "production");

    expect(getSiteUrl().toString()).toBe("https://portfolio.example.com/");
  });

  it("uses VERCEL_PROJECT_PRODUCTION_URL when explicit site url is missing", () => {
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "portfolio-pro.vercel.app");
    vi.stubEnv("VERCEL_URL", "portfolio-pro-git-main-estime10.vercel.app");
    vi.stubEnv("NODE_ENV", "production");

    expect(getSiteUrl().toString()).toBe("https://portfolio-pro.vercel.app/");
  });

  it("uses VERCEL_URL when production host is missing", () => {
    vi.stubEnv("VERCEL_URL", "portfolio-pro.vercel.app");
    vi.stubEnv("NODE_ENV", "production");

    expect(getSiteUrl().toString()).toBe("https://portfolio-pro.vercel.app/");
  });

  it("prefers NEXT_PUBLIC_SITE_URL over Vercel system variables", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.estimevangu.com");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "portfolio-pro.vercel.app");
    vi.stubEnv("NODE_ENV", "production");

    expect(getSiteUrl().toString()).toBe("https://www.estimevangu.com/");
  });

  it("falls back to localhost in development", () => {
    vi.stubEnv("NODE_ENV", "development");

    expect(getSiteUrl().toString()).toBe("http://localhost:3000/");
  });
});
