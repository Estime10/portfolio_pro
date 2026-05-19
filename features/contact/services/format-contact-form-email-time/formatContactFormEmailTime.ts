export function formatContactFormEmailTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("fr-BE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
