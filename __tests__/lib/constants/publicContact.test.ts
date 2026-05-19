import { describe, expect, it } from "vitest";
import {
  getPublicContactEmailHref,
  PUBLIC_CONTACT_CHANNELS,
} from "@/lib/constants/publicContact";

describe("publicContact", () => {
  it("exposes production contact channels", () => {
    const byId = Object.fromEntries(PUBLIC_CONTACT_CHANNELS.map((channel) => [channel.id, channel]));

    expect(byId.linkedin?.href).toBe("https://www.linkedin.com/in/estime-vangu/");
    expect(byId.email?.href).toBe("mailto:estimevangu.pro@gmail.com");
    expect(byId.phone?.href).toBe("tel:+32484030668");
  });

  it("returns the email mailto href", () => {
    expect(getPublicContactEmailHref()).toBe("mailto:estimevangu.pro@gmail.com");
  });
});
