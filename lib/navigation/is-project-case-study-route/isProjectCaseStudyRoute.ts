/** Route étude de cas : `/projects/{slug}` (pas la liste `/projects`). */
export function isProjectCaseStudyRoute(pathname: string): boolean {
  return /^\/projects\/[^/]+$/.test(pathname);
}
