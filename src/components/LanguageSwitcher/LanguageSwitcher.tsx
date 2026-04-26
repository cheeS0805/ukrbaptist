import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import './LanguageSwitcher.scss'

interface LanguageSwitcherProps {
  currentLang: 'en' | 'uk'
  onSwitch: (lang: 'en' | 'uk') => void
}

export function LanguageSwitcher({ currentLang, onSwitch }: LanguageSwitcherProps) {
  const { t } = useTranslation('common')

  return (
    <div className="lang-switcher">
      <button
        className={clsx('lang-switcher__option', { 'lang-switcher__option--active': currentLang === 'uk' })}
        onClick={() => onSwitch('uk')}
        aria-label="Switch to Ukrainian"
      >
        {t('langSwitcher.uk')}
      </button>
      <span className="lang-switcher__divider">/</span>
      <button
        className={clsx('lang-switcher__option', { 'lang-switcher__option--active': currentLang === 'en' })}
        onClick={() => onSwitch('en')}
        aria-label="Switch to English"
      >
        {t('langSwitcher.en')}
      </button>
    </div>
  )
}
