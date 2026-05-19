import { describe, expect, it } from "vitest";
import { isValidContactEmail } from "@/features/contact/validation/is-valid-contact-email/isValidContactEmail";

describe("isValidContactEmail", () => {
  it("accepts a standard email", () => {
    expect(isValidContactEmail("estimevangu.pro@gmail.com")).toBe(true);
  });

  it("rejects missing domain", () => {
    expect(isValidContactEmail("user@")).toBe(false);
  });

  it("rejects missing local part", () => {
    expect(isValidContactEmail("@domain.com")).toBe(false);
  });

  it("rejects strings without @", () => {
    expect(isValidContactEmail("not-an-email")).toBe(false);
  });
});
