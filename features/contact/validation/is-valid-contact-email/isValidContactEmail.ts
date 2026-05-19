const CONTACT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidContactEmail(value: string): boolean {
  return CONTACT_EMAIL_PATTERN.test(value);
}
