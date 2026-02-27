import { Mail, Github, Linkedin, Send, MapPin } from 'lucide-react'

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/ScidaP',
    username: '@ScidaP',
    color: 'hover:border-zinc-500 hover:bg-zinc-800/50',
    iconColor: 'group-hover:text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: '#',
    username: 'ScidaP',
    color: 'hover:border-blue-500/40 hover:bg-blue-600/10',
    iconColor: 'group-hover:text-blue-400',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:tu@email.com',
    username: 'tu@email.com',
    color: 'hover:border-indigo-500/40 hover:bg-indigo-600/10',
    iconColor: 'group-hover:text-indigo-400',
  },
]

export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <section id="contact" className="py-28 px-6 bg-zinc-900/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge">Hablemos</span>
          <h2 className="section-title">¿Tienes un proyecto en mente?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Estoy abierto a nuevas oportunidades y colaboraciones.
            No dudes en escribirme, te respondo pronto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Nombre
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Mensaje
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25"
            >
              <Send size={17} />
              Enviar mensaje
            </button>
          </form>

          {/* Social links */}
          <div>
            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-6">
              <MapPin size={14} />
              <span>Disponible remotamente · en todo el mundo</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Encuéntrame en
            </h3>
            <div className="space-y-3">
              {socialLinks.map(({ icon: Icon, label, href, username, color, iconColor }) => (
                <a
                  key={label}
                  href={href}
                  className={`group flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${color}`}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 transition-colors">
                    <Icon size={19} className={`text-zinc-500 transition-colors ${iconColor}`} />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{label}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">{username}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
