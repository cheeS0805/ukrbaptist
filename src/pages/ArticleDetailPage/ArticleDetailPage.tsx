import { useOutletContext, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { articles } from '../../data/articles'
import { events } from '../../data/events'
import { SocialShareIcons } from '../../components/SocialShareIcons/SocialShareIcons'
import { EventCard } from '../../components/EventCard/EventCard'
import './ArticleDetailPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

const notFoundLabels = {
  en: { text: 'Article not found.', back: '← Back to Home' },
  uk: { text: 'Статтю не знайдено.', back: '← На головну' },
}

export function ArticleDetailPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation('common')

  const currentIndex = articles.findIndex((a) => a.slug === slug)
  const article = articles[currentIndex]
  const nf = notFoundLabels[currentLang]

  if (!article) {
    return (
      <div className="container article-detail__not-found">
        <p>{nf.text}</p>
        <Link to="/">{nf.back}</Link>
      </div>
    )
  }

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
  const moreEvents = events.slice(0, 8)
  const hasGallery = !!(article.contentFull?.includes('event-gallery'))

  const title = currentLang === 'uk' && article.titleUk ? article.titleUk : article.titleEn
  const thumbnail = currentLang === 'uk' && article.thumbnailUrlUk ? article.thumbnailUrlUk : article.thumbnailUrl
  const contentFull = currentLang === 'uk' && article.contentFullUk ? article.contentFullUk : article.contentFull
  const content = currentLang === 'uk' && article.contentUk
    ? article.contentUk
    : article.contentEn ?? (currentLang === 'uk' ? article.excerptUk : article.excerptEn)

  const d = new Date(article.publishedAt)
  const date = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`

  return (
    <div className="article-detail">
      <div className="container">
        <div className="article-detail__body">

          <h1 className="article-detail__title">{title}</h1>

          <div className="article-detail__breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span className="article-detail__breadcrumb-sep"> &rsaquo; </span>
            <span>{currentLang === 'uk' ? 'Українська' : 'English'}</span>
            <span className="article-detail__breadcrumb-sep"> &rsaquo; </span>
            <span className="article-detail__breadcrumb-current">{title}</span>
          </div>

          <div className="article-detail__social-top">
            <SocialShareIcons title={title} />
          </div>

          <div className="article-detail__date-wrapper">
            <svg className="article-detail__date-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z" />
            </svg>
            <time className="article-detail__date" dateTime={article.publishedAt}>
              {date}
            </time>
          </div>

          {thumbnail && (
            <div className="article-detail__hero">
              <img
                src={thumbnail}
                alt={title}
                className="article-detail__hero-image"
              />
            </div>
          )}

          {article.authorName && (
            <div className="article-detail__author">
              <span className="article-detail__author-name">{article.authorName}</span>
              {article.authorRole && (
                <span className="article-detail__author-role"> — {article.authorRole}</span>
              )}
            </div>
          )}

          {contentFull ? (
            <div
              className="article-detail__content"
              dangerouslySetInnerHTML={{ __html: contentFull }}
            />
          ) : content ? (
            <div className="article-detail__content">
              {content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="article-detail__paragraph">{paragraph}</p>
              ))}
            </div>
          ) : null}

        </div>
      </div>

      {!hasGallery && (
        <div className="article-detail__gallery-section">
          <div className="article-detail__inner">
            <h2 className="article-detail__gallery-heading">Image Gallery</h2>
          </div>
        </div>
      )}

      <div className="article-detail__pagination">
        <div className="article-detail__inner">
          <div className="article-detail__pagination-inner">

            <div className="article-detail__pagination-side article-detail__pagination-side--prev">
              {prevArticle && (
                <Link
                  to={`/articles/${prevArticle.slug}`}
                  className="article-detail__pagination-link"
                >
                  <span className="article-detail__pagination-arrow">‹</span>
                  <div className="article-detail__pagination-info">
                    <span className="article-detail__pagination-label">PREV</span>
                    <span className="article-detail__pagination-title">
                      {currentLang === 'uk' ? prevArticle.titleUk : prevArticle.titleEn}
                    </span>
                  </div>
                </Link>
              )}
            </div>

            <div className="article-detail__pagination-divider" />

            <div className="article-detail__pagination-side article-detail__pagination-side--next">
              {nextArticle && (
                <Link
                  to={`/articles/${nextArticle.slug}`}
                  className="article-detail__pagination-link article-detail__pagination-link--next"
                >
                  <div className="article-detail__pagination-info article-detail__pagination-info--next">
                    <span className="article-detail__pagination-label">NEXT</span>
                    <span className="article-detail__pagination-title">
                      {currentLang === 'uk' ? nextArticle.titleUk : nextArticle.titleEn}
                    </span>
                  </div>
                  <span className="article-detail__pagination-arrow">›</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="article-detail__more">
        <div className="article-detail__inner">
          <h2 className="article-detail__more-heading">More Events</h2>
          <div className="article-detail__more-grid">
            {moreEvents.map((e) => (
              <EventCard key={e.id} event={e} currentLang={currentLang} />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
