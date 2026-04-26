import { useState } from 'react'
import { useParams, Link, useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { garageItems } from '../../data/garageItems'
import { events } from '../../data/events'
import { SocialShareIcons } from '../../components/SocialShareIcons/SocialShareIcons'
import { EventCard } from '../../components/EventCard/EventCard'
import { Lightbox } from '../../components/Lightbox/Lightbox'
import './GarageDetailPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

const labels = {
  en: { notFound: 'Page not found.', gallery: 'Image Gallery', langLabel: 'English', more: 'More Events', prev: 'PREV', next: 'NEXT' },
  uk: { notFound: 'Сторінку не знайдено.', gallery: 'Галерея зображень', langLabel: 'Українська', more: 'More Events', prev: 'PREV', next: 'NEXT' },
}

export function GarageDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('common')
  const l = labels[currentLang]

  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

  const currentIndex = garageItems.findIndex((g) => g.slug === slug)
  const item = garageItems[currentIndex]

  if (!item) {
    return (
      <div className="container garage-detail__not-found">
        <p>{l.notFound}</p>
        <Link to="/garage">{t('nav.garage')}</Link>
      </div>
    )
  }

  const prevItem = currentIndex > 0 ? garageItems[currentIndex - 1] : null
  const nextItem = currentIndex < garageItems.length - 1 ? garageItems[currentIndex + 1] : null
  const moreEvents = events.slice(0, 8)

  const thumbnail = currentLang === 'uk' && item.thumbnailUrlUk ? item.thumbnailUrlUk : item.thumbnailUrl
  const gallery = currentLang === 'uk' && item.imagesUk ? item.imagesUk : (item.images ?? [])
  const videos = currentLang === 'uk' && item.youtubeIdsUk ? item.youtubeIdsUk : (item.youtubeIds ?? [])
  const hasGallery = gallery.length > 0

  const title = currentLang === 'uk' && item.titleUk ? item.titleUk : item.titleEn

  const locale = currentLang === 'uk' ? 'uk-UA' : 'en-US'
  const date = new Date(item.publishedAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const prevTitle = prevItem
    ? (currentLang === 'uk' && prevItem.titleUk ? prevItem.titleUk : prevItem.titleEn)
    : null
  const nextTitle = nextItem
    ? (currentLang === 'uk' && nextItem.titleUk ? nextItem.titleUk : nextItem.titleEn)
    : null

  return (
    <div className="garage-detail">

      <div className="container">
        <div className="garage-detail__body">
          <h1 className="garage-detail__title">{title}</h1>

          <div className="garage-detail__breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span className="garage-detail__breadcrumb-sep"> &rsaquo; </span>
            <span>{l.langLabel}</span>
            <span className="garage-detail__breadcrumb-sep"> &rsaquo; </span>
            <span className="garage-detail__breadcrumb-current">{title}</span>
          </div>

          <div className="garage-detail__social-top">
            <SocialShareIcons title={title} />
          </div>

          {(() => {
            const hasHero = !!item.thumbnailUrl
            const isResolution = item.category === 'resolution'
            const isSmallHero = item.slug === 'rev-olexa-harbuziuk-legacy'
            const alignDateWithHero = hasHero && !isResolution
            return (
              <div className={`garage-detail__date-wrapper
                ${isResolution ? 'garage-detail__date-wrapper--default' : ''}
                ${alignDateWithHero ? 'garage-detail__date-wrapper--aligned-with-hero' : ''}
                ${isSmallHero ? 'garage-detail__date-wrapper--small-hero' : ''}`}>
                <svg className="garage-detail__date-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z" />
                </svg>
                <time className="garage-detail__date" dateTime={item.publishedAt}>{date}</time>
              </div>
            )
          })()}

          {thumbnail && (
            <div className={`garage-detail__hero ${item.slug === 'rev-olexa-harbuziuk-legacy' ? 'garage-detail__hero--small' : ''}`}>
              <img
                src={thumbnail}
                alt={title}
                className="garage-detail__hero-image"
              />
            </div>
          )}

          {(currentLang === 'uk' && item.contentFullUk ? item.contentFullUk : item.contentFull) && (
            <div
              className="garage-detail__content"
              dangerouslySetInnerHTML={{ __html: (currentLang === 'uk' && item.contentFullUk ? item.contentFullUk : item.contentFull)! }}
            />
          )}

          {!item.contentFull && item.contentEn && (
            <div className="garage-detail__content">
              {item.contentEn.split('\n\n').map((paragraph, i) => (
                <p key={i} className="garage-detail__paragraph">{paragraph}</p>
              ))}
            </div>
          )}

          {item.pdfUrl && (
            <a
              href={item.pdfUrl}
              className="garage-detail__pdf-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.pdfLabel || 'Holy war against the Satanic West 1'}
            </a>
          )}

          {item.externalUrl && (
            <a
              href={item.externalUrl}
              className="garage-detail__external-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.externalUrl.replace(/^https?:\/\//, '')} →
            </a>
          )}

          {hasGallery && (
            <div className="garage-detail__gallery-section">
              <h2 className="garage-detail__gallery-heading">{l.gallery}</h2>
              <div className="garage-detail__gallery">
                {gallery.map((src, i) => (
                  <a
                    key={i}
                    href={src}
                    className="garage-detail__gallery-item"
                    onClick={(e) => { e.preventDefault(); setLightbox({ images: gallery, index: i }) }}
                  >
                    <img
                      src={src}
                      alt={`${title} ${i + 1}`}
                      className="garage-detail__gallery-image"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {videos.length > 0 && (
            <div className="garage-detail__videos">
              {videos.map((videoId) => (
                <div key={videoId} className="garage-detail__video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="garage-detail__video"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {!hasGallery && (
        <div className="garage-detail__gallery-empty">
          <div className="container">
            <h2 className="garage-detail__gallery-heading">{l.gallery}</h2>
          </div>
        </div>
      )}

      <div className="garage-detail__pagination">
        <div className="container">
          <div className="garage-detail__pagination-inner">

            <div className="garage-detail__pagination-side garage-detail__pagination-side--prev">
              {prevItem && (
                <Link
                  to={`/garage/${prevItem.slug}`}
                  className="garage-detail__pagination-link"
                >
                  <span className="garage-detail__pagination-arrow">‹</span>
                  <div className="garage-detail__pagination-info">
                    <span className="garage-detail__pagination-label">{l.prev}</span>
                    <span className="garage-detail__pagination-title">{prevTitle}</span>
                  </div>
                </Link>
              )}
            </div>

            <div className="garage-detail__pagination-divider" />

            <div className="garage-detail__pagination-side garage-detail__pagination-side--next">
              {nextItem && (
                <Link
                  to={`/garage/${nextItem.slug}`}
                  className="garage-detail__pagination-link garage-detail__pagination-link--next"
                >
                  <div className="garage-detail__pagination-info garage-detail__pagination-info--next">
                    <span className="garage-detail__pagination-label">{l.next}</span>
                    <span className="garage-detail__pagination-title">{nextTitle}</span>
                  </div>
                  <span className="garage-detail__pagination-arrow">›</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="garage-detail__more">
        <div className="container">
          <h2 className="garage-detail__more-heading">{l.more}</h2>
          <div className="garage-detail__more-grid">
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
