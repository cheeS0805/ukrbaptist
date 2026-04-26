import type { NavItem } from '../specs'

export const topBarNavItems: NavItem[] = [
  { id: 'creed-top',    labelEn: 'Creed',    labelUk: 'Віровчення', href: '/about-us/creed' },
  { id: 'contacts-top', labelEn: 'Contacts', labelUk: 'Контакти',   href: '/contacts' },
  { id: 'blog',         labelEn: 'Blog',     labelUk: 'Блог',       href: '/blog' },
]

export const mainNavItems: NavItem[] = [
  { id: 'home', labelEn: 'Home', labelUk: 'Головна', href: '/' },
  {
    id: 'about',
    labelEn: 'About Us',
    labelUk: 'Про нас',
    href: '/about-us',
    children: [
      { id: 'history',   labelEn: 'History',  labelUk: 'Історія',    href: '/about-us/history' },
      { id: 'committee', labelEn: 'Board',    labelUk: 'Управа',     href: '/about-us/committee' },
      { id: 'creed',     labelEn: 'Creed',    labelUk: 'Віровчення', href: '/about-us/creed' },
      { id: 'partners',  labelEn: 'Partners', labelUk: 'Партнери',   href: '/about-us/partners' },
    ],
  },
  { id: 'churches', labelEn: 'Churches', labelUk: 'Церкви',    href: '/churches' },
  { id: 'garage',   labelEn: '"Garage"', labelUk: '«Гараж»',   href: '/garage' },
  { id: 'events',   labelEn: 'Events',   labelUk: 'Події',     href: '/our-events' },
]

export const navItems = mainNavItems
