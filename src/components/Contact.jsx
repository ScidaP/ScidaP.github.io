import { Mail, Github, Linkedin, Send } from 'lucide-react'

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/ScidaP',
    username: '@ScidaP',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: '#',
    username: 'ScidaP',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:tu@email.com',
    username: 'tu@email.com',
  },
]

export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <section id="contact" className="py-20 px-6 border-t border-stone-200">
      <div className="max-w-5xl mx-auto">

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">
          Contacto
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: message + socials */}
          <div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-3 tracking-tight">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              Estoy abierto a nuevas oportunidades y colaboraciones.
              Escríbeme y te respondo pronto.
            </p>

            <div className="space-y-3">
              {socialLinks.map(({ icon: Icon, label, href, username }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-3.5 p-3.5 bg-white border border-stone-200 rounded-xl hover:border-stone-300 hover:shadow-sm transition-all duration-150"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-100 group-hover:bg-stone-200 transition-colors">
                    <Icon size={15} className="text-stone-500" />
                  </div>
                  <div>
                    <div className="text-stone-800 font-medium text-sm">{label}</div>
                    <div className="text-stone-400 text-xs">{username}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5 uppercase tracking-wide">
                Nombre
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5 uppercase tracking-wide">
                Mensaje
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200 transition-colors resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-700 text-white text-sm font-medium rounded-xl transition-colors"
            >
              <Send size={14} />
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
