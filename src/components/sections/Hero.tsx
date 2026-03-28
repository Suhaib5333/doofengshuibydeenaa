import { useRef, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import heroVideo from '@/assets/hero.mp4'
import logo from '@/assets/logo.png'
import { useLanguage } from '@/i18n/LanguageContext'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* ── Five Feng Shui elements (for the rotating ring) ─────────────────── */
const FIVE_ELEMENTS = [
  { deg: 0,   color: '#9CBF1B' }, // Wood   — green
  { deg: 72,  color: '#D9B95F' }, // Fire   — gold
  { deg: 144, color: '#1686AF' }, // Earth  — teal
  { deg: 216, color: '#36ABD9' }, // Metal  — light blue
  { deg: 288, color: '#0057A9' }, // Water  — deep blue
]

export default function Hero() {
  const { t } = useLanguage()

  const STATS = useMemo(() => [
    {
      value: t.hero.stat1Value,
      label: t.hero.stat1Label,
      accent: 'linear-gradient(135deg, #9CBF1B, #36ABD9)',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      value: t.hero.stat2Value,
      label: t.hero.stat2Label,
      accent: 'linear-gradient(135deg, #1686AF, #36ABD9)',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      ),
    },
    {
      value: t.hero.stat3Value,
      label: t.hero.stat3Label,
      accent: 'linear-gradient(135deg, #D9B95F, #9CBF1B)',
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
        </svg>
      ),
    },
  ], [t])
  const sectionRef         = useRef<HTMLElement>(null)
  const videoRef           = useRef<HTMLVideoElement>(null)
  const headingRef         = useRef<HTMLHeadingElement>(null)
  const bylineRef          = useRef<HTMLParagraphElement>(null)
  const dividerRef         = useRef<HTMLDivElement>(null)
  const subRef             = useRef<HTMLParagraphElement>(null)
  const ctaRef             = useRef<HTMLDivElement>(null)
  const badgeRef           = useRef<HTMLDivElement>(null)
  const statsRef           = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const decorRef           = useRef<HTMLDivElement>(null)
  const ringRef            = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // ── Five-element ring — slow perpetual rotation ──────────────────
    gsap.to(ringRef.current, {
      rotation: 360,
      duration: 22,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    })

    // ── Entrance timeline ────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.7)' }
    )

    const heading = headingRef.current
    if (heading) {
      const text = heading.textContent ?? ''
      heading.innerHTML = ''
      heading.style.visibility = 'visible'
      const chars = text.split('').map((char) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.cssText = 'display:inline-block;opacity:0;transform:translateY(42px)'
        heading.appendChild(span)
        return span
      })
      tl.to(
        chars,
        { opacity: 1, y: 0, duration: 0.06, stagger: 0.04, ease: 'power3.out' },
        '-=0.35'
      )
    }

    tl.fromTo(bylineRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.15')
    tl.fromTo(dividerRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.3')

    if (ctaRef.current) {
      tl.fromTo(
        Array.from(ctaRef.current.children),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out' },
        '-=0.3'
      )
    }

    tl.fromTo(statsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
    tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1')

    // ── Floating ambient orbs ────────────────────────────────────────
    const orbs = decorRef.current?.querySelectorAll<HTMLElement>('.orb')
    if (orbs?.length) {
      gsap.to(orbs, {
        y: 'random(-30, 30)',
        x: 'random(-16, 16)',
        duration: 'random(5, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.9, from: 'random' },
      })
    }

    // ── Video parallax ───────────────────────────────────────────────
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
        scale: 1.14,
        y: 90,
        ease: 'none',
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="home"
      className="grain relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >

      {/* ── Video background ──────────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover origin-center"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* ── Gradient overlays ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-900/85 via-sand-900/55 to-sand-900/95 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-sand-900/45 via-transparent to-sand-900/45 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(31,26,21,0.45) 100%)' }}
      />

      {/* ── Ambient orbs ──────────────────────────────────────────────── */}
      <div ref={decorRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb absolute top-[18%] left-[8%] w-[22rem] h-[22rem] rounded-full bg-gradient-to-br from-primary/[0.2] to-primary-light/[0.08] blur-[100px]" />
        <div className="orb absolute top-[34%] right-[5%] w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-accent-green/[0.14] to-primary/[0.06] blur-[100px]" />
        <div className="orb absolute bottom-[28%] left-[26%] w-[20rem] h-[20rem] rounded-full bg-gradient-to-br from-accent-gold/[0.12] to-cream/[0.05] blur-[80px]" />
        <div className="orb absolute bottom-[8%] right-[18%] w-[18rem] h-[18rem] rounded-full bg-gradient-to-br from-primary-light/[0.14] to-accent-green/[0.06] blur-[70px]" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto pt-28 sm:pt-32 lg:pt-0 pb-40 sm:pb-48 flex flex-col items-center text-center"
        style={{ width: 'min(86%, 50rem)' }}
      >

        {/* ─── Badge / Circular Emblem ─────────────────────────────── */}
        <div ref={badgeRef} className="flex flex-col items-center gap-3 sm:gap-4 mb-8 sm:mb-12">

          {/* Circular logo with rotating ring */}
          <div className="relative w-[6rem] h-[6rem] sm:w-[8rem] sm:h-[8rem] lg:w-[10rem] lg:h-[10rem] flex items-center justify-center">
            <div ref={ringRef} className="absolute inset-0">
              <div className="absolute inset-0 rounded-full border border-white/[0.1]" />
              {FIVE_ELEMENTS.map(({ deg, color }) => {
                const rad = ((deg - 90) * Math.PI) / 180
                const cx  = 50 + 46 * Math.cos(rad)
                const cy  = 50 + 46 * Math.sin(rad)
                return (
                  <div
                    key={deg}
                    className="absolute w-1.5 h-1.5 sm:w-[0.45rem] sm:h-[0.45rem] rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${cx}%`, top: `${cy}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}99, 0 0 3px ${color}55` }}
                  />
                )
              })}
            </div>
            <div className="absolute inset-3 sm:inset-4 lg:inset-5 rounded-full bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-sm border border-white/[0.08]" />
            <div
              className="absolute inset-4 sm:inset-5 lg:inset-6 rounded-full blur-xl"
              style={{
                background: 'radial-gradient(circle, rgba(156,191,27,0.25) 0%, rgba(54,171,217,0.15) 60%, transparent 100%)',
                animation: 'glow-breathe 4s ease-in-out infinite',
              }}
            />
            <img
              src={logo}
              alt="DooFengShui emblem"
              className="relative z-10 w-10 h-10 sm:w-14 sm:h-14 lg:w-[4.5rem] lg:h-[4.5rem] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Tagline pill */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-lg">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent-green animate-pulse-soft shrink-0" />
            <span className="text-[9px] sm:text-[10.5px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-medium text-white/75">
              {t.hero.tagline}
            </span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary-light animate-pulse-soft shrink-0" />
          </div>
        </div>

        {/* ─── Main Heading ─────────────────────────────────────────── */}
        <h1
          ref={headingRef}
          className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[6.75rem] font-bold text-white tracking-tight leading-[1.05] mb-3 sm:mb-4"
          style={{ visibility: 'hidden', direction: 'ltr', unicodeBidi: 'bidi-override' }}
        >
          {t.hero.title}
        </h1>

        {/* ─── "by Deena" byline ────────────────────────────────────── */}
        <p
          ref={bylineRef}
          className="text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.35em] uppercase font-semibold"
          style={{ color: 'rgba(217,185,95,0.9)', marginBottom: 'clamp(1.25rem, 3vw, 2rem)' }}
        >
          {t.hero.byline}
        </p>

        {/* ─── Ornamental divider ───────────────────────────────────── */}
        <div ref={dividerRef} className="flex items-center justify-center gap-2 sm:gap-3 origin-center" style={{ marginBottom: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}>
          <div className="h-px w-14 sm:w-20 lg:w-24 bg-gradient-to-r from-transparent to-white/40" />
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="opacity-70 shrink-0 sm:w-[14px] sm:h-[14px]">
            <circle cx="7"  cy="7"  r="2"   fill="#D9B95F" />
            <circle cx="7"  cy="1"  r="0.9" fill="#9CBF1B" />
            <circle cx="7"  cy="13" r="0.9" fill="#36ABD9" />
            <circle cx="1"  cy="7"  r="0.9" fill="#1686AF" />
            <circle cx="13" cy="7"  r="0.9" fill="#D9B95F" />
          </svg>
          <div className="h-px w-14 sm:w-20 lg:w-24 bg-gradient-to-l from-transparent to-white/40" />
        </div>

        {/* ─── Subtitle ─────────────────────────────────────────────── */}
        <p
          ref={subRef}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-[90%] sm:max-w-md text-center leading-relaxed font-light"
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          {t.hero.subtitle}
        </p>

        {/* ─── CTA Buttons ──────────────────────────────────────────── */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
          style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          {/* Primary — white solid (matches navbar CTA) */}
          <a
            href="#services"
            className="inline-flex items-center justify-center font-semibold transition-all duration-300 hover:-translate-y-px active:scale-[0.97]"
            style={{
              padding:        '12px 28px',
              fontSize:       '15px',
              borderRadius:   '10px',
              background:     '#ffffff',
              color:          '#0f172a',
              textDecoration: 'none',
              whiteSpace:     'nowrap',
              boxShadow:      '0 2px 18px rgba(0,0,0,0.18)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform  = 'translateY(-2px)'
              e.currentTarget.style.boxShadow  = '0 6px 24px rgba(0,0,0,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform  = ''
              e.currentTarget.style.boxShadow  = '0 2px 18px rgba(0,0,0,0.18)'
            }}
          >
            {t.hero.ctaPrimary}
          </a>

          {/* Secondary — bordered ghost (matches navbar Log in) */}
          <a
            href="#blog"
            className="inline-flex items-center justify-center font-medium transition-all duration-250 hover:-translate-y-px active:scale-[0.97]"
            style={{
              padding:        '11px 26px',
              fontSize:       '15px',
              borderRadius:   '10px',
              color:          'rgba(255,255,255,0.9)',
              background:     'transparent',
              textDecoration: 'none',
              border:         '1.5px solid rgba(255,255,255,0.22)',
              whiteSpace:     'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color       = '#fff'
              e.currentTarget.style.background  = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color       = 'rgba(255,255,255,0.72)'
              e.currentTarget.style.background  = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
            }}
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* ─── Stats — individual glass cards ────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-3 sm:gap-5 lg:gap-7 w-full max-w-[92%] sm:max-w-lg lg:max-w-2xl mx-auto"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center px-3 sm:px-5 lg:px-6 py-4 sm:py-6 lg:py-7 rounded-xl sm:rounded-2xl bg-white/[0.05] backdrop-blur-lg border border-white/[0.08] overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.14]"
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 inset-x-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: stat.accent }}
              />
              {/* Icon */}
              <div
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl mb-2 sm:mb-3 lg:mb-4 text-white/75 group-hover:text-white/90 transition-colors duration-300"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {stat.icon}
              </div>
              {/* Number */}
              <p className="text-xl sm:text-2xl lg:text-[2.25rem] font-bold text-gradient leading-none">
                {stat.value}
              </p>
              {/* Label */}
              <p className="text-[7px] sm:text-[9.5px] lg:text-[10.5px] text-white/65 mt-1.5 sm:mt-2 tracking-[0.08em] sm:tracking-[0.16em] uppercase font-medium text-center leading-tight group-hover:text-white/80 transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[8px] sm:text-[9px] tracking-[0.4em] uppercase font-medium">{t.hero.scroll}</span>
        <div className="w-4 h-6 sm:w-[1.15rem] sm:h-[2rem] rounded-full border border-white/[0.25] flex justify-center pt-1 sm:pt-1.5">
          <div className="w-[2px] h-[5px] sm:h-[6px] rounded-full bg-white/[0.5] animate-bounce" />
        </div>
      </div>

    </section>
  )
}
