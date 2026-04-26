import { Link } from 'react-router-dom'
import clsx from 'clsx'
import type { NavItem } from '../../specs'
import './DropdownMenu.scss'

interface DropdownMenuProps {
  items: NavItem[]
  isOpen: boolean
  currentLang: 'en' | 'uk'
  onClose: () => void
}

export function DropdownMenu({ items, isOpen, currentLang, onClose }: DropdownMenuProps) {
  return (
    <div className={clsx('dropdown', { 'dropdown--open': isOpen })} role="menu">
      <ul className="dropdown__list">
        {items.map((item) => (
          <li key={item.id} className="dropdown__item" role="none">
            <Link
              to={item.href}
              className="dropdown__link"
              role="menuitem"
              onClick={onClose}
            >
              {currentLang === 'uk' ? item.labelUk : item.labelEn}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
