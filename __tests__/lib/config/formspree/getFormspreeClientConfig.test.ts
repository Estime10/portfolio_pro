import { afterEach, describe, expect, it, vi } from "vitest";
import { getFormspreeClientConfig } from "@/lib/config/formspree/getFormspreeClientConfig";

describe("getFormspreeClientConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null when the form id is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_FORM_ID", "");

    expect(getFormspreeClientConfig()).toBeNull();
  });

  it("builds the Formspree endpoint from the form id", () => {
    vi.stubEnv("NEXT_PUBLIC_FORMSPREE_FORM_ID", "  xjgqewyk  ");

    expect(getFormspreeClientConfig()).toEqual({
      endpoint: "https://formspree.io/f/xjgqewyk",
    });
  });
});
