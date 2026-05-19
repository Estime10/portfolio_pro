export function asTranslationStringArray(value: object, key: string): readonly string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid translation array for "${key}"`);
  }

  const isStringArray = value.every((item): item is string => typeof item === "string");
  if (!isStringArray) {
    throw new Error(`Invalid translation array for "${key}"`);
  }

  return value;
}
