export function readObjectStringProperty(value: object, key: string): string | null {
  if (!(key in value)) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- getOwnPropertyDescriptor.value
  const propertyValue = Object.getOwnPropertyDescriptor(value, key)?.value;

  return typeof propertyValue === "string" ? propertyValue : null;
}
