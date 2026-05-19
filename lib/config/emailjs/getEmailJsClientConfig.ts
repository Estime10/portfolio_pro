export type EmailJsClientConfig = Readonly<{
  publicKey: string;
  serviceId: string;
  templateId: string;
}>;

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

export function getEmailJsClientConfig(): EmailJsClientConfig | null {
  const publicKey = readEnv("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
  const serviceId = readEnv("NEXT_PUBLIC_EMAILJS_SERVICE_ID");
  const templateId = readEnv("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");

  if (!publicKey || !serviceId || !templateId) {
    return null;
  }

  return { publicKey, serviceId, templateId };
}
