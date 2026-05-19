import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const projectsScreenFr = JSON.parse(
  readFileSync(join(root, "i18n/messages/projects-screen.fr.json"), "utf8"),
);
const projectsScreenEn = JSON.parse(
  readFileSync(join(root, "i18n/messages/projects-screen.en.json"), "utf8"),
);

for (const [locale, patch] of [
  ["fr", projectsScreenFr],
  ["en", projectsScreenEn],
]) {
  const path = join(root, `i18n/messages/${locale}.json`);
  const messages = JSON.parse(readFileSync(path, "utf8"));
  messages.ProjectsScreen = patch;
  writeFileSync(path, `${JSON.stringify(messages, null, 2)}\n`, "utf8");
}

console.log("Merged ProjectsScreen into fr.json and en.json");
