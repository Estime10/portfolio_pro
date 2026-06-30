import { describe, expect, it } from "vitest";
import { isGeneralContactIntent } from "@/features/contact-screen/domain/is-general-contact-intent/isGeneralContactIntent";

describe("isGeneralContactIntent", () => {
  it("returns true for general-contact", () => {
    expect(isGeneralContactIntent("general-contact")).toBe(true);
  });

  it("returns false for wizard intents", () => {
    expect(isGeneralContactIntent("marketing-site")).toBe(false);
    expect(isGeneralContactIntent("business-app")).toBe(false);
  });
});
