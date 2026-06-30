import { test, expect } from "@playwright/test";
import { visitMainRoute } from "./helpers/navigation";

test.describe("locale", () => {
  test("affiche le contenu en anglais via ?lang=en", async ({ page }) => {
    await visitMainRoute(page, "/home", "en");

    await expect(page.getByRole("button", { name: "Start a project" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Choose language \(currently English\)/i }),
    ).toBeVisible();
  });

  test("charge les projets en anglais via ?lang=en", async ({ page }) => {
    await visitMainRoute(page, "/projects", "en");

    await expect(page.getByRole("heading", { level: 1, name: "Projects" })).toBeVisible();
    await expect(page.getByText(/A selection of shipped products/i)).toBeVisible();
  });

  test("expose les alternates hreflang sur la page projets", async ({ page }) => {
    await visitMainRoute(page, "/projects", "fr");

    await expect(page.locator('link[rel="alternate"][hreflang="fr-FR"]')).toHaveAttribute(
      "href",
      /\/projects\?lang=fr$/,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en-US"]')).toHaveAttribute(
      "href",
      /\/projects\?lang=en$/,
    );
  });
});
