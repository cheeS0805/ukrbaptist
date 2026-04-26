import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { Nav } from '../Nav/Nav'
import { DonateButton } from '../DonateButton/DonateButton'
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'
import { topBarNavItems, mainNavItems } from '../../data/navigation'
import './Header.scss'

interface HeaderProps {
  currentLang: 'en' | 'uk'
  onLangSwitch: (lang: 'en' | 'uk') => void
}

export function Header({ currentLang, onLangSwitch }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          '--header-height',
          `${headerRef.current.offsetHeight}px`
        )
      }
    }
    update()
    const observer = new ResizeObserver(update)
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="header" ref={headerRef}>
      <div className="header__top-bar">
        <div className="container header__top-bar-inner">
          <nav className="header__top-links">
            {topBarNavItems.map((item, index) => (
              <span key={item.id} className="header__top-link-wrap">
                {index > 0 && <span className="header__top-divider">|</span>}
                <Link
                  to={item.href}
                  className={clsx('header__top-link', {
                    'header__top-link--active': location.pathname === item.href,
                  })}
                >
                  {currentLang === 'uk' ? item.labelUk : item.labelEn}
                </Link>
              </span>
            ))}
            <DonateButton variant="topbar" size="sm" />
          </nav>
          <LanguageSwitcher currentLang={currentLang} onSwitch={onLangSwitch} />
        </div>
      </div>

      <div className="header__main-bar">
        <div className="container header__main-bar-inner">
          <Link to="/" className="header__logo">
            <span className="header__logo-ukr">{currentLang === 'uk' ? 'УКР' : 'UKR'}</span>
            <span className="header__logo-baptist">{currentLang === 'uk' ? 'БАПТИСТ' : 'BAPTIST'}</span>
          </Link>

          <div className="header__nav">
            <Nav items={mainNavItems} currentLang={currentLang} />
          </div>

          <button
            className={clsx('header__mobile-toggle', { 'header__mobile-toggle--open': mobileOpen })}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="header__mobile-menu">
          <Nav items={mainNavItems} currentLang={currentLang} />
        </div>
      )}
    </header>
  )
}
