import clsx from 'clsx'
import './Pagination.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            className={clsx('pagination__link', { 'pagination__link--disabled': currentPage === 1 })}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ‹
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page} className="pagination__item">
            <button
              className={clsx('pagination__link', { 'pagination__link--active': page === currentPage })}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        <li className="pagination__item">
          <button
            className={clsx('pagination__link', { 'pagination__link--disabled': currentPage === totalPages })}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  )
}
