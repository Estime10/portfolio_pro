import { describe, expect, it } from "vitest";
import enMessages from "@/i18n/messages/en.json";
import frMessages from "@/i18n/messages/fr.json";
import { parseAppMessages } from "@/lib/i18n/parse-app-messages/parseAppMessages";

describe("parseAppMessages", () => {
  it("accepts valid French messages", () => {
    expect(() => parseAppMessages(frMessages, "fr")).not.toThrow();
  });

  it("accepts valid English messages", () => {
    expect(() => parseAppMessages(enMessages, "en")).not.toThrow();
  });

  it("rejects malformed messages with locale context", () => {
    expect(() => parseAppMessages({ SplashScreen: {} }, "fr")).toThrow(
      /Invalid i18n messages \(fr\)/,
    );
  });
});
