import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-stone-200 py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-stone-400 text-xs">
          © {new Date().getFullYear()} Patricio Scidá
        </p>
        <div className="flex items-center gap-3 text-xs">
          <a href="#privacy" className="text-stone-400 hover:text-stone-700 transition-colors">
            {t.footer.privacyPolicies}
          </a>
          <p className="text-stone-300">
            {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  )
}
