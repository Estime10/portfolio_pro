export function getFormFieldDescribedBy(
  fieldId: string,
  hasHint: boolean,
  hasError: boolean,
): string | undefined {
  const ids = [hasHint ? `${fieldId}-hint` : null, hasError ? `${fieldId}-error` : null].filter(
    (id): id is string => id !== null,
  );

  return ids.length > 0 ? ids.join(" ") : undefined;
}
