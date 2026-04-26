import { useRef, useState, useEffect } from 'react'
import { useOutletContext, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { events } from '../../data/events'
import { SocialShareIcons } from '../../components/SocialShareIcons/SocialShareIcons'
import { EventCard } from '../../components/EventCard/EventCard'
import { Lightbox } from '../../components/Lightbox/Lightbox'
import './EventDetailPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

export function EventDetailPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation('common')

  const contentRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const links = el.querySelectorAll<HTMLAnchorElement>('.event-gallery__item')
    if (links.length === 0) return

    const images = Array.from(links).map(link => link.href)
    const cleanups: (() => void)[] = []

    links.forEach((link, i) => {
      const handler = (e: MouseEvent) => {
        e.preventDefault()
        setLightbox({ images, index: i })
      }
      link.addEventListener('click', handler)
      cleanups.push(() => link.removeEventListener('click', handler))
    })

    return () => cleanups.forEach(fn => fn())
  }, [slug])

  const currentIndex = events.findIndex((e) => e.slug === slug)
  const event = events[currentIndex]

  if (!event) {
    return (
      <div className="container event-detail__not-found">
        <p>Event not found.</p>
        <Link to="/our-events">← {t('nav.events')}</Link>
      </div>
    )
  }

  const prevEvent = currentIndex > 0 ? events[currentIndex - 1] : null
  const nextEvent = currentIndex < events.length - 1 ? events[currentIndex + 1] : null
  const moreEvents = events.filter((e) => e.slug !== slug).slice(0, 8)

  const hasGallery = !!(
    event.contentFull?.includes('event-gallery') ||
    event.contentFullUk?.includes('event-gallery')
  )

  const title = currentLang === 'uk' ? event.titleUk : event.titleEn

  const eventContent = (() => {
    if (currentLang === 'uk') {
      if (event.contentFullUk) return { type: 'html' as const, value: event.contentFullUk }
      if (event.contentUk) return { type: 'text' as const, value: event.contentUk }
    }
    if (event.contentFull) return { type: 'html' as const, value: event.contentFull }
    if (event.contentEn) return { type: 'text' as const, value: event.contentEn }
    return null
  })()

  const d = new Date(event.publishedAt)
  const date = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`

  return (
    <div className="event-detail">

      <div className="container">
        <div className="event-detail__body">

          <h1 className="event-detail__title">{title}</h1>

          <div className="event-detail__breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span className="event-detail__breadcrumb-sep"> &rsaquo; </span>
            <span>{currentLang === 'uk' ? 'Українська' : 'English'}</span>
            <span className="event-detail__breadcrumb-sep"> &rsaquo; </span>
            <span className="event-detail__breadcrumb-current">{title}</span>
          </div>

          <div className="event-detail__social-top">
            <SocialShareIcons title={title} />
          </div>

          <div className="event-detail__date-wrapper">
            <svg className="event-detail__date-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z" />
            </svg>
            <time className="event-detail__date" dateTime={event.publishedAt}>{date}</time>
          </div>

          {eventContent?.type === 'html' ? (
            <div
              ref={contentRef}
              className="event-detail__content"
              dangerouslySetInnerHTML={{ __html: eventContent.value }}
            />
          ) : eventContent?.type === 'text' ? (
            <div className="event-detail__content">
              {eventContent.value.split('\n\n').map((paragraph, i) => (
                <p key={i} className="event-detail__paragraph">{paragraph}</p>
              ))}
            </div>
          ) : null}

        </div>
      </div>

      {!hasGallery && (
        <div className="event-detail__gallery-section">
          <div className="container">
            <h2 className="event-gallery-heading">Image Gallery</h2>
          </div>
        </div>
      )}

      <div className="event-detail__pagination">
        <div className="container">
          <div className="event-detail__pagination-inner">

            <div className="event-detail__pagination-side event-detail__pagination-side--prev">
              {prevEvent && (
                <Link
                  to={`/our-events/${prevEvent.slug}`}
                  className="event-detail__pagination-link"
                >
                  <span className="event-detail__pagination-arrow">‹</span>
                  <div className="event-detail__pagination-info">
                    <span className="event-detail__pagination-label">PREV</span>
                    <span className="event-detail__pagination-title">
                      {currentLang === 'uk' ? prevEvent.titleUk : prevEvent.titleEn}
                    </span>
                  </div>
                </Link>
              )}
            </div>

            <div className="event-detail__pagination-divider" />

            <div className="event-detail__pagination-side event-detail__pagination-side--next">
              {nextEvent && (
                <Link
                  to={`/our-events/${nextEvent.slug}`}
                  className="event-detail__pagination-link event-detail__pagination-link--next"
                >
                  <div className="event-detail__pagination-info event-detail__pagination-info--next">
                    <span className="event-detail__pagination-label">NEXT</span>
                    <span className="event-detail__pagination-title">
                      {currentLang === 'uk' ? nextEvent.titleUk : nextEvent.titleEn}
                    </span>
                  </div>
                  <span className="event-detail__pagination-arrow">›</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="event-detail__more">
        <div className="container">
          <h2 className="event-detail__more-heading">More Events</h2>
          <div className="event-detail__more-grid">
            {moreEvents.map((e) => (
              <EventCard key={e.id} event={e} currentLang={currentLang} />
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox(prev => prev ? { ...prev, index } : null)}
        />
      )}

    </div>
  )
}
