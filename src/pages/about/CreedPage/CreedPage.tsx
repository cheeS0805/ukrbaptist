import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './CreedPage.scss'
import { SocialShareIcons } from '../../../components/SocialShareIcons/SocialShareIcons'
import { creedEn, creedUk } from '../../../data/creedContent'

interface OutletContext { currentLang: 'en' | 'uk' }

export function CreedPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('about')
  const content = currentLang === 'uk' ? (creedUk || creedEn) : creedEn

  return (
    <div className="creed-page">
      <div className="container">
        <div className="creed-page__header-wrap">

          <h1 className="creed-page__title">
            {currentLang === 'uk' ? t('creed.heading') : 'The Baptist Faith and Message'}
          </h1>

          <div className="creed-page__social-wrapper">
            <SocialShareIcons />
          </div>

          {currentLang === 'en' && (
            <h2 className="creed-page__subtitle">THE 2000 BAPTIST FAITH &amp; MESSAGE</h2>
          )}

          <div
            className="creed-page__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />

        </div>
      </div>
    </div>
  )
}