import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DonateModal } from '../../components/DonateModal/DonateModal';
import { SocialShareIcons } from '../../components/SocialShareIcons/SocialShareIcons';
import './DonatePage.scss';

interface OutletContext { currentLang: 'en' | 'uk' }

const labels = {
  en: {
    description: 'The Ukrainian Baptist Convention of the US.',
    donate: 'Donate',
    backHome: 'Back to Homepage',
  },
  uk: {
    description: 'Об\'єднання Українських Баптистських Церков у США.',
    donate: 'Пожертвувати',
    backHome: 'На головну сторінку',
  },
}

export function DonatePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { currentLang } = useOutletContext<OutletContext>();
  const l = labels[currentLang];

  return (
    <div className="donate-page">
      <div className="donation-card">
        <div className="donation-card__header">
          <img
            src="/images/icons/site-icon.png"
            alt="UMBS"
            className="donation-card__icon"
            width="75"
            height="75"
          />
          <h1 className="donation-card__title">Donation to UMBS</h1>
        </div>
        <p className="donation-card__description">
          {l.description}
        </p>

        <hr className="donation-card__divider" />

        <div className="donation-card__donate-wrapper">
          <button
            type="button"
            className="donation-card__donate-btn"
            onClick={() => setModalOpen(true)}
          >
            {l.donate}
          </button>
        </div>
      </div>

      <div className="donate-page__social">
        <SocialShareIcons />
      </div>

      <div className="donate-page__home-wrapper">
        <a href="/" className="donate-page__home-link">
          {l.backHome}
        </a>
      </div>

      <DonateModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}