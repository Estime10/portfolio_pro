export const DOCUMENT_BOTTOM_THRESHOLD_PX = 48;

export function isAtDocumentBottom(): boolean {
  const scrollPosition = window.scrollY + window.innerHeight;

  return scrollPosition >= document.documentElement.scrollHeight - DOCUMENT_BOTTOM_THRESHOLD_PX;
}
