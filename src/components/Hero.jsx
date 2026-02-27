import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/ScidaP', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#contact', label: 'Email' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700/80 bg-zinc-900/50 text-zinc-400 text-sm mb-10">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Disponible para proyectos
        </div>

        {/* Name */}
        <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tight leading-none">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ScidaP
          </span>
        </h1>

        {/* Role */}
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-300 mb-6">
          Desarrollador Full Stack
        </h2>

        {/* Description */}
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Construyo aplicaciones web modernas, rápidas y escalables.
          Apasionado por el diseño limpio y la experiencia de usuario.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#projects"
            className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25"
          >
            Ver Proyectos
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
          >
            Contactar
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-700 hover:border-indigo-500/50 bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-indigo-600/10 transition-all hover:-translate-y-0.5"
              aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
