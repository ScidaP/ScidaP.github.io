import { useState } from 'react'
import { Github, ExternalLink, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '../data/projects'

const tagColors = {
  // Frontend
  'React':            'bg-blue-50 text-blue-600 border-blue-100',
  'Vue.js':           'bg-emerald-50 text-emerald-700 border-emerald-100',
  'TypeScript':       'bg-sky-50 text-sky-600 border-sky-100',
  'Tailwind CSS':     'bg-cyan-50 text-cyan-600 border-cyan-100',
  'Bootstrap':        'bg-violet-50 text-violet-600 border-violet-100',
  'jQuery':           'bg-blue-50 text-blue-500 border-blue-100',
  'DataTables':       'bg-stone-100 text-stone-600 border-stone-200',
  // Backend
  'ASP.NET Core':     'bg-indigo-50 text-indigo-600 border-indigo-100',
  'Entity Framework': 'bg-indigo-50 text-indigo-500 border-indigo-100',
  'Node.js':          'bg-green-50 text-green-700 border-green-100',
  'PHP':              'bg-purple-50 text-purple-600 border-purple-100',
  'Python':           'bg-yellow-50 text-yellow-700 border-yellow-100',
  'PySide6':          'bg-green-50 text-green-600 border-green-100',
  'Qt':               'bg-green-50 text-green-700 border-green-100',
  // Database
  'PostgreSQL':       'bg-cyan-50 text-cyan-700 border-cyan-100',
  'MySQL':            'bg-orange-50 text-orange-600 border-orange-100',
  'MongoDB':          'bg-green-50 text-green-600 border-green-100',
  'Firebase':         'bg-orange-50 text-orange-600 border-orange-100',
  // Tools / Auth
  'SignalR':          'bg-pink-50 text-pink-600 border-pink-100',
  'JWT':              'bg-rose-50 text-rose-500 border-rose-100',
  'Socket.io':        'bg-stone-100 text-stone-600 border-stone-200',
  'Vite':             'bg-yellow-50 text-yellow-700 border-yellow-100',
  'Stripe':           'bg-violet-50 text-violet-600 border-violet-100',
  'D3.js':            'bg-orange-50 text-orange-600 border-orange-100',
  'REST API':         'bg-pink-50 text-pink-600 border-pink-100',
  'OpenWeather API':  'bg-sky-50 text-sky-600 border-sky-100',
}

function getTagColor(tag) {
  return tagColors[tag] ?? 'bg-stone-100 text-stone-600 border-stone-200'
}

function ProjectThumbnail({ images }) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="h-40 bg-stone-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <FolderOpen size={36} className="text-stone-300 group-hover:text-stone-400 transition-colors" />
        <span className="absolute bottom-2.5 right-3 text-[10px] text-stone-400">
          Imagen próximamente
        </span>
      </div>
    )
  }

  const prev = (e) => { e.preventDefault(); setCurrent((c) => (c - 1 + images.length) % images.length) }
  const next = (e) => { e.preventDefault(); setCurrent((c) => (c + 1) % images.length) }

  return (
    <div className="h-40 bg-stone-100 relative overflow-hidden group/img">
      <img
        src={images[current]}
        alt="screenshot"
        className="w-full h-full object-cover object-top transition-opacity duration-200"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-0.5 shadow opacity-0 group-hover/img:opacity-100 transition-opacity"
          >
            <ChevronLeft size={14} className="text-stone-600" />
          </button>
          <button
            onClick={next}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-0.5 shadow opacity-0 group-hover/img:opacity-100 transition-opacity"
          >
            <ChevronRight size={14} className="text-stone-600" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setCurrent(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Intro */}
        <div className="mb-14">
          <h1 className="text-5xl font-bold text-stone-900 mb-3 tracking-tight">
            Patricio Scidá
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed max-w-lg">
            Programador Universitario (UNT) · Licenciatura en Informática (UNT) · Diplomado en Peritaje Informático y Forensia Digital (UNT)
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-200 mb-10" />

        {/* Section label */}
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">
          Proyectos
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
            >
              <ProjectThumbnail images={project.images} />

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-stone-900 mb-1.5 group-hover:text-stone-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded-md border ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-3.5 border-t border-stone-100">
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-xs font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={13} />
                      Código
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-xs font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={13} />
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
