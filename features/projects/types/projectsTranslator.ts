import type { getTranslations } from "next-intl/server";

export type ProjectsTranslator = Awaited<ReturnType<typeof getTranslations<"ProjectsScreen">>>;
