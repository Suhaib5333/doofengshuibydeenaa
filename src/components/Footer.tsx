import { useMemo } from 'react'
import logo from '@/assets/logo.png'
import deenaImg from '@/assets/deena.jpg'
import { useLanguage } from '@/i18n/LanguageContext'

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/doofengshui/',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/deena.alshamlan/',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@doofengshui',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/deena-al-shamlan-8a903427/',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Snapchat',
    href: 'https://www.snapchat.com/add/doofengshui',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://www.pinterest.com/doofengshui/',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { t } = useLanguage()

  const sitemapLinks = useMemo(() => [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.courses, href: '#courses' },
    { label: t.nav.events, href: '#events' },
    { label: t.nav.blog, href: '#blog' },
    { label: t.footer.shop, href: '#' },
    { label: t.nav.contact, href: '#contact' },
  ], [t])

  return (
    <footer id="contact" className="grain relative overflow-hidden" style={{ background: 'var(--color-sand-900)' }}>

      {/* ── Gradient transition bar ───────────────────────────────────── */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9, #D9B95F)' }} />

      {/* ── Background layers ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }}
      />
      <div className="absolute top-0 right-0 w-[22rem] h-[22rem] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,134,175,0.12) 0%, transparent 70%)', transform: 'translate(20%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[18rem] h-[18rem] rounded-full blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(156,191,27,0.08) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

      {/* ── Logo watermark ────────────────────────────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.02 }}>
        <img src={logo} alt="" aria-hidden="true" className="w-[24rem] h-[24rem] object-contain" />
      </div>

      {/* ── Container ─────────────────────────────────────────────────── */}
      <div className="relative z-[2]" style={{ width: 'min(92%, 72rem)', margin: '0 auto', padding: 'clamp(3.5rem, 7vw, 5.5rem) 0 clamp(1.5rem, 3vw, 2rem)' }}>

        {/* ═══ Top section — Brand + Deena + Newsletter CTA ═══════════ */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr] items-start"
          style={{ gap: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >

          {/* ── Brand column ──────────────────────────────────────────── */}
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5 group" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)', textDecoration: 'none' }}>
              <img src={logo} alt="DooFengShui" className="object-contain" style={{ height: 'clamp(2rem, 4vw, 2.5rem)' }} />
              <span dir="ltr" className="text-base sm:text-lg font-semibold tracking-tight text-white">
                <span className="text-gradient">Doo</span>FengShui
              </span>
            </a>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '20rem', marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
              {t.footer.brandDesc}
            </p>

            {/* Social links */}
            <div className="flex items-center" style={{ gap: 'clamp(0.4rem, 1vw, 0.6rem)' }}>
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center rounded-lg transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                  style={{ width: 'clamp(2.25rem, 4vw, 2.5rem)', height: 'clamp(2.25rem, 4vw, 2.5rem)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(22,134,175,0.15)'
                    e.currentTarget.style.borderColor = 'rgba(22,134,175,0.3)'
                    e.currentTarget.style.color = 'rgba(54,171,217,0.9)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Center — Deena card + quick CTA ───────────────────────── */}
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #9CBF1B, #36ABD9, #D9B95F)' }} />
            <div className="flex items-center" style={{ padding: 'clamp(1rem, 2vw, 1.25rem)', gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
              <img
                src={deenaImg}
                alt="Deena Al-Shamlan"
                className="rounded-lg sm:rounded-xl object-cover shrink-0"
                style={{ width: 'clamp(3.5rem, 7vw, 5rem)', height: 'clamp(3.5rem, 7vw, 5rem)', objectPosition: 'center 20%', border: '2px solid rgba(217,185,95,0.2)' }}
              />
              <div>
                <p className="text-sm sm:text-base font-bold text-white leading-tight">{t.footer.onlineCourses}</p>
                <p className="text-[10px] sm:text-xs leading-relaxed mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {t.footer.coursesDesc}
                </p>
                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 font-semibold transition-all duration-300 group"
                  style={{ color: 'var(--color-accent-green)', fontSize: 'clamp(10px, 1.5vw, 13px)', textDecoration: 'none', marginTop: '0.4rem' }}
                >
                  {t.footer.registerNow}
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right — Navigation + Contact ──────────────────────────── */}
          <div className="grid grid-cols-2 items-start" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {/* Site Map */}
            <div>
              <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                {t.footer.siteMap}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.8vw, 0.6rem)' }}>
                {sitemapLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm transition-colors duration-200 hover:text-white focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                      style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                {t.footer.contactInfo}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.2vw, 0.9rem)' }}>
                <li>
                  <a
                    href="https://wa.me/97332232039"
                    className="flex items-center transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                    style={{ gap: '0.5rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: 'clamp(11px, 1.3vw, 13px)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent-green)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span dir="ltr">+973 3223 2039</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Doofengshui@gmail.com"
                    className="flex items-center transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                    style={{ gap: '0.5rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: 'clamp(10px, 1.2vw, 13px)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent-green)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span dir="ltr">Doofengshui@gmail.com</span>
                  </a>
                </li>
                <li>
                  <span className="flex items-center" style={{ gap: '0.5rem', color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(10px, 1.2vw, 13px)' }}>
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Bahrain
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ═══ Bottom bar ═════════════════════════════════════════════ */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{ paddingTop: 'clamp(1.25rem, 2.5vw, 1.75rem)', borderTop: '1px solid rgba(255,255,255,0.06)', gap: '0.75rem' }}
        >
          <p className="text-[10px] sm:text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center" style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
            <a href="#" className="text-[10px] sm:text-xs transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] sm:text-xs transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }} onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
