import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import logo from '@/assets/logo.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Courses', href: '#courses' },
  { label: 'Events', href: '#events' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const logoRef = useRef<HTMLImageElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    )
    tl.fromTo(
      linksRef.current.filter(Boolean),
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
      '-=0.3'
    )
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.2'
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-black/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <img
            ref={logoRef}
            src={logo}
            alt="DooFengShui"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-sand-900' : 'text-white'
          }`}>
            <span className="text-gradient">Doo</span>FengShui
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => { linksRef.current[i] = el }}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${
                scrolled
                  ? 'text-sand-600 hover:text-primary hover:bg-primary/5'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-accent-green to-primary-light rounded-full transition-all duration-300 group-hover:w-3/5" />
            </a>
          ))}
        </div>

        {/* CTA + Language */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
              scrolled
                ? 'text-sand-600 hover:text-primary'
                : 'text-white/80 hover:text-white'
            }`}
          >
            AR
          </button>
          <div className={`w-px h-5 ${scrolled ? 'bg-sand-200' : 'bg-white/20'}`} />
          <button
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
              scrolled
                ? 'text-sand-600 hover:text-primary'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            ref={ctaRef}
            className="bg-gradient-to-r from-accent-green to-primary-light text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            Book a Consultation
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
            mobileOpen ? 'rotate-45 translate-y-2' : ''
          } ${scrolled ? 'bg-sand-800' : 'bg-white'}`} />
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
            mobileOpen ? 'opacity-0' : ''
          } ${scrolled ? 'bg-sand-800' : 'bg-white'}`} />
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
            mobileOpen ? '-rotate-45 -translate-y-2' : ''
          } ${scrolled ? 'bg-sand-800' : 'bg-white'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
        mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass mx-4 mt-3 rounded-2xl p-6 space-y-1 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sand-700 font-medium rounded-xl hover:bg-primary/5 hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-sand-200 mt-3 flex flex-col gap-2">
            <button className="text-sand-600 font-medium py-2.5 rounded-xl hover:bg-sand-100 transition-colors">
              Login
            </button>
            <button className="bg-gradient-to-r from-accent-green to-primary-light text-white font-semibold py-3 rounded-xl shadow-lg">
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
