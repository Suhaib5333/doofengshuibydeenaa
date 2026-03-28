import { type ReactNode, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import livingRoomImg from '@/assets/living-room.jpg'
import bedroomImg from '@/assets/bedroom.jpg'
import loungeImg from '@/assets/lounge.jpg'
import plantImg from '@/assets/plant.jpg'
import logo from '@/assets/logo.png'
import { useLanguage } from '@/i18n/LanguageContext'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Service {
  title: string
  description: string
  image: string
  icon: ReactNode
  count: string
}

export default function Services() {
  const { t } = useLanguage()

  const services: Service[] = useMemo(() => [
    {
      title: t.services.homeTitle,
      description: t.services.homeDesc,
      image: livingRoomImg,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      count: '5 Options',
    },
    {
      title: t.services.officeTitle,
      description: t.services.officeDesc,
      image: loungeImg,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
      count: '3 Options',
    },
    {
      title: t.services.personalTitle,
      description: t.services.personalDesc,
      image: bedroomImg,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      ),
      count: '4 Options',
    },
  ], [t])

  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })

    const cards = cardsRef.current?.querySelectorAll('.svc-card')
    if (cards?.length) {
      gsap.fromTo(cards, { opacity: 0, y: 45 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
      })
    }

    gsap.fromTo(ctaRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="grain relative overflow-hidden"
      style={{ background: 'var(--color-sand-900)' }}
    >
      {/* ── Gradient transition bar ───────────────────────────────────── */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9, #D9B95F)' }} />

      {/* ── Background dot grid (white on dark) ───────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }}
      />

      {/* ── Ambient orbs ──────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-[26rem] h-[26rem] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,134,175,0.18) 0%, transparent 70%)', transform: 'translate(-20%, -20%)' }} />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(156,191,27,0.12) 0%, transparent 70%)', transform: 'translate(15%, 20%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,185,95,0.06) 0%, transparent 60%)' }} />

      {/* ── Logo watermark ────────────────────────────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.03 }}>
        <img src={logo} alt="" aria-hidden="true" className="w-[28rem] h-[28rem] object-contain" />
      </div>

      {/* ── Container ─────────────────────────────────────────────────── */}
      <div className="relative z-[2]" style={{ width: 'min(92%, 72rem)', margin: '0 auto', padding: 'clamp(5rem, 10vw, 9rem) 0' }}>

        {/* ═══ Header — with plant image backdrop ═════════════════════ */}
        <div
          ref={headingRef}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
        >
          {/* Background image */}
          <img
            src={plantImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(31,26,21,0.82) 0%, rgba(31,26,21,0.72) 50%, rgba(31,26,21,0.85) 100%)' }} />
          {/* Radial vignette */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(31,26,21,0.3) 100%)' }} />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center" style={{ padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)' }}>
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: 'var(--color-accent-green)', marginBottom: '0.6rem' }}>
              {t.services.tagline}
            </span>
            <h2 id="services-heading" className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white" style={{ marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)' }}>
              {t.services.title} <span className="text-gradient">{t.services.titleHighlight}</span>
            </h2>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <div className="h-[2px] w-8 sm:w-10" style={{ background: 'linear-gradient(90deg, transparent, #36ABD9)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D9B95F' }} />
              <div className="h-[2px] w-8 sm:w-10" style={{ background: 'linear-gradient(90deg, #9CBF1B, transparent)' }} />
            </div>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 'min(90%, 36rem)' }}>
              {t.services.subtitle}
            </p>
          </div>
        </div>

        {/* ═══ Service Cards ═══════════════════════════════════════════ */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3"
          style={{ gap: 'clamp(1rem, 2.5vw, 2rem)', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}
        >
          {services.map((service) => (
            <a
              key={service.title}
              href="#services"
              className="svc-card group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{ borderColor: 'var(--color-sand-100)', textDecoration: 'none', display: 'block' }}
            >
              {/* Accent bar at top — brand gradient */}
              <div
                className="absolute top-0 inset-x-0 h-[2px] z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9)' }}
              />

              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 'clamp(10rem, 22vw, 16rem)' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,26,21,0.5) 0%, rgba(31,26,21,0.1) 40%, transparent 100%)' }} />

                {/* Count badge — frosted glass (matches 4000+ badge style) */}
                <div
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-lg sm:rounded-xl overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  <div className="px-2.5 py-1 sm:px-3 sm:py-1.5">
                    <span className="text-[10px] sm:text-xs text-white font-semibold">{service.count}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(1rem, 2.5vw, 1.75rem)' }}>
                <div className="flex items-center mb-2.5 sm:mb-3" style={{ gap: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                  {/* Icon chip */}
                  <div
                    className="shrink-0 flex items-center justify-center rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      width: 'clamp(2rem, 4vw, 2.75rem)',
                      height: 'clamp(2rem, 4vw, 2.75rem)',
                      color: 'var(--color-primary)',
                      background: 'rgba(22,134,175,0.08)',
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold" style={{ color: 'var(--color-sand-900)' }}>
                    {service.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-sand-500)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                  {service.description}
                </p>

                {/* Learn More link */}
                <div className="flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300" style={{ color: 'var(--color-primary)' }}>
                  <span className="text-xs sm:text-sm font-semibold">{t.services.learnMore}</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ═══ CTA — matches navbar gradient button ═══════════════════ */}
        <div ref={ctaRef} className="flex justify-center">
          <a
            href="#contact"
            className="group relative flex sm:inline-flex items-center justify-center font-semibold overflow-hidden transition-all duration-300 hover:-translate-y-px active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style={{
              padding:        '13px 28px',
              fontSize:       '14px',
              borderRadius:   '10px',
              background:     'linear-gradient(135deg, #9CBF1B 0%, #1686AF 100%)',
              color:          '#ffffff',
              textDecoration: 'none',
              boxShadow:      '0 2px 16px rgba(22,134,175,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(22,134,175,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 16px rgba(22,134,175,0.3)'
            }}
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              {t.services.viewAll}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
