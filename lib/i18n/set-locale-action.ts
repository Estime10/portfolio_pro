"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { isAppLocale, LOCALE_COOKIE, type AppLocale } from "@/lib/i18n/config";

export async function setLocaleAction(locale: AppLocale): Promise<void> {
  if (!isAppLocale(locale)) {
    return;
  }

  const jar = await cookies();
  jar.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  revalidatePath("/", "layout");
}
