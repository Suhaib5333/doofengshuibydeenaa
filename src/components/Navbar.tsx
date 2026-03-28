import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import logo from '@/assets/logo.png'
import { useLanguage } from '@/i18n/LanguageContext'

/* ─── Inline SVG flags (from kaak-bsemsom) ─── */
const UKFlag = () => (
  <svg width={24} height={16} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '2px', flexShrink: 0, display: 'block' }}>
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
)

const BahrainFlag = () => (
  <svg width={24} height={16} viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '2px', flexShrink: 0, display: 'block' }}>
    <rect width="300" height="200" fill="#CE1126" />
    <path d="M0,0 H90 L65,20 L90,40 L65,60 L90,80 L65,100 L90,120 L65,140 L90,160 L65,180 L90,200 H0 Z" fill="#FFFFFF" />
  </svg>
)

export default function Navbar() {
  const { lang, t, toggleLanguage: toggleLang } = useLanguage()

  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  const navLinks = useMemo(() => [
    { label: t.nav.home,     href: '#home' },
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.courses,  href: '#courses' },
    { label: t.nav.events,   href: '#events' },
    { label: t.nav.blog,     href: '#blog' },
    { label: t.nav.contact,  href: '#contact' },
  ], [t])

  const headerRef  = useRef<HTMLElement>(null)
  const logoRef    = useRef<HTMLAnchorElement>(null)
  const linksRef   = useRef<(HTMLAnchorElement | null)[]>([])
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      for (const link of [...navLinks].reverse()) {
        const el = document.querySelector(link.href)
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(link.href)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1280) setMobileOpen(false) }
    const onKey    = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('resize',  onResize)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize',  onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo(logoRef.current,                  { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7,  ease: 'power3.out' })
    tl.fromTo(linksRef.current.filter(Boolean), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.055, ease: 'power3.out' }, '-=0.45')
    tl.fromTo(actionsRef.current,               { opacity: 0, x: 24  }, { opacity: 1, x: 0, duration: 0.7,  ease: 'power3.out' }, '-=0.35')
  }, [])

  const handleMobileLink = useCallback((href: string) => {
    setMobileOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 320)
  }, [])

  /* ─── shared color tokens ─── */
  const onDark  = !scrolled
  const textMid  = onDark ? 'rgba(255,255,255,0.82)' : '#6b7280'
  const textFull = onDark ? '#ffffff'                 : '#0f172a'

  return (
    <>
    <header
      ref={headerRef}
      role="banner"
      className="fixed top-0 inset-x-0 transition-all duration-500"
      style={{
        zIndex:       mobileOpen ? 60 : 50,
        background:   mobileOpen ? 'transparent' : (scrolled ? 'rgba(255,255,255,0.94)' : 'transparent'),
        backdropFilter: scrolled && !mobileOpen ? 'blur(24px) saturate(1.8)' : 'none',
        borderBottom: scrolled && !mobileOpen ? '1px solid rgba(0,0,0,0.07)' : 'none',
        boxShadow:    scrolled && !mobileOpen ? '0 2px 24px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* ── DESKTOP BAR ── */}
      <nav
        aria-label="Main navigation"
        className="hidden xl:grid w-full"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: scrolled ? '72px' : '92px',
          padding: '0 5vw',
          transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* ══ LOGO ══ */}
        <a
          ref={logoRef}
          href="#home"
          aria-label="DooFengShui — homepage"
          className="flex items-center gap-3.5 group"
          style={{ textDecoration: 'none', outline: 'none', alignSelf: 'center', justifySelf: 'start' }}
        >
          {/* Logo mark with circle ring */}
          <div
            style={{
              width:        scrolled ? 62 : 86,
              height:       scrolled ? 62 : 86,
              borderRadius: '50%',
              border:       `1.5px solid ${onDark ? 'rgba(255,255,255,0.14)' : 'rgba(22,134,175,0.15)'}`,
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              flexShrink:   0,
              transition:   'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              style={{
                height:     scrolled ? 50 : 74,
                width:      'auto',
                filter:     onDark
                  ? 'drop-shadow(0 0 10px rgba(156,191,27,0.2))'
                  : 'none',
                transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1), filter 0.4s',
              }}
            />
          </div>

          {/* Wordmark — always LTR */}
          <span
            dir="ltr"
            className="font-bold tracking-tight leading-none select-none"
            style={{
              fontSize:   scrolled ? '1.4rem' : '1.75rem',
              color:      onDark   ? '#ffffff' : '#0f172a',
              transition: 'font-size 0.4s, color 0.4s',
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #9CBF1B 0%, #36ABD9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Doo
            </span>
            FengShui
          </span>
        </a>

        {/* ══ NAV LINKS — dead center ══ */}
        <ul
          className="flex items-center"
          role="menubar"
          style={{ gap: '4px' }}
        >
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href
            return (
              <li key={link.href} role="none">
                <a
                  ref={el => { linksRef.current[i] = el }}
                  href={link.href}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  className="relative inline-flex items-center font-medium transition-all duration-250"
                  style={{
                    padding:       '10px 20px',
                    fontSize:      '15.5px',
                    letterSpacing: '0.01em',
                    borderRadius:  '10px',
                    color:         isActive ? textFull : textMid,
                    background:    isActive
                      ? onDark ? 'rgba(255,255,255,0.1)' : 'rgba(22,134,175,0.07)'
                      : 'transparent',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = textFull
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = onDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = textMid
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {link.label}

                  {/* Active underline */}
                  <span
                    style={{
                      position:   'absolute',
                      bottom:     '4px',
                      left:       '50%',
                      transform:  'translateX(-50%)',
                      height:     '2.5px',
                      borderRadius: '9999px',
                      background: 'linear-gradient(90deg, #9CBF1B, #36ABD9)',
                      width:      isActive ? '24px' : '0px',
                      opacity:    isActive ? 1 : 0,
                      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
                    }}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* ══ ACTIONS — right ══ */}
        <div
          ref={actionsRef}
          className="flex items-center justify-end"
          style={{ gap: '8px' }}
        >
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Arabic' : 'تغيير اللغة'}
            style={{
              display:     'flex',
              alignItems:  'center',
              gap:         '14px',
              background:  'transparent',
              border:      'none',
              cursor:      'pointer',
              outline:     'none',
            }}
          >
            <span style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase',
              fontWeight: lang === 'en' ? 600 : 500,
              color: lang === 'en'
                ? (onDark ? '#ffffff' : '#D9B95F')
                : (onDark ? 'rgba(255,255,255,0.5)' : '#9ca3af'),
              transition: 'color 0.25s',
            }}>
              <UKFlag />
              EN
            </span>
            <span style={{ display: 'inline-block', width: '1px', height: '16px', backgroundColor: onDark ? 'rgba(255,255,255,0.2)' : '#e5e7eb', flexShrink: 0 }} />
            <span style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px',
              fontWeight: lang === 'ar' ? 600 : 500,
              color: lang === 'ar'
                ? (onDark ? '#ffffff' : '#D9B95F')
                : (onDark ? 'rgba(255,255,255,0.5)' : '#9ca3af'),
              transition: 'color 0.25s',
            }}>
              <BahrainFlag />
              عربي
            </span>
          </button>

          {/* Separator */}
          <div
            style={{
              width:      '1px',
              height:     '28px',
              background: onDark ? 'rgba(255,255,255,0.14)' : '#e5e7eb',
              margin:     '0 2px',
              flexShrink: 0,
            }}
          />

          {/* Log in */}
          <a
            href="#"
            className="inline-flex items-center justify-center font-medium transition-all duration-250"
            style={{
              padding:      '10px 20px',
              fontSize:     '15px',
              borderRadius: '10px',
              color:        onDark ? 'rgba(255,255,255,0.72)' : '#374151',
              background:   'transparent',
              textDecoration: 'none',
              border:       scrolled
                ? '1.5px solid rgba(0,0,0,0.12)'
                : '1.5px solid rgba(255,255,255,0.22)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color      = onDark ? '#fff' : '#0f172a'
              el.style.background = onDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)'
              el.style.borderColor = onDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color      = onDark ? 'rgba(255,255,255,0.72)' : '#374151'
              el.style.background = 'transparent'
              el.style.borderColor = scrolled ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.22)'
            }}
          >
            {t.nav.login}
          </a>

          {/* Primary CTA */}
          <a
            href="#services"
            className="inline-flex items-center justify-center font-semibold transition-all duration-300"
            style={{
              padding:      '11px 26px',
              fontSize:     '15px',
              borderRadius: '10px',
              whiteSpace:   'nowrap',
              background:   scrolled
                ? 'linear-gradient(135deg, #9CBF1B 0%, #1686AF 100%)'
                : '#ffffff',
              color:        scrolled ? '#ffffff' : '#0f172a',
              border:       'none',
              textDecoration: 'none',
              boxShadow: scrolled
                ? '0 2px 14px rgba(22,134,175,0.32)'
                : '0 2px 18px rgba(0,0,0,0.18)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform  = 'translateY(-1px)'
              el.style.boxShadow  = scrolled
                ? '0 6px 22px rgba(22,134,175,0.42)'
                : '0 6px 26px rgba(0,0,0,0.24)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform  = 'translateY(0)'
              el.style.boxShadow  = scrolled
                ? '0 2px 14px rgba(22,134,175,0.32)'
                : '0 2px 18px rgba(0,0,0,0.18)'
            }}
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>

      {/* ── MOBILE BAR ── */}
      <nav
        aria-label="Main navigation"
        className="xl:hidden flex items-center justify-between w-full"
        style={{
          height:   scrolled ? '66px' : '78px',
          padding:  '0 20px',
          transition: 'height 0.4s',
        }}
      >
        {/* Mobile Logo */}
        <a
          href="#home"
          aria-label="DooFengShui — homepage"
          className="flex items-center gap-3"
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              width: 60, height: 60,
              borderRadius: '50%',
              border: `1.5px solid ${onDark ? 'rgba(255,255,255,0.14)' : 'rgba(22,134,175,0.15)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <img src={logo} alt="" aria-hidden="true" style={{ height: 50, width: 'auto', filter: onDark ? 'drop-shadow(0 0 10px rgba(156,191,27,0.2))' : 'none' }} />
          </div>
          <span
            dir="ltr"
            className="font-bold tracking-tight"
            style={{ fontSize: '1.25rem', color: onDark ? '#fff' : '#0f172a' }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #9CBF1B, #36ABD9)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Doo</span>FengShui
          </span>
        </a>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{
            width: 48, height: 48,
            borderRadius: '12px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '22px' }}>
              <span style={{ display: 'block', height: '2px', width: '22px', borderRadius: '9999px', background: scrolled ? '#374151' : '#ffffff' }} />
              <span style={{ display: 'block', height: '2px', width: '22px', borderRadius: '9999px', background: scrolled ? '#374151' : '#ffffff' }} />
              <span style={{ display: 'block', height: '2px', width: '14px', borderRadius: '9999px', background: scrolled ? '#374151' : '#ffffff' }} />
            </div>
          )}
        </button>
      </nav>
    </header>

    {/* ══════════════════════════════════════════════════════════════════
        FULL-SCREEN MOBILE MENU — lives OUTSIDE <header> to avoid
        stacking context issues from backdrop-filter / z-index
       ══════════════════════════════════════════════════════════════════ */}
    <div
      id="mobile-menu"
      role="menu"
      aria-label="Mobile navigation"
      onClick={e => { if (e.target === e.currentTarget) setMobileOpen(false) }}
      className="xl:hidden"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         55,
        background:     'rgba(10, 8, 6, 0.65)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        opacity:        mobileOpen ? 1 : 0,
        pointerEvents:  mobileOpen ? 'auto' : 'none',
        transition:     'opacity 0.4s cubic-bezier(0.4,0,0.2,1)',
        display:        'flex',
        flexDirection:  'column',
      }}
    >
        {/* Spacer for the mobile bar above (so links don't sit under it) */}
        <div style={{ height: scrolled ? 66 : 78, flexShrink: 0 }} />

        {/* Nav links — centered, large, staggered entrance */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '0 32px',
            position: 'relative',
          }}
          onClick={e => { if (e.target === e.currentTarget) setMobileOpen(false) }}
        >
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={e => { e.preventDefault(); handleMobileLink(link.href) }}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  gap:            '12px',
                  padding:        '14px 32px',
                  borderRadius:   '14px',
                  fontSize:       '22px',
                  fontWeight:     isActive ? 700 : 500,
                  letterSpacing:  '0.01em',
                  color:          isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  background:     isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                  textDecoration: 'none',
                  width:          '100%',
                  maxWidth:       '320px',
                  transition:     'all 0.3s ease',
                  transform:      mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity:        mobileOpen ? 1 : 0,
                  transitionDelay: mobileOpen ? `${i * 0.06}s` : '0s',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {isActive && (
                  <span style={{
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #9CBF1B, #36ABD9)',
                    boxShadow: '0 0 10px rgba(156,191,27,0.4)',
                    flexShrink: 0,
                  }} />
                )}
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Bottom section — language, login, CTA */}
        <div
          style={{
            padding:       '24px 28px 40px',
            display:       'flex',
            flexDirection: 'column',
            gap:           '14px',
            borderTop:     '1px solid rgba(255,255,255,0.06)',
            transform:     mobileOpen ? 'translateY(0)' : 'translateY(30px)',
            opacity:       mobileOpen ? 1 : 0,
            transition:    'all 0.5s cubic-bezier(0.4,0,0.2,1)',
            transitionDelay: mobileOpen ? '0.35s' : '0s',
          }}
        >
          {/* Language + Login row */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={toggleLang}
              style={{
                flex: 1, padding: '14px',
                fontSize: '14px', fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            >
              {lang === 'en' ? <BahrainFlag /> : <UKFlag />}
              {lang === 'en' ? 'عربي' : 'English'}
            </button>
            <a
              href="#"
              style={{
                flex: 1, padding: '14px',
                fontSize: '14px', fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
            >
              {t.nav.login}
            </a>
          </div>

          {/* Primary CTA */}
          <a
            href="#services"
            onClick={e => { e.preventDefault(); handleMobileLink('#services') }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px',
              fontSize: '16px', fontWeight: 700,
              color: '#fff',
              background: 'linear-gradient(135deg, #9CBF1B 0%, #1686AF 100%)',
              borderRadius: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(22,134,175,0.35)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(22,134,175,0.5)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(22,134,175,0.35)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </>
  )
}
