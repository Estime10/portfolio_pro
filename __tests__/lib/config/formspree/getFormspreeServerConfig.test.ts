import { afterEach, describe, expect, it, vi } from "vitest";
import { getFormspreeServerConfig } from "@/lib/config/formspree/getFormspreeServerConfig";

describe("getFormspreeServerConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null when the form id is missing", () => {
    vi.stubEnv("FORMSPREE_FORM_ID", "");

    expect(getFormspreeServerConfig()).toBeNull();
  });

  it("builds the Formspree endpoint from the server form id", () => {
    vi.stubEnv("FORMSPREE_FORM_ID", "  xjgqewyk  ");

    expect(getFormspreeServerConfig()).toEqual({
      formId: "xjgqewyk",
      endpoint: "https://formspree.io/f/xjgqewyk",
    });
  });
});
