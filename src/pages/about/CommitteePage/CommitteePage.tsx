import { useOutletContext, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BoardMemberCard } from '../../../components/BoardMemberCard/BoardMemberCard'
import { boardMembers } from '../../../data/boardMembers'
import './CommitteePage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

export function CommitteePage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t: tCommon } = useTranslation('common')
  const { t: tAbout } = useTranslation('about')

  return (
    <div className="committee-page">
      <div className="container">
        <div className="committee-page__breadcrumb">
          <Link to="/">{tCommon('nav.home')}</Link>
          <span className="committee-page__breadcrumb-sep"> &rsaquo; </span>
          <Link to="/archive">{currentLang === 'uk' ? 'Українська' : 'English'}</Link>
          <span className="committee-page__breadcrumb-sep"> &rsaquo; </span>
          <span className="committee-page__breadcrumb-current">
            {currentLang === 'uk' ? tAbout('committee.heading') : 'Board of Directors'}
          </span>
        </div>
        <h1 className="committee-page__heading">{tAbout('committee.heading')}</h1>
        <div className="committee-page__grid">
          {boardMembers.map((member) => (
            <BoardMemberCard key={member.id} member={member} currentLang={currentLang} />
          ))}
        </div>
      </div>
    </div>
  )
}