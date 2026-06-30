export type ContactStripLayout = "hero" | "embedded";

function getContactStripMarginClass(marginActive: boolean, layout: ContactStripLayout): string {
  if (!marginActive) {
    return "mt-0";
  }

  if (layout === "embedded") {
    return "mt-4 sm:mt-3";
  }

  return "mt-12 sm:mt-10 md:mt-6";
}

export function getContactStripShellClassName(
  marginActive: boolean,
  isOpen: boolean,
  layout: ContactStripLayout = "hero",
): string {
  const margin = getContactStripMarginClass(marginActive, layout);
  const collapsed = !isOpen && !marginActive ? "h-0 overflow-hidden" : "overflow-hidden";
  return `w-full ${margin} ${collapsed}`;
}
