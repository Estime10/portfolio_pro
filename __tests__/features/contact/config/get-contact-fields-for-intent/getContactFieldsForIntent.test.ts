import { describe, expect, it } from "vitest";
import { getContactFieldsForIntent } from "@/features/contact/config/get-contact-fields-for-intent/getContactFieldsForIntent";
import { CONTACT_FIELD_IDS } from "@/features/contact/types/contact-field-id/contactFieldId";

describe("getContactFieldsForIntent", () => {
  it("returns no fields for general contact", () => {
    expect(getContactFieldsForIntent("general-contact")).toEqual([]);
  });

  it("returns all wizard fields for marketing-site", () => {
    const fields = getContactFieldsForIntent("marketing-site");
    expect(fields.map((field) => field.id)).toEqual([...CONTACT_FIELD_IDS]);
  });
});
