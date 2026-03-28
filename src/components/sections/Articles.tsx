import { useRef, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '@/i18n/LanguageContext'
import plantImg from '@/assets/plant.jpg'
import bedroomImg from '@/assets/bedroom.jpg'
import livingRoomImg from '@/assets/living-room.jpg'
import loungeImg from '@/assets/lounge.jpg'
import deenaImg from '@/assets/deena.jpg'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Articles() {
  const { t } = useLanguage()

  const articles = useMemo(() => [
    {
      title: t.articles.article1Title,
      excerpt: t.articles.article1Excerpt,
      image: livingRoomImg,
      date: 'Apr 2025',
      readTime: `5 ${t.articles.readTime}`,
      tag: 'Fundamentals',
      tagColor: '#1686AF',
    },
    {
      title: t.articles.article2Title,
      excerpt: t.articles.article2Excerpt,
      image: plantImg,
      date: 'May 2025',
      readTime: `4 ${t.articles.readTime}`,
      tag: 'Elements',
      tagColor: '#9CBF1B',
    },
    {
      title: t.articles.article3Title,
      excerpt: t.articles.article3Excerpt,
      image: bedroomImg,
      date: 'May 2025',
      readTime: `3 ${t.articles.readTime}`,
      tag: 'Tips',
      tagColor: '#D9B95F',
    },
  ], [t])
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })

    const cards = cardsRef.current?.querySelectorAll('.article-card')
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
      id="blog"
      aria-labelledby="blog-heading"
      className="grain relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-sand-100) 0%, var(--color-sand-50) 40%, #ffffff 100%)' }}
    >
      {/* ── Background texture ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, var(--color-sand-400) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* ── Ambient orbs ──────────────────────────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full blur-[130px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,134,175,0.06) 0%, transparent 70%)', transform: 'translate(-50%, -30%)' }} />
      <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(156,191,27,0.05) 0%, transparent 70%)', transform: 'translate(15%, 20%)' }} />
      <div className="absolute top-1/2 left-0 w-[20rem] h-[20rem] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,185,95,0.04) 0%, transparent 60%)', transform: 'translate(-30%, -50%)' }} />

      {/* ── Container ─────────────────────────────────────────────────── */}
      <div className="relative z-[2]" style={{ width: 'min(92%, 72rem)', margin: '0 auto', padding: 'clamp(5rem, 10vw, 9rem) 0' }}>

        {/* ═══ Header — image backdrop banner ═════════════════════════ */}
        <div
          ref={headingRef}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
        >
          {/* Background image */}
          <img
            src={loungeImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 75%' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(31,26,21,0.82) 0%, rgba(31,26,21,0.7) 50%, rgba(31,26,21,0.85) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(31,26,21,0.3) 100%)' }} />

          {/* Content — centered */}
          <div
            className="relative z-10 flex flex-col items-center text-center"
            style={{ padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)' }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: 'var(--color-accent-green)', marginBottom: '0.6rem' }}>
              {t.articles.tagline}
            </span>
            <h2 id="blog-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white" style={{ marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)' }}>
              {t.articles.title} <span className="text-gradient">{t.articles.titleHighlight}</span>
            </h2>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <div className="h-[2px] w-8 sm:w-10" style={{ background: 'linear-gradient(90deg, transparent, #36ABD9)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D9B95F' }} />
              <div className="h-[2px] w-8 sm:w-10" style={{ background: 'linear-gradient(90deg, #9CBF1B, transparent)' }} />
            </div>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 'min(90%, 32rem)' }}>
              {t.articles.subtitle}
            </p>
          </div>
        </div>

        {/* ═══ Article Cards ═══════════════════════════════════════════ */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3"
          style={{ gap: 'clamp(1rem, 2.5vw, 2rem)', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}
        >
          {articles.map((article) => (
            <a
              key={article.title}
              href="#blog"
              className="article-card group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              style={{ borderColor: 'var(--color-sand-100)', textDecoration: 'none', display: 'block' }}
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 inset-x-0 h-[2px] z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9)' }}
              />

              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 'clamp(9rem, 20vw, 14rem)' }}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(31,26,21,0.35) 0%, transparent 50%)' }} />

                {/* Tag badge — solid color pill */}
                <div
                  className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 rounded-full"
                  style={{ padding: '5px 14px', background: article.tagColor, boxShadow: `0 2px 10px ${article.tagColor}55` }}
                >
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase text-white">{article.tag}</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(0.9rem, 2.5vw, 1.5rem)' }}>
                <h3
                  className="text-sm sm:text-base lg:text-lg font-bold leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2"
                  style={{ color: 'var(--color-sand-900)', marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}
                >
                  {article.title}
                </h3>
                <p
                  className="text-xs sm:text-sm leading-relaxed line-clamp-3"
                  style={{ color: 'var(--color-sand-500)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
                >
                  {article.excerpt}
                </p>

                {/* Meta — author with Deena's photo + date */}
                <div className="flex items-center justify-between" style={{ paddingTop: 'clamp(0.6rem, 1.2vw, 1rem)', borderTop: '1px solid var(--color-sand-100)' }}>
                  <div className="flex items-center" style={{ gap: 'clamp(0.4rem, 0.8vw, 0.5rem)' }}>
                    {/* Deena's tiny portrait instead of D initial */}
                    <img
                      src={deenaImg}
                      alt="Deena Al-Shamlan"
                      className="rounded-full object-cover shrink-0"
                      style={{ width: 'clamp(1.5rem, 3vw, 1.75rem)', height: 'clamp(1.5rem, 3vw, 1.75rem)', objectPosition: 'center 20%', border: '1.5px solid var(--color-sand-100)' }}
                    />
                    <span className="text-[10px] sm:text-xs font-medium" style={{ color: 'var(--color-sand-600)' }}>{t.shared.author}</span>
                  </div>
                  <div className="flex items-center text-[9px] sm:text-[11px]" style={{ color: 'var(--color-sand-400)', gap: 'clamp(0.3rem, 0.6vw, 0.5rem)' }}>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ═══ CTA ═════════════════════════════════════════════════════ */}
        <div ref={ctaRef} className="flex justify-center">
          <a
            href="#blog"
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
            <div className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out skew-x-[-15deg] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              {t.articles.viewAll}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
