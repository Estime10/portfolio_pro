import { describe, expect, it } from "vitest";
import { getSitemapRoutes } from "@/lib/metadata/sitemap-routes/getSitemapRoutes";

describe("getSitemapRoutes", () => {
  it("lists public indexable routes including featured case studies", () => {
    const routes = getSitemapRoutes();

    expect(routes).toContain("/");
    expect(routes).toContain("/home");
    expect(routes).toContain("/projects/fleetscan");
    expect(routes).not.toContain("/projects/enna");
  });
});
