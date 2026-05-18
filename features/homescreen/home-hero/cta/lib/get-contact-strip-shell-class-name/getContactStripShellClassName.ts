export function getContactStripShellClassName(marginActive: boolean): string {
  const margin = marginActive ? "mt-12 sm:mt-10 md:mt-6" : "mt-0";
  return `w-full overflow-hidden ${margin}`;
}
