import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'
import './MainLayout.scss'

export function MainLayout() {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState<'en' | 'uk'>(
    (i18n.language?.slice(0, 2) as 'en' | 'uk') === 'uk' ? 'uk' : 'en'
  )

  function handleLangSwitch(newLang: 'en' | 'uk') {
    setLang(newLang)
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="layout">
      <Header currentLang={lang} onLangSwitch={handleLangSwitch} />
      <main className="layout__content">
        <Outlet context={{ currentLang: lang }} />
      </main>
      <Footer />
    </div>
  )
}
