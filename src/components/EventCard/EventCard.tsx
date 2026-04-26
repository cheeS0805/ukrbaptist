import { Link } from 'react-router-dom'
import type { Event } from '../../specs'
import './EventCard.scss'

interface EventCardProps {
  event: Event
  currentLang: 'en' | 'uk'
}

export function EventCard({ event, currentLang }: EventCardProps) {
  const title = currentLang === 'uk' && event.titleUk ? event.titleUk : event.titleEn
  const thumbnail = currentLang === 'uk' && event.thumbnailUrlUk ? event.thumbnailUrlUk : event.thumbnailUrl
  const locale = currentLang === 'uk' ? 'uk-UA' : 'en-US'
  const date = new Date(event.publishedAt).toLocaleDateString(
    locale,
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <article className="event-card">
      {thumbnail && (
        <Link to={`/our-events/${event.slug}`} className="event-card__image-wrapper">
          <img
            src={thumbnail}
            alt={title}
            className="event-card__image"
            loading="lazy"
          />
        </Link>
      )}
      <div className="event-card__body">
        <time className="event-card__date" dateTime={event.publishedAt}>{date}</time>
        <h3 className="event-card__title">
          <Link to={`/our-events/${event.slug}`} className="event-card__title-link">
            {title}
          </Link>
        </h3>
      </div>
    </article>
  )
}
