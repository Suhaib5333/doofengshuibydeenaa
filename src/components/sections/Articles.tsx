import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import plantImg from '@/assets/plant.jpg'
import bedroomImg from '@/assets/bedroom.jpg'
import livingRoomImg from '@/assets/living-room.jpg'

gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    title: 'What is Feng Shui?',
    excerpt: 'Discover the ancient Chinese philosophy that has guided spatial harmony for over 4,000 years and how it can transform your daily life.',
    image: livingRoomImg,
    author: 'Deena Al-Shamlan',
    date: 'Apr 2025',
    readTime: '5 min',
    tag: 'Fundamentals',
  },
  {
    title: 'The Importance of Water in Feng Shui',
    excerpt: 'Water represents wealth and prosperity in Feng Shui. Learn how to incorporate this powerful element into your space.',
    image: plantImg,
    author: 'Deena Al-Shamlan',
    date: 'May 2025',
    readTime: '4 min',
    tag: 'Elements',
  },
  {
    title: 'Money-Attracting Plants for Your Home',
    excerpt: 'Certain plants can enhance the flow of prosperity energy. Here are the top Feng Shui plants for financial abundance.',
    image: bedroomImg,
    author: 'Deena Al-Shamlan',
    date: 'May 2025',
    readTime: '3 min',
    tag: 'Tips',
  },
]

export default function Articles() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      )

      const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : []
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="blog" className="py-24 sm:py-32 bg-sand-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent-green/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-3">
              Our Blog
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-sand-900 tracking-tight">
              Latest <span className="text-gradient">Articles</span>
            </h2>
            <p className="text-sand-500 mt-3 max-w-lg">
              Tips, strategies, and insights for achieving balance and harmony through Feng Shui.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 shrink-0">
            View All Articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Article Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-sand-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                  {article.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-sand-900 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sand-500 text-sm leading-relaxed line-clamp-3 mb-5">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-sand-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-green to-primary-light flex items-center justify-center text-white text-xs font-bold">
                      D
                    </div>
                    <span className="text-xs text-sand-500">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-sand-400">
                    <span>{article.date}</span>
                    <span>&middot;</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
