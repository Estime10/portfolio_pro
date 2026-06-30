import type { Page } from "@playwright/test";

export async function mockContactApiSuccess(page: Page): Promise<void> {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
}
