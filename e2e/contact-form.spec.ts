import { test, expect } from "@playwright/test";
import { mockContactApiSuccess } from "./helpers/contact-api";
import { visitMainRoute } from "./helpers/navigation";

test.describe("formulaire contact", () => {
  test("soumet une demande site vitrine avec succès", async ({ page }) => {
    await mockContactApiSuccess(page);
    await visitMainRoute(page, "/contact", "fr");

    await page
      .getByRole("group", { name: /Que souhaitez-vous construire/i })
      .locator("label")
      .filter({ hasText: "Site vitrine / marketing" })
      .click();
    await expect(page.getByLabel("Nom")).toBeVisible();

    await page.getByLabel("Nom").fill("Estime E2E");
    await expect(page.getByLabel("E-mail")).toBeVisible();
    await page.getByLabel("E-mail").fill("e2e@example.com");
    await expect(page.getByLabel("Message")).toBeVisible();
    await page.getByLabel("Message").fill("Message de test Playwright.");

    const submitButton = page.getByRole("button", { name: "Envoyer le message" });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await expect(page.getByRole("heading", { name: "Message envoyé" })).toBeVisible();
    await expect(page.getByText(/Merci — votre message est bien parti/i)).toBeVisible();
  });
});
