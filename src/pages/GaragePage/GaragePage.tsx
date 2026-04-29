import { Link, useOutletContext } from 'react-router-dom'
import { garageItems } from '../../data/garageItems'
import './GaragePage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

export function GaragePage() {
  const { currentLang } = useOutletContext<OutletContext>()

  const visibleItems = currentLang === 'uk'
    ? [
        ...garageItems.filter(item => item.titleUk && !item.titleEn),
        ...garageItems.filter(item => item.titleUk && item.titleEn && item.slug !== 'camp-pearl'),
        ...garageItems.filter(item => item.slug === 'camp-pearl' && item.titleUk),
      ]
    : garageItems.filter(item => !!item.titleEn)

  return (
    <div className="garage-page">
      <div className="container">
        <h1 className="garage-page__heading">
          {currentLang === 'uk' ? '«Гараж»' : '"Garage"'}
        </h1>
        <div className="garage-page__grid">
          {visibleItems.map((item) => {
            const title = currentLang === 'uk' && item.titleUk ? item.titleUk : item.titleEn
            const thumbnail = currentLang === 'uk' && item.thumbnailUrlUk ? item.thumbnailUrlUk : item.thumbnailUrl
            const locale = currentLang === 'uk' ? 'uk-UA' : 'en-US'
            const publishedAt = currentLang === 'uk' && item.publishedAtUk ? item.publishedAtUk : item.publishedAt
            const date = new Date(publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
            return (
              <article key={item.id} className="garage-card">
                <Link to={`/garage/${item.slug}`} className="garage-card__link">
                  {thumbnail && (
                    <div className="garage-card__image-wrapper">
                      <img
                        src={thumbnail}
                        alt={title}
                        className="garage-card__image"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="garage-card__body">
                    <time className="garage-card__date" dateTime={publishedAt}>{date}</time>
                    <h3 className="garage-card__title">{title}</h3>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
