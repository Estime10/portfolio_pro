import { test, expect } from "@playwright/test";
import { navigateViaDesktopMainNav, visitMainRoute } from "./helpers/navigation";

test.describe("navigation principale", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("navigue entre les sections via le menu desktop", async ({ page }) => {
    await visitMainRoute(page, "/home", "fr");

    await navigateViaDesktopMainNav(page, "Projets", /\/projects$/);
    await expect(page.getByRole("heading", { level: 1, name: "Projets" })).toBeVisible();

    await navigateViaDesktopMainNav(page, "Contact", /\/contact$/);
    await expect(page.getByRole("heading", { level: 1, name: "Contact" })).toBeVisible();

    await navigateViaDesktopMainNav(page, "Profil", /\/profile$/);
    await expect(page.getByRole("heading", { level: 1, name: "Profil" })).toBeVisible();
  });
});
