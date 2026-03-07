import { Mail, Github, Linkedin } from 'lucide-react'

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/ScidaP',
    username: '@ScidaP',
    iconClass: 'text-white',
    bgClass: 'bg-stone-900 group-hover:bg-stone-700',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/patricio-scid%C3%A1-63ab091ba/',
    username: 'Patricio Scidá',
    iconClass: 'text-white',
    bgClass: 'bg-blue-600 group-hover:bg-blue-500',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:scidapatricio@gmail.com',
    username: 'scidapatricio@gmail.com',
    iconClass: 'text-stone-500',
    bgClass: 'bg-stone-100 group-hover:bg-stone-200',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 border-t border-stone-200">
      <div className="max-w-5xl mx-auto">

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">
          Contacto
        </p>

        <h2 className="text-2xl font-semibold text-stone-900 mb-8 tracking-tight">
          Encontrame en
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {socialLinks.map(({ icon: Icon, label, href, username, iconClass, bgClass }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-3.5 p-4 bg-white border border-stone-200 rounded-xl hover:border-stone-300 hover:shadow-sm transition-all duration-150"
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${bgClass}`}>
                <Icon size={15} className={iconClass} />
              </div>
              <div>
                <div className="text-stone-800 font-medium text-sm">{label}</div>
                <div className="text-stone-400 text-xs">{username}</div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
