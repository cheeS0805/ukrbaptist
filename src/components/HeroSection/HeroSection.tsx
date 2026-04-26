import './HeroSection.scss'

interface HeroSectionProps {
  headingEn: string
  headingUk: string
  backgroundImageUrl?: string
  currentLang: 'en' | 'uk'
  ctaLabelEn?: string
  ctaLabelUk?: string
  ctaHref?: string
}

export function HeroSection({
  headingEn,
  headingUk,
  backgroundImageUrl,
  currentLang,
  ctaLabelEn,
  ctaLabelUk,
  ctaHref,
}: HeroSectionProps) {
  const heading = currentLang === 'uk' ? headingUk : headingEn
  const ctaLabel = currentLang === 'uk' ? ctaLabelUk : ctaLabelEn

  return (
    <section
      className="hero"
      style={backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : undefined}
    >
      <div className="hero__overlay" aria-hidden="true" />
      <div className="container hero__content">
        <h1 className="hero__heading">{heading}</h1>
        {ctaHref && ctaLabel && (
          <a href={ctaHref} className="hero__cta">
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  )
}
