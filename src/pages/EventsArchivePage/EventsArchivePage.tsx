import { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { events } from '../../data/events'
import { Pagination } from '../../components/Pagination/Pagination'
import './EventsArchivePage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }
const PAGE_SIZE = 20

const getFilteredEvents = (lang: 'en' | 'uk') => {
  return events.filter(event => {
    if (lang === 'uk') {
      return !!(event.titleUk && (event.contentUk || event.contentFullUk))
    }
    return !!(event.titleEn && (event.contentEn || event.contentFull))
  })
}

export function EventsArchivePage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('common')
  const [page, setPage] = useState(1)

  const filteredEvents = getFilteredEvents(currentLang)
  const totalPages = Math.ceil(filteredEvents.length / PAGE_SIZE)
  const visibleEvents = filteredEvents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="events-archive-page">
      <div className="container">
        <h1 className="events-archive-page__heading">
          {currentLang === 'uk' ? 'Архів подій' : 'Events Archive'}
        </h1>
        <div className="events-archive-page__list">
          {visibleEvents.map(event => {
            const title = currentLang === 'uk' ? event.titleUk : event.titleEn
            const publishedAt = currentLang === 'uk' && event.publishedAtUk ? event.publishedAtUk : event.publishedAt
            const date = new Date(publishedAt).toLocaleDateString(
              currentLang === 'uk' ? 'uk-UA' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )
            return (
              <article key={event.id} className="events-archive-page__item">
                <div className="events-archive-page__item-meta">
                  <time dateTime={publishedAt}>{date}</time>
                </div>
                <h2 className="events-archive-page__item-title">
                  <Link to={`/our-events/${event.slug}`}>{title}</Link>
                </h2>
              </article>
            )
          })}
        </div>
        {totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  )
}