import { useRef, useState,  useLayoutEffect } from 'react'
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

  const currentIndex = events.findIndex((e) => e.slug === slug)
  const event = events[currentIndex]

  const hasContentForLang = (() => {
    if (currentLang === 'uk') {
      return !!(event?.titleUk && (event?.contentUk || event?.contentFullUk))
    }
    return !!(event?.titleEn && (event?.contentEn || event?.contentFull))
  })()

  if (!event || !hasContentForLang) {
    return (
      <div className="container event-detail__not-found">
        <p>{!event ? 'Event not found.' : `This event is not available in ${currentLang === 'uk' ? 'Ukrainian' : 'English'}.`}</p>
        <Link to="/our-events">← {t('nav.events')}</Link>
      </div>
    )
  }

  const prevEvent = currentIndex > 0 ? events[currentIndex - 1] : null
  const nextEvent = currentIndex < events.length - 1 ? events[currentIndex + 1] : null
  const moreEvents = events.filter((e) => e.slug !== slug).slice(0, 8)

  const title = currentLang === 'uk' ? event.titleUk : event.titleEn
  const contentFullRaw = currentLang === 'uk' ? event.contentFullUk : event.contentFull
  const contentText = currentLang === 'uk' ? event.contentUk : event.contentEn

  const sanitizedContent = contentFullRaw ? contentFullRaw.replace(/target\s*=\s*["']?_blank["']?/gi, '') : null

  useLayoutEffect(() => {
    const container = contentRef.current
    if (!container) return

    const galleryLinks = container.querySelectorAll<HTMLAnchorElement>('.event-gallery__item')
    galleryLinks.forEach(link => {
      link.removeAttribute('target')
      link.removeAttribute('rel')
    })

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('.event-gallery__item') as HTMLAnchorElement
      if (!link) return
      e.preventDefault()
      e.stopPropagation()
      const currentLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>('.event-gallery__item'))
      const images = currentLinks.map(l => l.href)
      const index = currentLinks.findIndex(l => l === link)
      if (index !== -1) setLightbox({ images, index })
    }

    container.addEventListener('click', handleClick)
    return () => container.removeEventListener('click', handleClick)
  }, [slug, currentLang, sanitizedContent])

  const publishedAt = currentLang === 'uk' && event.publishedAtUk ? event.publishedAtUk : event.publishedAt
  const d = new Date(publishedAt)
  const date = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`

  const hasGalleryInContent = !!(sanitizedContent?.includes('event-gallery'))

  return (
    <div className="event-detail">
      <div className="container">
        <div className="event-detail__body">
          <h1 className="event-detail__title">{title}</h1>

          <div className="event-detail__breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
              <span className="event-detail__breadcrumb-sep"> &rsaquo; </span>
            <Link to="/archive">{currentLang === 'uk' ? 'Українська' : 'English'}</Link>
              <span className="event-detail__breadcrumb-sep"> &rsaquo; </span>
              <span className="event-detail__breadcrumb-current">{title}</span>
          </div>

          <div className="event-detail__social-top">
            <SocialShareIcons title={title} />
          </div>
          <div className="event-detail__date-wrapper">
            <svg className="event-detail__date-icon" viewBox="0 0 448 512">
              <path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z" />
            </svg>
            <time className="event-detail__date" dateTime={publishedAt}>{date}</time>
          </div>

          {sanitizedContent ? (
            <div ref={contentRef} className="event-detail__content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          ) : contentText ? (
            <div className="event-detail__content">
              {contentText.split('\n\n').map((paragraph, i) => (
                <p key={i} className="event-detail__paragraph">{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {!hasGalleryInContent && (
        <div className="event-detail__gallery-section">
          <div className="container">
            <h2 className="event-gallery-heading">{t('articles.imageGallery')}</h2>
          </div>
        </div>
      )}

      <div className="event-detail__pagination">
        <div className="container">
          <div className="event-detail__pagination-inner">
            <div className="event-detail__pagination-side event-detail__pagination-side--prev">
              {prevEvent && (
                <Link to={`/our-events/${prevEvent.slug}`} className="event-detail__pagination-link">
                  <span className="event-detail__pagination-arrow">‹</span>
                  <div className="event-detail__pagination-info">
                    <span className="event-detail__pagination-label">{t('articles.prev')}</span>
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
                <Link to={`/our-events/${nextEvent.slug}`} className="event-detail__pagination-link event-detail__pagination-link--next">
                  <div className="event-detail__pagination-info event-detail__pagination-info--next">
                    <span className="event-detail__pagination-label">{t('articles.next')}</span>
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
          <h2 className="event-detail__more-heading">{t('articles.moreEvents')}</h2>
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