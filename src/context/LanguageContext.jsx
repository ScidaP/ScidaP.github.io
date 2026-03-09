import { createContext, useContext, useState } from 'react'

const translations = {
  es: {
    nav: {
      projects: 'Proyectos',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    projects: {
      sectionLabel: 'Proyectos',
      bio: 'Programador Universitario (UNT) · Licenciatura en Informática (UNT) · Diplomado en Peritaje Informático y Forensia Digital (UNT)',
      code: 'Código',
      privateRepo: 'Repositorio privado',
      imageComing: 'Imagen próximamente',
    },
    experience: {
      sectionLabel: 'Experiencia Laboral',
    },
    contact: {
      sectionLabel: 'Contacto',
      heading: 'Encontrame en',
    },
    footer: {
      builtWith: 'Construido con React & Tailwind CSS',
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    projects: {
      sectionLabel: 'Projects',
      bio: "University Programmer (UNT) · Bachelor's in Computer Science (UNT) · Diploma in Computer Forensics and Digital Forensics (UNT)",
      code: 'Code',
      privateRepo: 'Private repository',
      imageComing: 'Image coming soon',
    },
    experience: {
      sectionLabel: 'Work Experience',
    },
    contact: {
      sectionLabel: 'Contact',
      heading: 'Find me at',
    },
    footer: {
      builtWith: 'Built with React & Tailwind CSS',
    },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es')
  const t = translations[lang]
  const toggle = () => setLang((l) => (l === 'es' ? 'en' : 'es'))

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
