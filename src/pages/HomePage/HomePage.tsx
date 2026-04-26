import { Link, useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HeroSection } from '../../components/HeroSection/HeroSection'
import { PhotoSlider } from '../../components/PhotoSlider/PhotoSlider'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard'
import { articles } from '../../data/articles'
import './HomePage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

export function HomePage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('home')

  return (
    <div className="home-page">
      <PhotoSlider />
      <HeroSection
        headingEn="Welcome to the Official Website of the Ukrainian Baptist Convention in the USA"
        headingUk="Ласкаво просимо на сайт Об'єднання Українських Баптистських Церков у США"
        currentLang={currentLang}
      />
      <section className="home-page__news">
        <div className="container">
          <div className="home-page__news-layout">
            <div className="home-page__news-main">
              <div className="home-page__news-grid">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} currentLang={currentLang} />
                ))}
              </div>
            </div>

            <aside className="home-page__sidebar">
              <h2 className="home-page__sidebar-title">{t('upcomingEvents')}</h2>
              <div className="home-page__sidebar-body">
                <p className="home-page__no-events">{t('noEvents')}</p>
                <Link to="/our-events" className="home-page__events-btn">
                  {t('backToEvents')}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
