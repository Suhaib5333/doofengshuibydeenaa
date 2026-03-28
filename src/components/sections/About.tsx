import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import deenaImg from '@/assets/deena.jpg'
import plantImg from '@/assets/plant.jpg'

gsap.registerPlugin(ScrollTrigger)

const elements = [
  { name: 'Wood', icon: '🌿', color: 'from-green-400 to-emerald-600' },
  { name: 'Fire', icon: '🔥', color: 'from-red-400 to-orange-500' },
  { name: 'Earth', icon: '🏔️', color: 'from-amber-400 to-yellow-600' },
  { name: 'Metal', icon: '⚔️', color: 'from-gray-300 to-slate-500' },
  { name: 'Water', icon: '💧', color: 'from-blue-400 to-cyan-600' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      )

      // Content reveal
      gsap.fromTo(
        contentRef.current?.children ? Array.from(contentRef.current.children) : [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      )

      // Elements animation
      gsap.fromTo(
        elementsRef.current?.children ? Array.from(elementsRef.current.children) : [],
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: elementsRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24 sm:py-32 bg-sand-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-ice/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            Ancient Wisdom, Modern Living
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-sand-900 tracking-tight">
            What is <span className="text-gradient">Feng Shui</span>?
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={plantImg}
                alt="Feng Shui elements in a living space"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sand-900/30 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 sm:right-8 glass rounded-2xl p-5 shadow-xl max-w-[220px] animate-float">
              <p className="text-sm font-semibold text-sand-800">4,000+ Years</p>
              <p className="text-xs text-sand-500 mt-1">of Chinese philosophical wisdom guiding spatial harmony</p>
            </div>
          </div>

          {/* Text Side */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg text-sand-600 leading-relaxed">
              Feng Shui is an ancient Chinese philosophy, over 4,000 years old, that governs the arrangement and orientation of spaces in relation to the flow of energy — known as <span className="font-semibold text-primary">Chi</span>.
            </p>
            <p className="text-lg text-sand-600 leading-relaxed">
              It harmonizes the five natural elements to create environments that nurture wellbeing, prosperity, and balance in every aspect of life.
            </p>
            <p className="text-lg text-sand-600 leading-relaxed">
              Whether it&apos;s your home, office, or personal space — Feng Shui helps you align with the energy around you for a more fulfilling life.
            </p>

            {/* Meet Deena */}
            <div className="flex items-center gap-4 pt-4">
              <img
                src={deenaImg}
                alt="Deena - Feng Shui Consultant"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div>
                <p className="font-semibold text-sand-800">Deena Al-Shamlan</p>
                <p className="text-sm text-sand-500">Certified Feng Shui Consultant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Five Elements */}
        <div ref={elementsRef} className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {elements.map((el) => (
            <div
              key={el.name}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-sand-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-default min-w-[120px]"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${el.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {el.icon}
              </div>
              <span className="text-sm font-semibold text-sand-700">{el.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
