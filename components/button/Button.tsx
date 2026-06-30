import { composeButtonClassName } from "@/components/button/compose-button-class-name/composeButtonClassName";
import type { ButtonProps } from "@/components/button/types/types";

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={composeButtonClassName({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
