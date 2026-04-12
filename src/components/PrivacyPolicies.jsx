import { ShieldCheck, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { privacyPolicies } from '../data/privacyPolicies'

export default function PrivacyPolicies() {
  const { lang, t } = useLanguage()

  return (
    <section id="privacy" className="pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="border-t border-stone-200 mb-10" />

        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">
          {t.privacy.sectionLabel}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {privacyPolicies.map((policy) => {
            const description = lang === 'en' ? policy.descriptionEn : policy.description
            return (
              <a
                key={policy.id}
                href={policy.href}
                className="group bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-emerald-600" />
                  </div>
                  <ArrowUpRight size={18} className="text-stone-300 group-hover:text-stone-500 transition-colors shrink-0" />
                </div>

                <h3 className="text-sm font-semibold text-stone-900 mb-1.5">
                  {policy.appName}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">
                  {description}
                </p>
                <p className="text-[11px] text-stone-400">
                  {t.privacy.lastUpdated}: {policy.updatedAt}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
