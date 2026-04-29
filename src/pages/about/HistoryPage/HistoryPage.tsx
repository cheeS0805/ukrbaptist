import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SocialShareIcons } from '../../../components/SocialShareIcons/SocialShareIcons';
import { historyEn, historyUk } from '../../../data/historyContent';
import './HistoryPage.scss';

interface OutletContext { currentLang: 'en' | 'uk' }

export function HistoryPage() {
  const { currentLang } = useOutletContext<OutletContext>();
  const { t } = useTranslation('about');
  const content = currentLang === 'uk' ? (historyUk || historyEn) : historyEn;

  return (
    <div className="history-page">
      <div className="history-page__social">
        <SocialShareIcons />
      </div>

      <div className="history-page__container">
        <h1 className="history-page__title">{t('history.heading')}</h1>
        <p className="history-page__subtitle">
          {currentLang === 'uk'
            ? <>{t('history.subheading')}</>
            : <>A brief history of<br />the Ukrainian Evangelical Baptist Convention<br />in the United States of America</>
          }
        </p>

        <div
          className="history-page__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
