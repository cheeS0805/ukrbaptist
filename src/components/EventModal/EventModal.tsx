import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Event } from '../../specs'
import './EventModal.scss'

interface EventModalProps {
  event: Event
  currentLang: 'en' | 'uk'
  onClose: () => void
}

export function EventModal({ event, currentLang, onClose }: EventModalProps) {
  const title = currentLang === 'uk' ? event.titleUk : event.titleEn
  const content = currentLang === 'uk' && event.contentUk
    ? event.contentUk
    : event.contentEn ?? (currentLang === 'uk' ? event.excerptUk : event.excerptEn)

  const date = new Date(event.publishedAt).toLocaleDateString(
    currentLang === 'uk' ? 'uk-UA' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div className="event-modal__overlay" onClick={handleOverlayClick}>
      <div className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">

        <button className="event-modal__close" onClick={onClose} aria-label="Close">
          &#215;
        </button>

        {event.thumbnailUrl && (
          <div className="event-modal__hero">
            <img
              src={event.thumbnailUrl.replace('-300x', '-768x').replace(/-\d+x\d+\./, (m) => m.replace(/-\d+x\d+/, ''))}
              onError={(e) => { (e.target as HTMLImageElement).src = event.thumbnailUrl }}
              alt={title}
              className="event-modal__hero-image"
            />
          </div>
        )}

        <div className="event-modal__body">
          <time className="event-modal__date" dateTime={event.publishedAt}>{date}</time>
          <h2 className="event-modal__title" id="event-modal-title">{title}</h2>

          {content && (
            <div className="event-modal__content">
              {content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="event-modal__paragraph">{paragraph}</p>
              ))}
            </div>
          )}

          {event.sourceUrl && (
            <a
              href={event.sourceUrl}
              className="event-modal__source"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read original article →
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
