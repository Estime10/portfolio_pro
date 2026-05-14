import type { ReactElement } from 'react'
import { GHOST_BUTTON_CLASSES } from './ghost/ghostButtonClasses'
import { OUTLINE_BUTTON_CLASSES } from './outline/outlineButtonClasses'
import { PRIMARY_BUTTON_CLASSES } from './primary/primaryButtonClasses'
import { SECONDARY_BUTTON_CLASSES } from './secondary/secondaryButtonClasses'
import { getButtonSizeClasses } from './sizes/sizeClasses'
import type { ButtonProps, ButtonVariant } from './types/types'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: PRIMARY_BUTTON_CLASSES,
  secondary: SECONDARY_BUTTON_CLASSES,
  outline: OUTLINE_BUTTON_CLASSES,
  ghost: GHOST_BUTTON_CLASSES,
}

const BASE_BUTTON_CLASSES =
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-medium transition-colors focus-visible:ring-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45'

function mergeClassName(parts: readonly string[]): string {
  return parts.filter((part) => part.length > 0).join(' ')
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps): ReactElement {
  const variantClasses = VARIANT_CLASSES[variant]
  const sizeClasses = getButtonSizeClasses(size)
  const composed = mergeClassName([
    BASE_BUTTON_CLASSES,
    variantClasses,
    sizeClasses,
    className ?? '',
  ])

  return (
    <button type={type} className={composed} {...rest}>
      {children}
    </button>
  )
}
