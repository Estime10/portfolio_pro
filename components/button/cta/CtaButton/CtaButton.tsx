import { Button } from "@/components/button/Button";
import { composeCtaGradientClassName } from "@/components/button/cta/compose-cta-gradient-class-name/composeCtaGradientClassName";
import type { ButtonProps } from "@/components/button/types/types";

export type CtaButtonProps = Omit<ButtonProps, "variant" | "className"> &
  Readonly<{
    className?: string;
  }>;

export function CtaButton({ className, size = "md", type = "button", ...rest }: CtaButtonProps) {
  return (
    <Button
      className={composeCtaGradientClassName(className)}
      size={size}
      type={type}
      variant="ghost"
      {...rest}
    />
  );
}
