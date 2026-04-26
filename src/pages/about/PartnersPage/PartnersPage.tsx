import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PartnerCard } from '../../../components/PartnerCard/PartnerCard'
import { SocialShareIcons } from '../../../components/SocialShareIcons/SocialShareIcons'
import { partners } from '../../../data/partners'
import './PartnersPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

export function PartnersPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('about')

  return (
    <div className="partners-page">
      <div className="container">
        <h1 className="partners-page__heading">{t('partners.heading')}</h1>
        <div className="partners-page__social-icons">
          <SocialShareIcons />
        </div>
        <div className="partners-page__list">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} currentLang={currentLang} />
          ))}
        </div>
      </div>
    </div>
  )
}