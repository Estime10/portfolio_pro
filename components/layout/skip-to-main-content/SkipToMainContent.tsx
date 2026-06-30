import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MAIN_CONTENT_ID } from "@/lib/constants";

export async function SkipToMainContent() {
  const t = await getTranslations("SkipLink");

  return (
    <Link href={`#${MAIN_CONTENT_ID}`} className="ui-skip-link">
      {t("label")}
    </Link>
  );
}
