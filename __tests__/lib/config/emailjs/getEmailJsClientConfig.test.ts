import { afterEach, describe, expect, it, vi } from "vitest";
import { getEmailJsClientConfig } from "@/lib/config/emailjs/getEmailJsClientConfig";

describe("getEmailJsClientConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null when a variable is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "public_key_test");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "service_test");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", "");

    expect(getEmailJsClientConfig()).toBeNull();
  });

  it("returns null when a variable is blank", () => {
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "   ");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "service_test");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", "template_test");

    expect(getEmailJsClientConfig()).toBeNull();
  });

  it("returns config when all variables are set", () => {
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", "  public_key_test  ");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID", "service_test");
    vi.stubEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", "template_test");

    expect(getEmailJsClientConfig()).toEqual({
      publicKey: "public_key_test",
      serviceId: "service_test",
      templateId: "template_test",
    });
  });
});
