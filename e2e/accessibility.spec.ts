import { test, expect } from "@playwright/test";
import { visitMainRoute } from "./helpers/navigation";

test.describe("accessibilité", () => {
  test("le lien d’évitement amène au contenu principal", async ({ page }) => {
    await visitMainRoute(page, "/home", "fr");

    await page.getByRole("link", { name: "Aller au contenu principal" }).focus();
    await page.keyboard.press("Enter");

    await expect(page.locator("#main-content")).toBeFocused();
  });
});
