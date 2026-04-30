import { useState } from 'react'
import { useOutletContext, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { churches } from '../../data/churches'
import { ChurchCard } from '../../components/ChurchCard/ChurchCard'
import './ChurchDetailPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

const labels = {
  en: {
    pastor: 'Pastor', phone: 'Phone', address: 'Address', website: 'Website',
    email: 'Email', direction: 'Direction', notFound: 'Church not found.', others: 'Other Churches',
    sendMessage: 'Send a message', namePlaceholder: 'Name', emailPlaceholder: 'Email',
    messagePlaceholder: 'Message', submit: 'Send',
  },
  uk: {
    pastor: 'Пастор', phone: 'Телефон', address: 'Адреса', website: 'Вебсайт',
    email: 'Email', direction: 'Маршрут', notFound: 'Церкву не знайдено.', others: 'Інші церкви',
    sendMessage: 'Надіслати повідомлення', namePlaceholder: "Ім'я", emailPlaceholder: 'Email',
    messagePlaceholder: 'Повідомлення', submit: 'Відправити',
  },
}

export function ChurchDetailPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation('common')
  const l = labels[currentLang]

  const [formOpen, setFormOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const church = churches.find((c) => c.slug === slug)

  if (!church) {
    return (
      <div className="container church-detail__not-found">
        <p>{l.notFound}</p>
        <Link to="/churches">{t('nav.churches')}</Link>
      </div>
    )
  }

  const churchName = currentLang === 'uk' && church.nameUk ? church.nameUk : church.nameEn
  const otherChurches = churches.filter((c) => c.slug !== slug)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${church!.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="church-detail">
      <div className="container">

        <div className="church-detail__breadcrumb">
          <Link to="/">{t('nav.home')}</Link>
          <span className="church-detail__breadcrumb-sep"> &rsaquo; </span>
          <Link to="/archive">{currentLang === 'uk' ? 'Українська' : 'English'}</Link>
          <span className="church-detail__breadcrumb-sep"> &rsaquo; </span>
          <span className="church-detail__breadcrumb-current">{churchName}</span>
        </div>

        <div className="church-detail__panel">
          <div className="church-detail__panel-inner">
            <div className="church-detail__photo-col">
              {church.photoUrl ? (
                <img src={church.photoUrl} alt={churchName} className="church-detail__photo" />
              ) : (
                <div className="church-detail__photo-placeholder" />
              )}
            </div>

            <div className="church-detail__info">
              <h1 className="church-detail__name">{churchName}</h1>

              <table className="church-detail__table">
                <tbody>
                  {church.contacts?.map((contact, i) => (
                    <>
                      <tr key={`pastor-${i}`}>
                        <td className="church-detail__label">{l.pastor}:</td>
                        <td className="church-detail__value">
                          {currentLang === 'uk' && contact.nameUk ? contact.nameUk : contact.name}
                        </td>
                      </tr>
                      {contact.phone && (
                        <tr key={`phone-${i}`}>
                          <td className="church-detail__label">{l.phone}:</td>
                          <td className="church-detail__value">
                            <a href={`tel:${contact.phone}`} className="church-detail__link">{contact.phone}</a>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                  {church.address && (
                    <tr>
                      <td className="church-detail__label">{l.address}:</td>
                      <td className="church-detail__value">{church.address}</td>
                    </tr>
                  )}
                  {church.email && (
                    <tr>
                      <td className="church-detail__label">{l.email}:</td>
                      <td className="church-detail__value">
                        <button
                          type="button"
                          className="church-detail__send-toggle"
                          onClick={() => setFormOpen((v) => !v)}
                        >
                          {l.sendMessage}
                        </button>
                        <div className={`church-detail__form-wrap${formOpen ? ' church-detail__form-wrap--open' : ''}`}>
                          <form className="church-detail__form" onSubmit={handleSubmit}>
                            <input
                              type="text"
                              className="church-detail__form-input"
                              placeholder={l.namePlaceholder}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                            <input
                              type="email"
                              className="church-detail__form-input"
                              placeholder={l.emailPlaceholder}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <textarea
                              className="church-detail__form-textarea"
                              placeholder={l.messagePlaceholder}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={4}
                              required
                            />
                            <button type="submit" className="church-detail__form-submit">
                              {l.submit}
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )}
                  {church.website && (
                    <tr>
                      <td className="church-detail__label">{l.website}:</td>
                      <td className="church-detail__value">
                        <a href={church.website} target="_blank" rel="noopener noreferrer" className="church-detail__link">
                          {church.website.replace(/^https?:\/\//, '')}
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {church.mapsUrl && (
                <a href={church.mapsUrl} target="_blank" rel="noopener noreferrer" className="church-detail__direction">
                  {l.direction.toUpperCase()}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="church-detail__more">
          <h2 className="church-detail__more-heading">{l.others}</h2>
          <div className="church-detail__more-grid">
            {otherChurches.map((c) => (
              <ChurchCard key={c.slug} church={c} currentLang={currentLang} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}