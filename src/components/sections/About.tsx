import { type ReactNode, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import deenaImg from '@/assets/deena.jpg'
import livingRoomImg from '@/assets/living-room.jpg'
import { useLanguage } from '@/i18n/LanguageContext'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ELEMENT_ICONS: Record<string, ReactNode> = {
  Wood: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c0-4-3-6-3-10a3 3 0 016 0c0 4-3 6-3 10z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14c-2-1-4-.5-5 1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 14c2-1 4-.5 5 1" />
    </svg>
  ),
  Fire: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c-4 0-7-3-7-7 0-3 2-5 4-8l3-4 3 4c2 3 4 5 4 8 0 4-3 7-7 7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c-1.5 0-3-1.5-3-3.5 0-1.5 1-2.5 2-4l1-1.5 1 1.5c1 1.5 2 2.5 2 4 0 2-1.5 3.5-3 3.5z" />
    </svg>
  ),
  Earth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 20l4-6 3 3 4-5 3 4 6-8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 20h20" />
    </svg>
  ),
  Metal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7l3-7z" />
    </svg>
  ),
  Water: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c-4.4 0-8-3.1-8-7 0-4 5.3-10.4 7.2-12.6a1 1 0 011.6 0C14.7 4.6 20 11 20 15c0 3.9-3.6 7-8 7z" />
    </svg>
  ),
}

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imagesRef   = useRef<HTMLDivElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement>(null)

  const { t } = useLanguage()

  const elements = useMemo(() => [
    { name: t.about.wood,  desc: t.about.woodDesc,  color: '#9CBF1B', key: 'Wood' },
    { name: t.about.fire,  desc: t.about.fireDesc,  color: '#D9B95F', key: 'Fire' },
    { name: t.about.earth, desc: t.about.earthDesc, color: '#1686AF', key: 'Earth' },
    { name: t.about.metal, desc: t.about.metalDesc, color: '#36ABD9', key: 'Metal' },
    { name: t.about.water, desc: t.about.waterDesc, color: '#0057A9', key: 'Water' },
  ], [t])

  useGSAP(() => {
    gsap.fromTo(imagesRef.current, { opacity: 0, y: 45 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: imagesRef.current, start: 'top 82%' },
    })

    const items = textRef.current?.querySelectorAll('.reveal')
    if (items?.length) {
      gsap.fromTo(items, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
      })
    }

    const cards = elementsRef.current?.querySelectorAll('.el-card')
    if (cards?.length) {
      gsap.fromTo(cards, { opacity: 0, y: 22, scale: 0.92 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: elementsRef.current, start: 'top 88%' },
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="grain relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-sand-50) 0%, #f0ece4 50%, var(--color-sand-50) 100%)' }}
    >
      {/* ── Background pattern — subtle dot grid for texture ──────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, var(--color-sand-400) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* ── Ambient light orbs (matches hero's visual language) ────────── */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(156,191,27,0.08) 0%, transparent 70%)', transform: 'translate(20%, -25%)' }} />
      <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,134,175,0.06) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full blur-[140px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,185,95,0.04) 0%, transparent 60%)' }} />

      {/* ── Container ─────────────────────────────────────────────────── */}
      <div className="relative z-[2]" style={{ width: 'min(92%, 72rem)', margin: '0 auto', padding: 'clamp(5rem, 10vw, 9rem) 0' }}>

        {/* ═══ Editorial Two-Column ════════════════════════════════════ */}
        <div
          className="grid lg:grid-cols-[1.1fr_1fr] items-center"
          style={{ gap: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: 'clamp(4.5rem, 8vw, 7rem)' }}
        >

          {/* ── LEFT: Image Composition with decorative framing ──────── */}
          <div ref={imagesRef} className="relative" style={{ marginBottom: 'clamp(3.5rem, 5vw, 3rem)' }}>

            {/* Decorative offset shadow behind main image — premium frame */}
            <div
              className="absolute top-3 left-3 right-[-3px] bottom-[-3px] rounded-2xl sm:rounded-3xl hidden sm:block"
              style={{ background: 'linear-gradient(135deg, rgba(156,191,27,0.12), rgba(54,171,217,0.12))' }}
            />

            {/* Gradient accent bar */}
            <div
              className="absolute top-10 bottom-10 w-[3px] rounded-full hidden lg:block"
              style={{ left: '-1.25rem', background: 'linear-gradient(to bottom, #9CBF1B, #36ABD9, #D9B95F)' }}
            />

            {/* Living room image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <img
                src={livingRoomImg}
                alt="A harmonious living space designed with Feng Shui principles"
                className="w-full object-cover"
                style={{ height: 'clamp(16rem, 40vw, 30rem)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,26,21,0.3) 0%, transparent 40%), linear-gradient(to right, rgba(31,26,21,0.1) 0%, transparent 30%)' }} />

              {/* 4,000+ floating badge — compact on mobile, full on sm+ */}
              <div
                className="absolute top-3 right-3 sm:top-5 sm:right-5 rounded-lg sm:rounded-2xl overflow-hidden shadow-xl"
                style={{ maxWidth: 'clamp(130px, 35vw, 190px)', background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)' }}
              >
                <div className="h-[2px] sm:h-[2.5px]" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9)' }} />
                <div className="p-2 sm:p-4 flex items-start gap-1.5 sm:gap-2.5">
                  <div className="shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-md sm:rounded-lg flex items-center justify-center" style={{ background: 'rgba(22,134,175,0.08)' }}>
                    <svg className="w-3.5 h-3.5 sm:w-[1.1rem] sm:h-[1.1rem]" fill="none" viewBox="0 0 24 24" stroke="#1686AF" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm sm:text-xl font-bold leading-none" style={{ color: 'var(--color-sand-900)' }}>{t.about.yearsValue}</p>
                    <p className="text-[7px] sm:text-[10px] mt-0.5 sm:mt-1 leading-snug font-medium" style={{ color: 'var(--color-sand-500)' }}>{t.about.yearsLabel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deena portrait — overlapping corner
                 All sizes: absolute positioned inside the living room image
                 Mobile: bottom-left corner
                 lg+: bottom-right corner */}
            <div className="
              absolute bottom-[-2.5rem] left-3 w-[48%]
              sm:bottom-[-2.75rem] sm:left-4 sm:w-[42%]
              lg:bottom-[-2.5rem] lg:left-auto lg:-right-6 lg:w-[48%]
            ">
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '3px solid rgba(217,185,95,0.25)' }}
              >
                <img
                  src={deenaImg}
                  alt="Deena Al-Shamlan"
                  className="w-full object-cover"
                  style={{ height: 'clamp(12rem, 26vw, 21rem)', objectPosition: 'center 25%' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,26,21,0.92) 0%, rgba(31,26,21,0.35) 45%, transparent 100%)' }} />

                <div
                  className="absolute bottom-0 inset-x-0"
                  style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 2rem)' }}
                >
                  <p className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-tight tracking-tight">
                    {t.shared.deenaName}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                    <div className="w-4 sm:w-8 h-[2px] rounded-full shrink-0" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9)' }} />
                    <p className="text-[8px] sm:text-[11px] text-white/75 tracking-[0.1em] sm:tracking-[0.12em] uppercase font-medium">
                      {t.about.consultant}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Editorial content column ──────────────────────── */}
          <div ref={textRef} className="flex flex-col lg:py-4">

            {/* Tagline */}
            <span className="reveal inline-block text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: 'var(--color-primary)', marginBottom: '0.6rem' }}>
              {t.about.tagline}
            </span>

            {/* Heading */}
            <h2 className="reveal text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.15]" style={{ color: 'var(--color-sand-900)', marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              {t.about.title + ' '}<span className="text-gradient">{t.about.titleHighlight}</span>{t.about.titleEnd}
            </h2>

            {/* Decorative divider below heading */}
            <div className="reveal flex items-center gap-2" style={{ marginBottom: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              <div className="h-[2px] w-10" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D9B95F' }} />
            </div>

            {/* Lead paragraph — slightly larger for editorial hierarchy */}
            <p className="reveal text-[0.9rem] sm:text-base lg:text-[1.12rem] leading-[1.75]" style={{ color: 'var(--color-sand-700)', marginBottom: 'clamp(0.9rem, 2vw, 1.3rem)' }}>
              {t.about.p1} <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{t.about.p1Highlight}</span>.
            </p>

            <p className="reveal text-sm sm:text-[0.95rem] lg:text-base leading-[1.75]" style={{ color: 'var(--color-sand-600)', marginBottom: 'clamp(0.9rem, 2vw, 1.3rem)' }}>
              {t.about.p2}
            </p>

            <p className="reveal text-sm sm:text-[0.95rem] lg:text-base leading-[1.75]" style={{ color: 'var(--color-sand-600)', marginBottom: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
              {t.about.p3}
            </p>

            {/* Pull quote — editorial style with large decorative mark */}
            <div className="reveal relative" style={{ marginBottom: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
              {/* Large decorative quote mark */}
              <span
                className="absolute text-gradient select-none pointer-events-none"
                style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1, top: '-0.3em', left: '-0.1em', opacity: 0.15, fontFamily: 'Georgia, serif' }}
              >
                &ldquo;
              </span>
              <blockquote className="relative" style={{ borderLeft: '3px solid var(--color-accent-gold)', paddingLeft: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
                <p className="text-sm sm:text-base lg:text-[1.08rem] italic leading-relaxed" style={{ color: 'var(--color-sand-700)' }}>
                  {t.about.quote}
                </p>
                <cite className="block mt-2 text-[10px] sm:text-xs not-italic tracking-[0.15em] uppercase font-medium" style={{ color: 'var(--color-accent-gold)' }}>
                  {t.about.quoteAuthor}
                </cite>
              </blockquote>
            </div>

            {/* CTA — gradient with shimmer sweep (matches hero pattern) */}
            <div className="reveal">
              <a
                href="#services"
                className="group relative flex sm:inline-flex items-center justify-center font-semibold overflow-hidden transition-all duration-300 hover:-translate-y-px active:scale-[0.97]"
                style={{
                  padding:      '13px 28px',
                  fontSize:     '14px',
                  borderRadius: '10px',
                  background:   'linear-gradient(135deg, #9CBF1B 0%, #1686AF 100%)',
                  color:        '#ffffff',
                  textDecoration: 'none',
                  boxShadow:    '0 2px 16px rgba(22,134,175,0.3)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(22,134,175,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(22,134,175,0.3)'
                }}
              >
                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent pointer-events-none" />
                <span className="relative z-10">{t.about.cta}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══ Five Elements ════════════════════════════════════════════ */}
        <div ref={elementsRef} className="flex flex-col items-center">

          {/* Title with decorative lines */}
          <div className="flex items-center gap-3 sm:gap-4" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <div className="h-px w-10 sm:w-16" style={{ background: 'linear-gradient(to right, transparent, var(--color-sand-300))' }} />
            <h3 className="text-sm sm:text-base lg:text-lg font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase" style={{ color: 'var(--color-sand-800)' }}>
              {t.about.elementsTitle + ' '}<span className="text-gradient">{t.about.elementsTitleHighlight}</span>
            </h3>
            <div className="h-px w-10 sm:w-16" style={{ background: 'linear-gradient(to left, transparent, var(--color-sand-300))' }} />
          </div>

          {/* Element cards */}
          <div className="grid grid-cols-5 w-full" style={{ gap: 'clamp(0.4rem, 1.3vw, 1.25rem)', maxWidth: 'min(100%, 50rem)' }}>
            {elements.map((el) => (
              <div
                key={el.key}
                className="el-card group relative flex flex-col items-center text-center rounded-lg sm:rounded-xl lg:rounded-2xl bg-white border overflow-hidden transition-all duration-400 hover:shadow-xl hover:-translate-y-1.5 cursor-default"
                style={{
                  borderColor: 'var(--color-sand-100)',
                  padding: 'clamp(0.7rem, 2vw, 1.5rem) clamp(0.25rem, 1vw, 0.75rem)',
                }}
              >
                {/* Colored accent bar at top */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: el.color }}
                />
                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    width:  'clamp(2.2rem, 4.5vw, 3.25rem)',
                    height: 'clamp(2.2rem, 4.5vw, 3.25rem)',
                    color: el.color,
                    background: `${el.color}10`,
                    marginBottom: 'clamp(0.35rem, 0.9vw, 0.65rem)',
                  }}
                >
                  {ELEMENT_ICONS[el.key]}
                </div>
                <span className="text-[9px] sm:text-[11px] lg:text-xs font-bold" style={{ color: 'var(--color-sand-800)' }}>
                  {el.name}
                </span>
                <span className="hidden sm:block text-[8px] lg:text-[9.5px] mt-0.5 leading-snug font-medium" style={{ color: 'var(--color-sand-400)' }}>
                  {el.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
