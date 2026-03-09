import { useLanguage } from '../context/LanguageContext'

const experiences = [
  {
    empresa: "Clínica Santa Lucía",
    rol: "Desarrollador",
    rolEn: "Developer",
    periodo: "Marzo 2024 – Julio 2024",
    periodoEn: "March 2024 – July 2024",
    descripcion:
      "Con mi equipo he desarrollado un sistema de turnos multiusuario para una clínica oftalmológica de Tucumán. Utilicé HTML, CSS y Jquery para el frontend y PHP para el backend. PostgreSQL en la base de datos.",
    descripcionEn:
      "With my team I developed a multi-user appointment system for an ophthalmological clinic in Tucumán. I used HTML, CSS and jQuery for the frontend and PHP for the backend. PostgreSQL for the database.",
    tags: ["HTML", "CSS", "jQuery", "PHP", "PostgreSQL"],
  },
  {
    empresa: "Profesor Particular de Informática",
    empresaEn: "Private Informatics Tutor",
    rol: "Nivel Universitario",
    rolEn: "University Level",
    periodo: "Diciembre 2024 – Diciembre 2025",
    periodoEn: "December 2024 – December 2025",
    descripcion: null,
    descripcionEn: null,
    tags: [],
  },
  {
    empresa: "itconstrucciones",
    rol: "Desarrollador",
    rolEn: "Developer",
    periodo: "Marzo 2021 – Marzo 2023",
    periodoEn: "March 2021 – March 2023",
    descripcion:
      "He desarrollado un sistema de gestión de obras para una empresa española radicada en Madrid, con sistema de usuarios y fácil administración de los datos cargados al sistema. Usé Bootstrap para los estilos, PHP para el backend, Jquery con AJax para algunas funciones de la interfaz de usuario y PostgreSQL para el diseño y manejo de la base de datos.",
    descripcionEn:
      "I developed a construction management system for a Spanish company based in Madrid, with a user system and easy administration of the data entered into the system. I used Bootstrap for styling, PHP for the backend, jQuery with Ajax for some user interface functions, and PostgreSQL for database design and management.",
    tags: ["Bootstrap", "PHP", "jQuery", "Ajax", "PostgreSQL"],
  },
  {
    empresa: "Ámsterdam Salud",
    rol: "Desarrollador",
    rolEn: "Developer",
    periodo: "Enero 2020 – Diciembre 2021",
    periodoEn: "January 2020 – December 2021",
    descripcion:
      "Trabajé en el desarrollo de la página web de Ámsterdam Salud, una conocida obra social de mi ciudad, Yerba Buena.",
    descripcionEn:
      "I worked on the development of the Ámsterdam Salud website, a well-known health insurance provider from my city, Yerba Buena.",
    tags: [],
  },
]

export default function Experience() {
  const { lang, t } = useLanguage()

  return (
    <section id="experience" className="py-20 px-6 border-t border-stone-200">
      <div className="max-w-5xl mx-auto">

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-10">
          {t.experience.sectionLabel}
        </p>

        <div className="space-y-0">
          {experiences.map((exp, index) => {
            const empresa = lang === 'en' ? (exp.empresaEn || exp.empresa) : exp.empresa
            const rol = lang === 'en' ? (exp.rolEn || exp.rol) : exp.rol
            const periodo = lang === 'en' ? (exp.periodoEn || exp.periodo) : exp.periodo
            const descripcion = lang === 'en' ? exp.descripcionEn : exp.descripcion
            return (
              <div key={index} className="relative pl-6 pb-10 last:pb-0">
                {/* Línea vertical */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-[7px] top-3 bottom-0 w-px bg-stone-200" />
                )}
                {/* Punto */}
                <div className="absolute left-0 top-[6px] w-3.5 h-3.5 rounded-full bg-white border-2 border-stone-400" />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <div>
                    <span className="font-semibold text-stone-800 text-base">{empresa}</span>
                    <span className="text-stone-500 text-sm"> · {rol}</span>
                  </div>
                  <span className="text-xs text-stone-400 whitespace-nowrap">{periodo}</span>
                </div>

                {descripcion && (
                  <p className="text-stone-600 text-sm leading-relaxed mb-3">
                    {descripcion}
                  </p>
                )}

                {exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs rounded-full bg-stone-100 text-stone-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
