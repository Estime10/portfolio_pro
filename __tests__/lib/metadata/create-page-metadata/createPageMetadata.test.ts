import { afterEach, describe, expect, it, vi } from "vitest";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata/createPageMetadata";

describe("createPageMetadata", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds canonical, Open Graph and Twitter metadata", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example.com");
    vi.stubEnv("NODE_ENV", "production");

    const metadata = createPageMetadata({
      title: "Projects",
      description: "Selected work.",
      pathname: "/projects",
      locale: "fr",
    });

    expect(metadata.title).toBe("Projects");
    expect(metadata.description).toBe("Selected work.");
    const canonical = metadata.alternates?.canonical;
    expect(canonical).toBeInstanceOf(URL);
    expect((canonical as URL).href).toBe("https://portfolio.example.com/projects");
    expect(metadata.openGraph?.title).toBe("Projects | Estime Vangu");
    expect(metadata.openGraph?.locale).toBe("fr_FR");
    expect(metadata.openGraph?.alternateLocale).toEqual(["en_US"]);
    expect(metadata.openGraph?.url?.toString()).toBe("https://portfolio.example.com/projects");
    expect(metadata.alternates?.languages).toEqual({
      "fr-FR": "https://portfolio.example.com/projects?lang=fr",
      "en-US": "https://portfolio.example.com/projects?lang=en",
      "x-default": "https://portfolio.example.com/projects?lang=fr",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Projects | Estime Vangu",
    });
  });

  it("supports an absolute document title", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example.com");

    const metadata = createPageMetadata({
      title: "Estime Vangu — Portfolio",
      description: "Splash entry.",
      pathname: "/",
      locale: "en",
      titleAbsolute: true,
    });

    expect(metadata.title).toEqual({ absolute: "Estime Vangu — Portfolio" });
    expect(metadata.openGraph?.locale).toBe("en_US");
    expect(metadata.openGraph?.alternateLocale).toEqual(["fr_FR"]);
    expect(metadata.openGraph?.title).toBe("Estime Vangu — Portfolio");
  });
});
