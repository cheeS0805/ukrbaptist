import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BoardMemberCard } from '../../../components/BoardMemberCard/BoardMemberCard'
import { boardMembers } from '../../../data/boardMembers'
import './CommitteePage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

export function CommitteePage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('about')

  return (
    <div className="committee-page">
      <div className="container">
        <h1 className="committee-page__heading">{t('committee.heading')}</h1>
        <div className="committee-page__grid">
          {boardMembers.map((member) => (
            <BoardMemberCard key={member.id} member={member} currentLang={currentLang} />
          ))}
        </div>
      </div>
    </div>
  )
}
