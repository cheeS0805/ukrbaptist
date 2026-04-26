import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Footer.scss'

export function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Link
          to="/"
          className="footer__copyright"
          onClick={() => window.scrollTo(0, 0)}
        >
          {t('footer.copyright')}
        </Link>
        <a
          href="https://www.lagompack.com/"
          className="footer__credit"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('footer.credit')}
        </a>
      </div>
    </footer>
  )
}
