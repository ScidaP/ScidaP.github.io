const stats = [
  { value: '10+', label: 'Proyectos completados' },
  { value: '2+', label: 'Años de experiencia' },
  { value: '15+', label: 'Tecnologías' },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Avatar side */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow effects */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl" />

              {/* Avatar card */}
              <div className="relative w-72 h-72 rounded-3xl p-px bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="w-full h-full rounded-3xl bg-zinc-900 flex flex-col items-center justify-center gap-3">
                  <span className="text-8xl font-black bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    SP
                  </span>
                  <span className="text-zinc-500 text-sm font-medium">Tu foto aquí</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="section-badge">Sobre mí</span>
            <h2 className="section-title leading-tight mb-6">
              Apasionado por crear<br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                soluciones digitales
              </span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-5">
              Soy un desarrollador full stack con experiencia en la creación de
              aplicaciones web modernas y escalables. Me especializo en React,
              Node.js y el ecosistema JavaScript, siempre aplicando las mejores
              prácticas y las últimas tecnologías.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-10">
              Me apasiona convertir ideas complejas en productos digitales
              elegantes y funcionales. Cada proyecto es una oportunidad para
              aprender algo nuevo y entregar valor real a los usuarios.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
