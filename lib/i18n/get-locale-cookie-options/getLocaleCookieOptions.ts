export type LocaleCookieOptions = Readonly<{
  path: "/";
  maxAge: number;
  sameSite: "lax";
  secure: boolean;
}>;

export function getLocaleCookieOptions(secure: boolean): LocaleCookieOptions {
  return {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure,
  };
}

export function isSecureRequestProtocol(protocol: string): boolean {
  return protocol.replace(":", "") === "https";
}
