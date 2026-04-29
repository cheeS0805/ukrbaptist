import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard'
import { Pagination } from '../../components/Pagination/Pagination'
import { articles } from '../../data/articles'
import './ArticlesPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }
const PAGE_SIZE = 10

export function ArticlesPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(articles.length / PAGE_SIZE)
  const visible = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const heading = currentLang === 'uk' ? 'Українська' : 'English'

  return (
    <div className="articles-page">
      <div className="container">
        <h1 className="articles-page__heading">{heading}</h1>
        <div className="articles-page__list">
          {visible.map((article) => (
            <div key={article.id} className="articles-page__item">
              <ArticleCard article={article} currentLang={currentLang} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => { setPage(p); window.scrollTo(0, 0) }}
        />
      </div>
    </div>
  )
}
