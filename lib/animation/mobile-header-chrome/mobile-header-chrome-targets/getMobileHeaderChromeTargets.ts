export function getMobileHeaderChromeTargets(
  logoChrome: HTMLElement | null,
  toolbarChrome: HTMLElement | null,
): HTMLElement[] {
  return [logoChrome, toolbarChrome].filter(
    (element): element is HTMLElement => element !== null,
  );
}
