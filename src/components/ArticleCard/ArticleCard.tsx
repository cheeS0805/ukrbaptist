import { Link } from 'react-router-dom'
import type { Article } from '../../specs'
import './ArticleCard.scss'

interface ArticleCardProps {
  article: Article
  currentLang: 'en' | 'uk'
}

export function ArticleCard({ article, currentLang }: ArticleCardProps) {
  const title = currentLang === 'uk' && article.titleUk ? article.titleUk : article.titleEn
  const excerpt = currentLang === 'uk' && article.excerptUk ? article.excerptUk : article.excerptEn
  const thumbnail = currentLang === 'uk' && article.thumbnailUrlUk ? article.thumbnailUrlUk : article.thumbnailUrl
  const variant = article.cardVariant ?? (thumbnail ? 'thumbnail-left' : 'text-only')

  return (
    <article className={`article-card article-card--${variant}`}>
      {variant === 'image-top' && thumbnail && (
        <Link to={`/articles/${article.slug}`} className="article-card__image-wrapper">
          <img
            src={thumbnail}
            alt={title}
            className="article-card__image"
            loading="lazy"
          />
        </Link>
      )}

      <div className="article-card__body">
        {variant === 'thumbnail-left' && thumbnail && (
          <Link to={`/articles/${article.slug}`} className="article-card__thumb-wrapper">
            <img
              src={thumbnail}
              alt={title}
              className="article-card__thumb"
              loading="lazy"
            />
          </Link>
        )}

        <div className="article-card__text">
          <h3 className="article-card__title">
            <Link to={`/articles/${article.slug}`} className="article-card__title-link">
              {title}
            </Link>
          </h3>
          <p className="article-card__excerpt">{excerpt}</p>
          <Link to={`/articles/${article.slug}`} className="article-card__read-more">
            READ MORE
          </Link>
        </div>
      </div>
    </article>
  )
}
