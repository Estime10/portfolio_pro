const FORMSPREE_FORM_ENDPOINT_BASE = "https://formspree.io/f" as const;

export type FormspreeServerConfig = Readonly<{
  formId: string;
  endpoint: string;
}>;

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

export function getFormspreeServerConfig(): FormspreeServerConfig | null {
  const formId = readEnv("FORMSPREE_FORM_ID");

  if (!formId) {
    return null;
  }

  return {
    formId,
    endpoint: `${FORMSPREE_FORM_ENDPOINT_BASE}/${formId}`,
  };
}
