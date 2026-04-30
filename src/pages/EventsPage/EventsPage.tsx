import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { EventCard } from '../../components/EventCard/EventCard'
import { Pagination } from '../../components/Pagination/Pagination'
import { events } from '../../data/events'
import './EventsPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }
const PAGE_SIZE = 20

const hasValidContent = (event: any, lang: 'en' | 'uk'): boolean => {
  if (lang === 'uk') {
    const hasTitle = !!event.titleUk && event.titleUk.trim() !== ''
    const hasContent = !!(event.contentUk || event.contentFullUk)
    return hasTitle && hasContent
  }
  const hasTitle = !!event.titleEn && event.titleEn.trim() !== ''
  const hasContent = !!(event.contentEn || event.contentFull)
  return hasTitle && hasContent
}

export function EventsPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('events')
  const [page, setPage] = useState(1)

  const filteredEvents = events.filter(event => hasValidContent(event, currentLang))
  const totalPages = Math.ceil(filteredEvents.length / PAGE_SIZE)
  const visibleEvents = filteredEvents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="events-page">
      <div className="container">
        <h1 className="events-page__heading">{t('heading')}</h1>
        {filteredEvents.length === 0 ? (
          <p className="events-page__empty">{t('noEvents')}</p>
        ) : (
          <>
            <div className="events-page__grid">
              {visibleEvents.map((event) => (
                <EventCard key={event.id} event={event} currentLang={currentLang} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  )
}