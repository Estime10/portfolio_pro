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
  await page.goto(`${normalizedPath}?lang=${locale}`, { waitUntil: "load" });
  await expect(page.locator(`#${MAIN_CONTENT_ID}`)).toBeVisible();
  await page.waitForFunction(() => document.querySelector("header button[aria-expanded]") !== null);
}

export async function openDesktopMainNav(page: Page): Promise<void> {
  const menuToggle = page
    .getByRole("navigation", { name: /Navigation principale|Main navigation/i })
    .getByRole("button", { name: /Ouvrir la navigation|Open navigation/i });

  await expect(async () => {
    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
  }).toPass();
}

export async function navigateViaDesktopMainNav(
  page: Page,
  itemLabel: string | RegExp,
  expectedPath: string | RegExp,
): Promise<void> {
  await openDesktopMainNav(page);
  const navItem = page.locator("[data-nav-option]").filter({ hasText: itemLabel });
  await expect(navItem).toBeVisible();
  await navItem.click();
  await page.waitForURL(expectedPath);
  await expect(page.locator(`#${MAIN_CONTENT_ID}`)).toBeVisible();
}
