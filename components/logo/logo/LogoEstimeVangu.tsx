import { CHROME_LOGO_GRADIENT_TEXT } from "@/lib/ui/brandChrome";

export type LogoEstimeVanguSize = "sm" | "md" | "lg";

const sizeClassName: Record<LogoEstimeVanguSize, string> = {
  sm: "text-xl sm:text-2xl",
  md: "text-3xl sm:text-4xl md:text-[2.75rem]",
  lg: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
};

export type LogoEstimeVanguProps = {
  readonly size?: LogoEstimeVanguSize;
  readonly className?: string;
};

function mergeClassName(base: string, extra: string | undefined): string {
  return extra === undefined || extra === "" ? base : `${base} ${extra}`;
}

export function LogoEstimeVangu({ size = "md", className }: LogoEstimeVanguProps) {
  return (
    <div
      role="img"
      aria-label="Estime Vangu"
      className={mergeClassName("inline-block text-center", className)}
    >
      <p className={`${sizeClassName[size]} font-semibold leading-[1.05] tracking-[-0.035em]`}>
        <span className={`${CHROME_LOGO_GRADIENT_TEXT} md:hidden`}>EV</span>
        <span className={`${CHROME_LOGO_GRADIENT_TEXT} hidden md:inline`}>Estime Vangu</span>
      </p>
    </div>
  );
}
