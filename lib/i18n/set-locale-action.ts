"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { isAppLocale, LOCALE_COOKIE, type AppLocale } from "@/lib/i18n/config";
import {
  getLocaleCookieOptions,
  isSecureRequestProtocol,
} from "@/lib/i18n/get-locale-cookie-options/getLocaleCookieOptions";

export async function setLocaleAction(locale: AppLocale): Promise<void> {
  if (!isAppLocale(locale)) {
    return;
  }

  const forwardedProto = (await headers()).get("x-forwarded-proto") ?? "http";
  const jar = await cookies();
  jar.set(LOCALE_COOKIE, locale, getLocaleCookieOptions(isSecureRequestProtocol(forwardedProto)));

  revalidatePath("/", "layout");
}
