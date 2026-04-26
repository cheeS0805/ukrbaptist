import type { Partner } from '../../specs'
import './PartnerCard.scss'

interface PartnerCardProps {
  partner: Partner
  currentLang: 'en' | 'uk'
}

export function PartnerCard({ partner, currentLang }: PartnerCardProps) {
  const name = currentLang === 'uk' && partner.nameUk ? partner.nameUk : partner.nameEn
  const description = currentLang === 'uk' ? partner.descriptionUk : partner.descriptionEn

  return (
    <div className="partner-card">
      {partner.logoUrl && (
        <img src={partner.logoUrl} alt={name} className="partner-card__logo" loading="lazy" />
      )}
      <div className="partner-card__info">
        <h3 className="partner-card__name">{name}</h3>
        {description && <p className="partner-card__description">{description}</p>}
        <a
          href={partner.websiteUrl}
          className="partner-card__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {partner.websiteUrl.replace(/^https?:\/\//, '')} →
        </a>
      </div>
    </div>
  )
}
