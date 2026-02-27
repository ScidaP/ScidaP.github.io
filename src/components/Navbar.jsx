import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
          ScidaP
        </a>

        <div className="hidden md:flex items-center gap-7">
          <a
            href="#projects"
            className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
          >
            Proyectos
          </a>
          <a
            href="#contact"
            className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
          >
            Contacto
          </a>
        </div>

        <button
          className="md:hidden text-stone-500 hover:text-stone-900"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-6 py-4 flex flex-col gap-4">
          <a
            href="#projects"
            className="text-stone-600 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Proyectos
          </a>
          <a
            href="#contact"
            className="text-stone-600 text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Contacto
          </a>
        </div>
      )}
    </nav>
  )
}
