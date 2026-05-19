import { Button } from "@/components/button/Button";
import { composeCtaOutlineLinkClassName } from "@/components/button/cta/compose-cta-outline-link-class-name/composeCtaOutlineLinkClassName";
import type { ButtonProps } from "@/components/button/types/types";

export type CtaOutlineButtonProps = Omit<ButtonProps, "variant" | "className"> &
  Readonly<{
    className?: string;
  }>;

export function CtaOutlineButton({
  className,
  size = "md",
  type = "button",
  ...rest
}: CtaOutlineButtonProps) {
  return (
    <Button
      className={composeCtaOutlineLinkClassName(className)}
      size={size}
      type={type}
      variant="outline"
      {...rest}
    />
  );
}
