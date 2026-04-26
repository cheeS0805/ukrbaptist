import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import type { Church } from '../../specs'
import './ChurchCard.scss'

interface ChurchCardProps {
  church: Church
  currentLang: 'en' | 'uk'
}

export function ChurchCard({ church, currentLang }: ChurchCardProps) {
  const { t } = useTranslation('common')

  const name = currentLang === 'uk' && church.nameUk ? church.nameUk : church.nameEn

  return (
    <Link
      to={`/churches/${church.slug}`}
      className={clsx('church-card', { 'church-card--no-image': !church.photoUrl })}
    >
      <div className="church-card__image-wrapper">
        {church.photoUrl ? (
          <img
            src={church.photoUrl}
            alt={name}
            className="church-card__image"
            loading="lazy"
          />
        ) : (
          <div className="church-card__image-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="church-card__body">
        <h3 className="church-card__name">{name}</h3>
        <span className="church-card__read-more">{t('actions.readMore')} »</span>
      </div>
    </Link>
  )
}
