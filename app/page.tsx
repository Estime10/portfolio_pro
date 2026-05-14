import type { ReactElement } from 'react'
import { LogoEstimeVangu } from '@/components/logo/LogoEstimeVangu'

export default function Home(): ReactElement {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <LogoEstimeVangu size="lg" />
    </div>
  )
}
