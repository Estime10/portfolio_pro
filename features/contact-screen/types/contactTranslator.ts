import type { getTranslations } from "next-intl/server";

export type ContactTranslator = Awaited<ReturnType<typeof getTranslations<"ContactScreen">>>;
