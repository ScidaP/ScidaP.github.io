import { Github, ExternalLink, FolderOpen } from 'lucide-react'
import { projects } from '../data/projects'

const tagColors = {
  React: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Node.js': 'bg-green-500/10 text-green-400 border-green-500/20',
  TypeScript: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
  PostgreSQL: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Stripe: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Firebase: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Vue.js': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  MongoDB: 'bg-green-600/10 text-green-300 border-green-600/20',
  'Tailwind CSS': 'bg-cyan-600/10 text-cyan-300 border-cyan-600/20',
  'Socket.io': 'bg-gray-500/10 text-gray-300 border-gray-500/20',
  Vite: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'D3.js': 'bg-orange-400/10 text-orange-300 border-orange-400/20',
  'REST API': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'OpenWeather API': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
}

function getTagColor(tag) {
  return tagColors[tag] ?? 'bg-zinc-700/30 text-zinc-400 border-zinc-600/30'
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 bg-zinc-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">Mi trabajo</span>
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades y
            experiencia en el desarrollo de software.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-zinc-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FolderOpen
                  size={44}
                  className="text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300"
                />
                <span className="absolute bottom-3 right-3 text-xs text-zinc-600 bg-zinc-900/60 px-2 py-0.5 rounded-md">
                  Preview próximamente
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 text-xs font-medium rounded-md border ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-zinc-800">
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={15} />
                      Código
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="flex items-center gap-1.5 text-zinc-500 hover:text-indigo-400 text-sm font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={15} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
