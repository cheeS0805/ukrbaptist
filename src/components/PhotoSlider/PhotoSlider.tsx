import { useState, useEffect } from 'react'
import slide1 from '../../assets/slider/11.jpg'
import slide2 from '../../assets/slider/22.jpg'
import slide3 from '../../assets/slider/33.jpg'
import slide4 from '../../assets/slider/44.jpg'
import slide5 from '../../assets/slider/55.jpg'
import slide6 from '../../assets/slider/66.jpg'
import slide7 from '../../assets/slider/77.jpg'
import slide8 from '../../assets/slider/88.jpg'
import './PhotoSlider.scss'

const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8]

const INTERVAL_MS = 7000

export function PhotoSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="photo-slider" aria-label="Photo gallery">
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={`photo-slider__slide${i === current ? ' photo-slider__slide--active' : ''}`}
        />
      ))}
    </section>
  )
}
