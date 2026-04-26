import { useEffect, useCallback } from 'react'
import './Lightbox.scss'

interface LightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const total = images.length

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % total)
  }, [currentIndex, total, onNavigate])

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total)
  }, [currentIndex, total, onNavigate])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, goNext, goPrev])

  const src = images[currentIndex]
  const filename = src.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/-\d+x\d+$/, '') ?? ''

  return (
    <div className="lightbox" onClick={onClose}>
      <span className="lightbox__counter">{currentIndex + 1} / {total}</span>

      <button className="lightbox__close" onClick={onClose} aria-label="Close">✕</button>

      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); goPrev() }}
        aria-label="Previous"
      >
        ‹
      </button>

      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={filename} className="lightbox__img" />
      </div>

      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); goNext() }}
        aria-label="Next"
      >
        ›
      </button>

      <div className="lightbox__caption">{filename}</div>
    </div>
  )
}
