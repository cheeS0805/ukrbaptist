import { useOutletContext, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { churches } from '../../data/churches'
import './ChurchDetailPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

const labels = {
  en: { pastor: 'Pastor', phone: 'Phone', address: 'Address', website: 'Website', email: 'Email', direction: 'Direction', notFound: 'Church not found.' },
  uk: { pastor: 'Пастор', phone: 'Телефон', address: 'Адреса', website: 'Сайт', email: 'Пошта', direction: 'Маршрут', notFound: 'Церкву не знайдено.' },
}

export function ChurchDetailPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation('common')
  const l = labels[currentLang]

  const church = churches.find((c) => c.slug === slug)

  if (!church) {
    return (
      <div className="container church-detail__not-found">
        <p>{l.notFound}</p>
        <Link to="/churches">{t('nav.churches')}</Link>
      </div>
    )
  }

  const name = currentLang === 'uk' && church.nameUk ? church.nameUk : church.nameEn

  return (
    <div className="church-detail">
      <div className="church-detail__panel">
        <div className="church-detail__photo-col">
          {church.photoUrl ? (
            <img src={church.photoUrl} alt={name} className="church-detail__photo" />
          ) : (
            <div className="church-detail__photo-placeholder" />
          )}
        </div>

        <div className="church-detail__info">
          <h1 className="church-detail__name">{name}</h1>

          <table className="church-detail__table">
            <tbody>
              {church.contacts?.map((contact, i) => (
                <>
                  <tr key={`pastor-${i}`}>
                    <td className="church-detail__label">{l.pastor}:</td>
                    <td className="church-detail__value">{contact.name}</td>
                  </tr>
                  {contact.phone && (
                    <tr key={`phone-${i}`}>
                      <td className="church-detail__label">{l.phone}:</td>
                      <td className="church-detail__value">
                        <a href={`tel:${contact.phone}`} className="church-detail__link">{contact.phone}</a>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {church.address && (
                <tr>
                  <td className="church-detail__label">{l.address}:</td>
                  <td className="church-detail__value">{church.address}</td>
                </tr>
              )}
              {church.website && (
                <tr>
                  <td className="church-detail__label">{l.website}:</td>
                  <td className="church-detail__value">
                    <a href={church.website} target="_blank" rel="noopener noreferrer" className="church-detail__link">
                      {church.website.replace(/^https?:\/\//, '')}
                    </a>
                  </td>
                </tr>
              )}
              {church.email && (
                <tr>
                  <td className="church-detail__label">{l.email}:</td>
                  <td className="church-detail__value">
                    <a href={`mailto:${church.email}`} className="church-detail__link">{church.email}</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {church.mapsUrl && (
            <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="church-detail__direction">
              {l.direction.toUpperCase()}
            </a>
          )}
        </div>
      </div>

      <div className="container">
        <Link to="/churches" className="church-detail__back">← {t('nav.churches')}</Link>
      </div>
    </div>
  )
}
