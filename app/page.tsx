import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SplashScreen } from '@/features/splashscreen/SplashScreen'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('SplashScreen.meta')
  return {
    title: {
      absolute: t('title'),
    },
    description: t('description'),
  }
}

export default function Home() {
  return <SplashScreen />
}
