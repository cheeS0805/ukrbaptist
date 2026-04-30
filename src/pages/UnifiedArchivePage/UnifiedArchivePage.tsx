import { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { articles } from '../../data/articles'
import { events } from '../../data/events'
import { garageItems } from '../../data/garageItems'
import { churches } from '../../data/churches'
import { boardMembers } from '../../data/boardMembers'
import { Pagination } from '../../components/Pagination/Pagination'
import './UnifiedArchivePage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }
const PAGE_SIZE = 20

type UnifiedItem = {
  id: string
  slug: string | null
  title: string
  date: string | null 
  type: 'article' | 'event' | 'garage' | 'church' | 'person'
  publishedAt?: string
}

export function UnifiedArchivePage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const [page, setPage] = useState(1)

  const allItems: UnifiedItem[] = [

      ...articles
      .filter(article => {
        if (currentLang === 'uk') return !!(article.titleUk && (article.contentUk || article.contentFullUk))
        return !!(article.titleEn && (article.contentEn || article.contentFull))
      })
      .map(article => ({
        id: `article-${article.id}`,
        slug: `/articles/${article.slug}`,
        title: currentLang === 'uk' ? article.titleUk! : article.titleEn,
        date: (currentLang === 'uk' && article.publishedAtUk) || article.publishedAt || null,
        type: 'article' as const,
      })),

      ...events
      .filter(event => {
        if (currentLang === 'uk') return !!(event.titleUk && (event.contentUk || event.contentFullUk))
        return !!(event.titleEn && (event.contentEn || event.contentFull))
      })
      .map(event => ({
        id: `event-${event.id}`,
        slug: `/our-events/${event.slug}`,
        title: currentLang === 'uk' ? event.titleUk! : event.titleEn,
        date: (currentLang === 'uk' && event.publishedAtUk) || event.publishedAt || null,
        type: 'event' as const,
      })),

      ...garageItems
      .filter(item => {
        if (currentLang === 'uk') return !!(item.titleUk && (item.contentFullUk || item.contentUk))
        return !!(item.titleEn && (item.contentFull || item.contentEn))
      })
      .map(item => ({
        id: `garage-${item.id}`,
        slug: `/garage/${item.slug}`,
        title: currentLang === 'uk' ? item.titleUk! : item.titleEn,
        date: (currentLang === 'uk' && item.publishedAtUk) || item.publishedAt || null,
        type: 'garage' as const,
      })),

      ...churches
      .map(church => ({
        id: `church-${church.slug}`,
        slug: `/churches/${church.slug}`,
        title: currentLang === 'uk' && church.nameUk ? church.nameUk : church.nameEn,
        date: null,
        type: 'church' as const,
      })),

     ...boardMembers
  .map(member => ({
    id: `person-${member.id}`,
    slug: '/about-us/committee',  
    title: currentLang === 'uk' && member.nameUk ? member.nameUk : member.nameEn,
    date: null,
    type: 'person' as const,
  })),
  ]

  const validItems = allItems.filter(item => item.title && item.title.trim() !== '')
  
  const sorted = validItems.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    if (a.date && !b.date) return -1
    if (!a.date && b.date) return 1
    return 0
  })
  
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString(
      currentLang === 'uk' ? 'uk-UA' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    )
  }

  const getTypeLabel = (type: UnifiedItem['type']) => {
    switch (type) {
      case 'article': return currentLang === 'uk' ? 'Стаття' : 'Article'
      case 'event': return currentLang === 'uk' ? 'Подія' : 'Event'
      case 'garage': return currentLang === 'uk' ? 'Гараж' : 'Garage'
      case 'church': return currentLang === 'uk' ? 'Церква' : 'Church'
      case 'person': return currentLang === 'uk' ? 'Член управи' : 'Board Member'
    }
  }

  return (
    <div className="unified-archive-page">
      <div className="container">
        <h1 className="unified-archive-page__heading">
          {currentLang === 'uk' ? 'Архів матеріалів' : 'All Materials Archive'}
        </h1>
       <div className="unified-archive-page__list">
          {visible.map(item => (
            <article key={item.id} className="unified-archive-page__item">
              <div className="unified-archive-page__item-meta">
                {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
                <span className="unified-archive-page__item-type">{getTypeLabel(item.type)}</span>
              </div>
              <h2 className="unified-archive-page__item-title">
                {item.slug ? (
                  <Link to={item.slug} className="unified-archive-page__item-link">
                    {item.title}
                  </Link>
                ) : (
                  <span>{item.title}</span>
                )}
              </h2>
            </article>
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={p => { setPage(p); window.scrollTo(0, 0) }}
          />
        )}
      </div>
    </div>
  )
}