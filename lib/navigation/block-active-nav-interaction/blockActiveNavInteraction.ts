import type { PointerEvent } from "react";

export function blockActiveNavInteraction(event: PointerEvent<HTMLElement>): void {
  event.preventDefault();
  event.stopPropagation();
}
