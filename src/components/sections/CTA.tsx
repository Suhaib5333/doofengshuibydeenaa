import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/i18n/LanguageContext'
import deenaImg from '@/assets/deena.jpg'
import logo from '@/assets/logo.png'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CTA() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const trustRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(imageRef.current, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })

    const items = contentRef.current?.querySelectorAll('.reveal')
    if (items?.length) {
      gsap.fromTo(items, { opacity: 0, y: 22 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 78%' },
      })
    }

    gsap.fromTo(trustRef.current, { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: trustRef.current, start: 'top 92%' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden"
      style={{ background: 'var(--color-sand-900)' }}
    >
      {/* ── Gradient transition bar from light section above ──────────── */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9, #D9B95F)' }} />

      {/* ── Background layers ─────────────────────────────────────────── */}
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }}
      />

      {/* Ambient orbs */}
      <div className="absolute top-0 left-0 w-[24rem] h-[24rem] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,134,175,0.18) 0%, transparent 70%)', transform: 'translate(-25%, -25%)' }} />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(156,191,27,0.12) 0%, transparent 70%)', transform: 'translate(20%, 20%)' }} />
      <div className="absolute top-1/2 right-1/4 w-[22rem] h-[22rem] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,185,95,0.06) 0%, transparent 60%)' }} />

      {/* Large faded logo watermark for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.03 }}>
        <img src={logo} alt="" aria-hidden="true" className="w-[28rem] h-[28rem] object-contain" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-[2]" style={{ width: 'min(92%, 72rem)', margin: '0 auto', padding: 'clamp(4rem, 8vw, 7rem) 0' }}>

        {/* ═══ Split layout — Deena left, CTA right ═══════════════════ */}
        <div
          className="grid lg:grid-cols-[0.85fr_1fr] items-center"
          style={{ gap: 'clamp(2rem, 5vw, 4.5rem)', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}
        >

          {/* ── LEFT: Deena's portrait ────────────────────────────────── */}
          <div ref={imageRef} className="relative flex justify-center">
            {/* Decorative gradient accent bar — between the two columns */}
            <div
              className="absolute top-6 bottom-6 w-[3px] rounded-full hidden lg:block"
              style={{ right: '-1.25rem', background: 'linear-gradient(to bottom, #9CBF1B, #36ABD9, #D9B95F)' }}
            />

            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl" style={{ maxWidth: 'clamp(16rem, 32vw, 24rem)', border: '3px solid rgba(217,185,95,0.2)' }}>
              <img
                src={deenaImg}
                alt="Deena Al-Shamlan — Feng Shui Consultant"
                className="w-full object-cover"
                style={{ height: 'clamp(18rem, 38vw, 30rem)', objectPosition: 'center 20%' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,26,21,0.9) 0%, rgba(31,26,21,0.2) 50%, transparent 100%)' }} />

              {/* Name overlay */}
              <div className="absolute bottom-0 inset-x-0" style={{ padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.25rem, 3vw, 2rem)' }}>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight tracking-tight">
                  {t.shared.deenaName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 sm:w-8 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9)' }} />
                  <p className="text-[9px] sm:text-[11px] tracking-[0.12em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {t.cta.guideToHarmony}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: CTA content ────────────────────────────────────── */}
          <div ref={contentRef} className="flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Badge */}
            <div
              className="reveal inline-flex items-center gap-2 rounded-full"
              style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={{ color: 'var(--color-accent-green)' }}>
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-[10px] sm:text-xs font-medium tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.cta.badge}</span>
            </div>

            {/* Heading */}
            <h2 className="reveal text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15]" style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
              {t.cta.title}{' '}
              <span className="text-gradient">{t.cta.titleHighlight}</span>
            </h2>

            {/* Decorative divider */}
            <div className="reveal flex items-center gap-2" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <div className="h-[2px] w-8 sm:w-10" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D9B95F' }} />
            </div>

            {/* Subtitle */}
            <p className="reveal text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '30rem', marginBottom: 'clamp(2rem, 4vw, 2.75rem)' }}>
              {t.cta.subtitle}
            </p>

            {/* Buttons — white solid + ghost, matching hero/navbar */}
            <div className="reveal flex flex-col sm:flex-row items-stretch sm:items-center" style={{ gap: 'clamp(0.6rem, 1.2vw, 0.75rem)', marginBottom: 'clamp(2rem, 3.5vw, 2.5rem)' }}>
              <a
                href="#"
                className="inline-flex items-center justify-center font-semibold transition-all duration-300 hover:-translate-y-px active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                style={{
                  padding: '12px 28px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  background: '#ffffff',
                  color: '#0f172a',
                  textDecoration: 'none',
                  boxShadow: '0 2px 18px rgba(0,0,0,0.18)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = '0 2px 18px rgba(0,0,0,0.18)'
                }}
              >
                {t.cta.primary}
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center font-medium transition-all duration-300 hover:-translate-y-px active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                style={{
                  padding: '11px 26px',
                  fontSize: '14px',
                  borderRadius: '10px',
                  color: 'rgba(255,255,255,0.75)',
                  background: 'transparent',
                  textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                {t.cta.secondary}
              </a>
            </div>

            {/* Quick stats */}
            <div className="reveal flex items-center" style={{ gap: 'clamp(1rem, 2.5vw, 2rem)' }}>
              {[
                { value: '14', label: t.cta.consultationsLabel },
                { value: '500+', label: t.cta.happyClients },
                { value: '4.9', label: t.cta.ratingLabel },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center" style={{ gap: 'clamp(1rem, 2.5vw, 2rem)' }}>
                  {i > 0 && (
                    <div className="h-8 w-px shrink-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)' }} />
                  )}
                  <div className="text-center lg:text-left">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gradient leading-none">{stat.value}</p>
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Trust bar — glass morphism strip ═══════════════════════ */}
        <div
          ref={trustRef}
          className="flex flex-col sm:flex-row items-center justify-center rounded-xl sm:rounded-2xl"
          style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)', padding: 'clamp(1rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 2.5rem)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            {
              icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
              text: t.cta.trust1,
            },
            {
              icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
              text: t.cta.trust2,
            },
            {
              icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
              text: t.cta.trust3,
            },
          ].map((item, i) => (
            <div key={item.text} className="flex items-center" style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
              {i > 0 && (
                <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
              )}
              <span className="flex items-center text-[10px] sm:text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)', gap: '0.4rem' }}>
                {item.icon}
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
