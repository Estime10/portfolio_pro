import emailjs from "@emailjs/browser";
import type { EmailJsClientConfig } from "@/lib/config/emailjs/getEmailJsClientConfig";

let initializedPublicKey: string | null = null;

export function initEmailJsClient(config: EmailJsClientConfig): void {
  if (initializedPublicKey === config.publicKey) {
    return;
  }

  emailjs.init({ publicKey: config.publicKey });
  initializedPublicKey = config.publicKey;
}
