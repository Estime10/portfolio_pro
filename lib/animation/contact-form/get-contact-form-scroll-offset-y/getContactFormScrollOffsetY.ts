const FALLBACK_NAV_HEIGHT_PX = 56;
const FALLBACK_SPACE_6_PX = 24;

export function getContactFormScrollOffsetY(): number {
  if (typeof window === "undefined") {
    return FALLBACK_NAV_HEIGHT_PX + FALLBACK_SPACE_6_PX;
  }

  const styles = getComputedStyle(document.documentElement);
  const navHeight = Number.parseFloat(styles.getPropertyValue("--nav-height"));
  const space6 = Number.parseFloat(styles.getPropertyValue("--space-6"));

  const resolvedNavHeight = Number.isFinite(navHeight) ? navHeight : FALLBACK_NAV_HEIGHT_PX;
  const resolvedSpace6 = Number.isFinite(space6) ? space6 : FALLBACK_SPACE_6_PX;

  return resolvedNavHeight + resolvedSpace6;
}
