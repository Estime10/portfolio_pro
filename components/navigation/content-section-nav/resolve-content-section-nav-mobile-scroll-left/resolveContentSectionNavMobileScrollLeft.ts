export type ResolveContentSectionNavMobileScrollLeftInput = Readonly<{
  activeItemOffsetLeft: number;
  activeItemOffsetRight: number;
  isAtDocumentBottom: boolean;
  listClientWidth: number;
  maxScrollLeft: number;
  scrollPaddingLeft: number;
  scrollPaddingRight: number;
}>;

export function resolveContentSectionNavMobileScrollLeft(
  input: ResolveContentSectionNavMobileScrollLeftInput,
): number {
  const { maxScrollLeft } = input;

  if (maxScrollLeft <= 0) {
    return 0;
  }

  const idealLeft = Math.max(0, input.activeItemOffsetLeft - input.scrollPaddingLeft);

  if (input.isAtDocumentBottom || idealLeft >= maxScrollLeft) {
    return maxScrollLeft;
  }

  const visibleRightIfIdeal = idealLeft + input.listClientWidth;

  if (input.activeItemOffsetRight + input.scrollPaddingRight > visibleRightIfIdeal) {
    const endAlignedLeft =
      input.activeItemOffsetRight + input.scrollPaddingRight - input.listClientWidth;

    return Math.min(maxScrollLeft, Math.max(0, endAlignedLeft));
  }

  return idealLeft;
}
