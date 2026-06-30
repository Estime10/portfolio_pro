import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

const MAIN_CONTENT_ID = "main-content";

type E2ELocale = "fr" | "en";

export async function visitMainRoute(
  page: Page,
  pathname: string,
  locale: E2ELocale = "fr",
): Promise<void> {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  await page.goto(`${normalizedPath}?lang=${locale}`);
  await expect(page.locator(`#${MAIN_CONTENT_ID}`)).toBeVisible();
}

export async function openDesktopMainNav(page: Page): Promise<void> {
  const menuToggle = page.getByRole("button", {
    name: /Ouvrir la navigation|Open navigation/i,
  });
  await menuToggle.click();
}

export async function navigateViaDesktopMainNav(
  page: Page,
  itemLabel: string | RegExp,
  expectedPath: string | RegExp,
): Promise<void> {
  await openDesktopMainNav(page);
  await page.locator('[data-nav-option="true"]').filter({ hasText: itemLabel }).click();
  await page.waitForURL(expectedPath);
  await expect(page.locator(`#${MAIN_CONTENT_ID}`)).toBeVisible();
}
