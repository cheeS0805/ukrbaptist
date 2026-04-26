import type { BoardMember } from '../../specs'
import './BoardMemberCard.scss'

interface BoardMemberCardProps {
  member: BoardMember
  currentLang: 'en' | 'uk'
}

const HONORIFICS_UK = ['пастор', 'прот.', 'прот']
const HONORIFICS_EN = ['rev.', 'rev', 'pastor']

function extractHonorificAndName(fullName: string, lang: 'en' | 'uk'): { honorific: string | null; restName: string } {
  const words = fullName.trim().split(/\s+/)
  if (words.length === 0) return { honorific: null, restName: '' }

  const firstWordLower = words[0].toLowerCase()
  const honorificList = lang === 'uk' ? HONORIFICS_UK : HONORIFICS_EN
  const isHonorific = honorificList.includes(firstWordLower)

  if (isHonorific && words.length > 1) {
    return {
      honorific: words[0],
      restName: words.slice(1).join(' ')
    }
  }
  return { honorific: null, restName: fullName }
}

export function BoardMemberCard({ member, currentLang }: BoardMemberCardProps) {
  const fullName = currentLang === 'uk' && member.nameUk ? member.nameUk : member.nameEn
  const title = currentLang === 'uk' && member.titleUk ? member.titleUk : member.titleEn
  const { honorific, restName } = extractHonorificAndName(fullName, currentLang)

  return (
    <div className="board-card">
      <div className="board-card__photo-wrapper">
        <img
          src={member.photoUrl}
          alt={fullName}
          className="board-card__photo"
          loading="lazy"
        />
      </div>
      <div className="board-card__info">
        {honorific ? (
          <div className="board-card__name-wrapper">
            <span className="board-card__honorific">{honorific}</span>
            <span className="board-card__name">{restName}</span>
          </div>
        ) : (
          <div className="board-card__fullname">{restName}</div>
        )}
        <p className="board-card__title">{title}</p>
        {member.ministryArea && (
          <span className="board-card__ministry">{member.ministryArea}</span>
        )}
      </div>
    </div>
  )
}
