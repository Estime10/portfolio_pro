import { emitThemeChanged } from "@/lib/theme/actions";
import { clearInlineAnimatedVars } from "../clear-inline-animated-vars/clearInlineAnimatedVars";

export function createThemeTransitionCompleteHandler(
  root: HTMLElement,
  resolve: () => void,
): () => void {
  return (): void => {
    clearInlineAnimatedVars(root);
    emitThemeChanged();
    resolve();
  };
}
