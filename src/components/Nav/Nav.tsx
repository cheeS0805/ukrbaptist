import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import type { NavItem } from '../../specs'
import { DropdownMenu } from '../DropdownMenu/DropdownMenu'
import './Nav.scss'

interface NavProps {
  items: NavItem[]
  currentLang: 'en' | 'uk'
}

export function Nav({ items, currentLang }: NavProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setOpenId(null)
  }, [location.pathname])

  return (
    <nav className="nav" ref={navRef} aria-label="Main navigation">
      <ul className="nav__list">
        {items.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
          const hasDropdown = !!item.children?.length
          const label = currentLang === 'uk' ? item.labelUk : item.labelEn

          return (
            <li
              key={item.id}
              className={clsx('nav__item', {
                'nav__item--has-dropdown': hasDropdown,
                'nav__item--active': isActive,
              })}
            >
              {hasDropdown ? (
                <>
                  <button
                    className={clsx('nav__link', 'nav__dropdown-trigger', { 'nav__link--active': isActive })}
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    aria-expanded={openId === item.id}
                    aria-haspopup="true"
                  >
                    {label}
                    <span className="nav__dropdown-arrow" aria-hidden="true">▾</span>
                  </button>
                  <DropdownMenu
                    items={item.children!}
                    isOpen={openId === item.id}
                    currentLang={currentLang}
                    onClose={() => setOpenId(null)}
                  />
                </>
              ) : (
                <Link
                  to={item.href}
                  className={clsx('nav__link', { 'nav__link--active': isActive })}
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
