import { test, expect } from "@playwright/test";
import { mockContactApiSuccess } from "./helpers/contact-api";
import { visitMainRoute } from "./helpers/navigation";

test.describe("formulaire contact", () => {
  test("soumet une demande site vitrine avec succès", async ({ page }) => {
    await mockContactApiSuccess(page);
    await visitMainRoute(page, "/contact", "fr");

    await page.getByText("Site vitrine / marketing", { exact: true }).click();

    await page.getByLabel("Nom").fill("Estime E2E");
    await page.getByLabel("E-mail").fill("e2e@example.com");
    await page.getByLabel("Message").fill("Message de test Playwright.");

    await page.getByRole("button", { name: "Envoyer le message" }).click();

    await expect(page.getByRole("heading", { name: "Message envoyé" })).toBeVisible();
    await expect(page.getByText(/Merci — votre message est bien parti/i)).toBeVisible();
  });
});
