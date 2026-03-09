import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function SpainFlag() {
  return (
    <svg viewBox="0 0 3 2" className="w-5 h-[13px] rounded-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
      <rect width="3" height="2" fill="#c60b1e" />
      <rect y="0.5" width="3" height="1" fill="#ffc400" />
    </svg>
  )
}

function UKFlag() {
  return (
    <svg viewBox="0 0 60 30" className="w-5 h-[13px] rounded-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#012169" />
      {/* St Andrew's cross (white diagonals) */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="white" stroke-width="7" />
      {/* St Patrick's cross (red diagonals) */}
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" />
      {/* St George's cross (white + red) */}
      <path d="M30,0 V30 M0,15 H60" stroke="white" stroke-width="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6" />
    </svg>
  )
}

function LangToggle() {
  const { lang, toggle } = useLanguage()
  return (
    <div className="flex items-center rounded-lg border border-stone-200 overflow-hidden">
      <button
        onClick={() => lang !== 'es' && toggle()}
        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors min-h-[38px] ${
          lang === 'es'
            ? 'bg-stone-100 text-stone-800'
            : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
        }`}
        aria-label="Español"
      >
        <SpainFlag />
        <span>ES</span>
      </button>
      <div className="w-px h-5 bg-stone-200" />
      <button
        onClick={() => lang !== 'en' && toggle()}
        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors min-h-[38px] ${
          lang === 'en'
            ? 'bg-stone-100 text-stone-800'
            : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
        }`}
        aria-label="English"
      >
        <UKFlag />
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-stone-900 font-semibold text-base tracking-tight">
          Patricio Scidá
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <a href="#projects" className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors">
            {t.nav.projects}
          </a>
          <a href="#experience" className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors">
            {t.nav.experience}
          </a>
          <a href="#contact" className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors">
            {t.nav.contact}
          </a>
          <LangToggle />
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LangToggle />
          <button
            className="p-2 text-stone-500 hover:text-stone-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-6 py-4 flex flex-col gap-1">
          <a
            href="#projects"
            className="text-stone-600 text-sm font-medium py-3 border-b border-stone-100"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.projects}
          </a>
          <a
            href="#experience"
            className="text-stone-600 text-sm font-medium py-3 border-b border-stone-100"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.experience}
          </a>
          <a
            href="#contact"
            className="text-stone-600 text-sm font-medium py-3"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </nav>
  )
}
