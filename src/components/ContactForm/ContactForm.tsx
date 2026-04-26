import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ContactFormData, ContactFormState } from '../../specs'
import './ContactForm.scss'

interface ContactFormProps {
  currentLang: 'en' | 'uk'
  onSubmit: (data: ContactFormData) => Promise<void>
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const { t } = useTranslation('contacts')
  const [state, setState] = useState<ContactFormState>({ status: 'idle' })
  const [fields, setFields] = useState<ContactFormData>({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ status: 'submitting' })
    try {
      await onSubmit(fields)
      setState({ status: 'success' })
      setFields({ name: '', email: '', message: '' })
    } catch {
      setState({ status: 'error', errorMessage: t('form.error') })
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__group">
        <label htmlFor="contact-name" className="contact-form__label">
          {t('form.name')}
        </label>
        <input
          id="contact-name"
          type="text"
          className="contact-form__input"
          placeholder={t('form.name')}
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          required
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="contact-email" className="contact-form__label">
          {t('form.email')}
        </label>
        <input
          id="contact-email"
          type="email"
          className="contact-form__input"
          placeholder={t('form.email')}
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          required
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="contact-message" className="contact-form__label">
          {t('form.message')}
        </label>
        <textarea
          id="contact-message"
          className="contact-form__textarea"
          placeholder={t('form.message')}
          value={fields.message}
          onChange={(e) => setFields({ ...fields, message: e.target.value })}
          rows={6}
          required
        />
      </div>

      {state.status === 'success' && (
        <p className="contact-form__status contact-form__status--success">{t('form.success')}</p>
      )}
      {state.status === 'error' && (
        <p className="contact-form__status contact-form__status--error">{state.errorMessage}</p>
      )}

      <button
        type="submit"
        className="contact-form__submit"
        disabled={state.status === 'submitting'}
      >
        {state.status === 'submitting' ? '...' : t('form.submit')}
      </button>
    </form>
  )
}
