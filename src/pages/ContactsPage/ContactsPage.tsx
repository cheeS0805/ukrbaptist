import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ContactForm } from '../../components/ContactForm/ContactForm'
import type { ContactFormData } from '../../specs'
import './ContactsPage.scss'

interface OutletContext { currentLang: 'en' | 'uk' }

export function ContactsPage() {
  const { currentLang } = useOutletContext<OutletContext>()
  const { t } = useTranslation('contacts')

  async function handleSubmit(_data: ContactFormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <div className="contacts-page">
      <div className="contacts-page__inner">
        <h2 className="contacts-page__heading">{t('heading')}</h2>
        <ContactForm currentLang={currentLang} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
