import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { EventCard } from '../../components/EventCard/EventCard'
import { Pagination } from '../../components/Pagination/Pagination'
import { events } from '../../data/events'
import './EventsPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }
const PAGE_SIZE = 20

export function EventsPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('events')
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(events.length / PAGE_SIZE)
  const visible = events.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="events-page">
      <div className="container">
        <h1 className="events-page__heading">{t('heading')}</h1>
        {events.length === 0 ? (
          <p className="events-page__empty">{t('noEvents')}</p>
        ) : (
          <>
            <div className="events-page__grid">
              {visible.map((event) => (
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
