import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import './DonateButton.scss'

interface DonateButtonProps {
  variant?: 'primary' | 'secondary' | 'topbar'
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export function DonateButton({ variant = 'primary', size = 'md', label }: DonateButtonProps) {
  const { t } = useTranslation('common')
  const text = label ?? t('actions.donate')

  return (
    <Link
      to="/donate"
      className={clsx('donate-btn', `donate-btn--${variant}`, `donate-btn--${size}`)}
    >
      {text}
    </Link>
  )
}
