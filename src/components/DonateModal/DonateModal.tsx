import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './DonateModal.scss'

interface DonateModalProps {
  isOpen: boolean
  onClose: () => void
}

const COUNTRIES = [
  'Ukraine', 'United States', 'United Kingdom', 'Germany', 'France',
  'Poland', 'Canada', 'Australia', 'Netherlands', 'Switzerland',
  'Austria', 'Belgium', 'Czech Republic', 'Sweden', 'Norway',
  'Finland', 'Denmark', 'Spain', 'Italy', 'Portugal',
]

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [amount, setAmount] = useState('')
  const [consent, setConsent] = useState(false)
  const [captcha, setCaptcha] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const displayAmount = amount && parseFloat(amount) > 0
    ? parseFloat(amount).toFixed(2)
    : '0.00'

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div className="donate-modal__overlay" onClick={handleOverlayClick}>
      <div className="donate-modal" role="dialog" aria-modal="true" aria-labelledby="donate-modal-title">

        <button className="donate-modal__close" onClick={onClose} aria-label="Close">
          &#215;
        </button>

        <div className="donate-modal__logo-wrap">
          <img src="/images/icons/site-icon.png" alt="UMBS" className="donate-modal__logo" />
        </div>

        <h2 className="donate-modal__title" id="donate-modal-title">Donation to UMBS</h2>

        <form className="donate-modal__form" onSubmit={e => e.preventDefault()}>

          {/* Amount */}
          <div className="donate-modal__field">
            <label className="donate-modal__label">Enter amount</label>
            <input
              type="number"
              className="donate-modal__input"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          {/* Donation purpose */}
          <div className="donate-modal__field">
            <label className="donate-modal__label">Donation purpose</label>
            <input
              type="text"
              className="donate-modal__input"
              placeholder="Please enter the project you are making your donation for"
            />
          </div>

          {/* Name + Email */}
          <div className="donate-modal__row">
            <div className="donate-modal__field">
              <label className="donate-modal__label">Name</label>
              <div className="donate-modal__input-icon-wrap">
                <svg className="donate-modal__icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <input type="text" className="donate-modal__input donate-modal__input--icon" />
              </div>
            </div>
            <div className="donate-modal__field">
              <label className="donate-modal__label">Email</label>
              <div className="donate-modal__input-icon-wrap">
                <svg className="donate-modal__icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <input type="email" className="donate-modal__input donate-modal__input--icon" />
              </div>
            </div>
          </div>

          {/* Billing info */}
          <div className="donate-modal__field">
            <label className="donate-modal__label">Billing info</label>
          </div>

          {/* Address + City */}
          <div className="donate-modal__row">
            <div className="donate-modal__field">
              <label className="donate-modal__label">Address</label>
              <div className="donate-modal__input-icon-wrap">
                <svg className="donate-modal__icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <input type="text" className="donate-modal__input donate-modal__input--icon" />
              </div>
            </div>
            <div className="donate-modal__field">
              <label className="donate-modal__label">City</label>
              <input type="text" className="donate-modal__input" />
            </div>
          </div>

          {/* Country + State + Postcode */}
          <div className="donate-modal__row donate-modal__row--three">
            <div className="donate-modal__field donate-modal__field--grow">
              <label className="donate-modal__label">Country</label>
              <select className="donate-modal__select">
                <option value="">—</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="donate-modal__field">
              <label className="donate-modal__label">State</label>
              <input type="text" className="donate-modal__input" />
            </div>
            <div className="donate-modal__field">
              <label className="donate-modal__label">Postcode</label>
              <input type="text" className="donate-modal__input" />
            </div>
          </div>

          {/* Credit or debit card */}
          <div className="donate-modal__field">
            <label className="donate-modal__label">Credit or debit card</label>
            <div className="donate-modal__card-wrap">
              <svg className="donate-modal__icon donate-modal__icon--card" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
              <input
                type="text"
                className="donate-modal__input donate-modal__input--card-num"
                placeholder="Card number"
              />
              <button type="button" className="donate-modal__autofill">
                Autofill <span className="donate-modal__autofill-link">link</span>
              </button>
            </div>
          </div>

          {/* Consent */}
          <label className="donate-modal__consent">
            <input
              type="checkbox"
              className="donate-modal__checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
            />
            <span>I give my consent to use my email address for future correspondence</span>
          </label>

          {/* reCAPTCHA */}
          <div className="donate-modal__recaptcha-wrap">
            <div className="donate-modal__recaptcha-box">
              <label className="donate-modal__recaptcha-left">
                <input
                  type="checkbox"
                  className="donate-modal__recaptcha-check"
                  checked={captcha}
                  onChange={e => setCaptcha(e.target.checked)}
                />
                <span className="donate-modal__recaptcha-text">Я не робот</span>
              </label>
              <div className="donate-modal__recaptcha-right">
                <svg className="donate-modal__recaptcha-logo" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="#4A90D9" strokeWidth="4" fill="white"/>
                  <path d="M32 14C22.06 14 14 22.06 14 32s8.06 18 18 18 18-8.06 18-18S41.94 14 32 14zm0 32c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z" fill="#4A90D9"/>
                  <path d="M32 22l-6 10h5v8l6-10h-5v-8z" fill="#4A90D9"/>
                </svg>
                <span className="donate-modal__recaptcha-brand">reCAPTCHA</span>
                <span className="donate-modal__recaptcha-meta">Privacy - Terms</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="donate-modal__submit">
            Donate ${displayAmount}
          </button>

        </form>
      </div>
    </div>,
    document.body
  )
}
