const FORMSPREE_FORM_ENDPOINT_BASE = "https://formspree.io/f" as const;

export type FormspreeClientConfig = Readonly<{
  endpoint: string;
}>;

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

export function getFormspreeClientConfig(): FormspreeClientConfig | null {
  const formId = readEnv("NEXT_PUBLIC_FORMSPREE_FORM_ID");

  if (!formId) {
    return null;
  }

  return {
    endpoint: `${FORMSPREE_FORM_ENDPOINT_BASE}/${formId}`,
  };
}
