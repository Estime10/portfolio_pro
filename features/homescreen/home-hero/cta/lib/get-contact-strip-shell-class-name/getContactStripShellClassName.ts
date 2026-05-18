export function getContactStripShellClassName(
  marginActive: boolean,
  isOpen: boolean,
): string {
  const margin = marginActive ? "mt-12 sm:mt-10 md:mt-6" : "mt-0";
  const collapsed =
    !isOpen && !marginActive ? "h-0 overflow-hidden" : "overflow-hidden";
  return `w-full ${margin} ${collapsed}`;
}
