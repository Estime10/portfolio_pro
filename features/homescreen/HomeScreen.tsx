import { getTranslations } from 'next-intl/server'

export async function HomeScreen() {
  const t = await getTranslations('HomeScreen')

  return (
    <div className="ui-container ui-section">
      <h1 className="text-h1 text-foreground">{t('title')}</h1>
      <p className="text-body text-muted mt-4 max-w-prose">{t('subtitle')}</p>
    </div>
  )
}
