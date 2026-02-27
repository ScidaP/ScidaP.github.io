import { skillCategories } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge">Lo que sé hacer</span>
          <h2 className="section-title">Habilidades Técnicas</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Tecnologías y herramientas con las que trabajo día a día en mis proyectos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-300 font-medium">{skill.name}</span>
                      <span className="text-zinc-600 tabular-nums">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
