import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import heroVideo from '@/assets/hero.mp4'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 })

      // Overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      )

      // Heading — letter-by-letter stagger
      const heading = headingRef.current
      if (heading) {
        const text = heading.textContent || ''
        heading.textContent = ''
        heading.style.visibility = 'visible'
        const chars = text.split('').map((char) => {
          const span = document.createElement('span')
          span.textContent = char === ' ' ? '\u00A0' : char
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          heading.appendChild(span)
          return span
        })

        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.04,
            ease: 'power3.out',
          },
          '-=0.8'
        )
      }

      // Subtitle
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )

      // Floating decorative elements
      gsap.to(decorRef.current?.querySelectorAll('.orb') || [], {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.5, from: 'random' },
      })

      // Parallax on scroll
      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 100,
        opacity: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-900/80 via-sand-900/60 to-sand-900/90" />

      {/* Decorative Orbs */}
      <div ref={decorRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/15 to-primary-light/10 blur-3xl" />
        <div className="orb absolute top-1/3 right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-accent-green/10 to-primary/8 blur-3xl" />
        <div className="orb absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-accent-gold/10 to-cream/8 blur-3xl" />
      </div>

      {/* Content */}
      <div ref={overlayRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-sm mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-soft" />
          Balance &middot; Harmony &middot; Positive Energy
        </div>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05] mb-6"
          style={{ visibility: 'hidden' }}
        >
          DooFengShui
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          Align with the energy of your space and create a life full of comfort, balance, and harmony.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-accent-green to-primary-light text-white font-semibold rounded-full shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 text-base overflow-hidden active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Book a Consultation
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-accent-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button className="group px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-base hover:-translate-y-0.5 active:scale-95">
            <span className="flex items-center gap-2">
              Explore Courses
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="mt-16 flex items-center justify-center gap-8 sm:gap-16">
          {[
            { value: '4000+', label: 'Years of Wisdom' },
            { value: '14', label: 'Consultation Types' },
            { value: '5', label: 'Elements System' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-white/50 animate-[bounce_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
