import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function LangToggle({ className = '' }) {
  const { lang, toggle } = useLanguage()
  return (
    <div className={`flex items-center rounded-lg border border-stone-200 overflow-hidden ${className}`}>
      <button
        onClick={() => lang !== 'es' && toggle()}
        className={`flex items-center gap-1 px-2 py-1 text-xs font-medium transition-colors ${
          lang === 'es'
            ? 'bg-stone-100 text-stone-800'
            : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
        }`}
        aria-label="Español"
      >
        <span className="text-sm leading-none">🇪🇸</span>
        <span>ES</span>
      </button>
      <div className="w-px h-4 bg-stone-200" />
      <button
        onClick={() => lang !== 'en' && toggle()}
        className={`flex items-center gap-1 px-2 py-1 text-xs font-medium transition-colors ${
          lang === 'en'
            ? 'bg-stone-100 text-stone-800'
            : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
        }`}
        aria-label="English"
      >
        <span className="text-sm leading-none">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/80 shadow-sm'
          : ''
      }`}
      style={!scrolled ? { backgroundColor: '#F8F7F4' } : {}}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-stone-900 font-semibold text-base tracking-tight">
          Patricio Scidá
        </a>

        <div className="hidden md:flex items-center gap-7">
          <a
            href="#projects"
            className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
          >
            {t.nav.projects}
          </a>
          <a
            href="#experience"
            className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
          >
            {t.nav.experience}
          </a>
          <a
            href="#contact"
            className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
          >
            {t.nav.contact}
          </a>
          <LangToggle />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LangToggle />
          <button
            className="text-stone-500 hover:text-stone-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-6 py-4 flex flex-col gap-4">
          <a
            href="#projects"
            className="text-stone-600 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.projects}
          </a>
          <a
            href="#experience"
            className="text-stone-600 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.experience}
          </a>
          <a
            href="#contact"
            className="text-stone-600 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </nav>
  )
}
