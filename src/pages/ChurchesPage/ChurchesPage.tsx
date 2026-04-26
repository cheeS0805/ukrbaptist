import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChurchCard } from '../../components/ChurchCard/ChurchCard'
import { churches } from '../../data/churches'
import './ChurchesPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

export function ChurchesPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('churches')

  return (
    <div className="churches-page">
      <div className="container">
        <h1 className="churches-page__heading">{t('heading')}</h1>
        <div className="churches-page__grid">
          {churches.map((church) => (
            <ChurchCard key={church.slug} church={church} currentLang={currentLang} />
          ))}
        </div>
      </div>
    </div>
  )
}
