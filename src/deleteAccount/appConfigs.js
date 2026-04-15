export const deleteAccountApps = {
  equrix: {
    key: 'equrix',
    name: 'Equrix',
    pageTitle: 'Equrix — Delete Account',
    supportEmail: 'patricioscida@gmail.com',
    supabaseUrl: 'https://wqyahicffmwubrsyvmhs.supabase.co',
    supabaseAnonKey: 'sb_publishable_uYwEIITVp7bRRoXgLRQTSw_u-4VGIZw',
    functionName: 'equrix-delete-account',
    authRedirectUrl: 'https://scidap.github.io/equrix/delete-account/',
    providers: ['google', 'apple'],
    magicLinkEnabled: true,
    retentionCopy:
      'Si existen datos que deban retenerse por motivos legales, antifraude o integridad técnica, se conservarán solo en la mínima medida necesaria.',
    deletedData: [
      'Tu cuenta de autenticación en Supabase.',
      'Tu perfil, progreso y datos asociados configurados para Equrix.',
      'Cualquier registro del usuario marcado para borrado o anonimización en el backend.',
    ],
  },
  glenn: {
    key: 'glenn',
    name: 'Glenn',
    pageTitle: 'Glenn — Delete Account',
    supportEmail: 'patricioscida@gmail.com',
    supabaseUrl: 'https://drvlnixmrikqygihpmey.supabase.co',
    supabaseAnonKey: 'sb_publishable_qf98wbEp-AmgSOzTOWN6Og_NVEARQb8',
    functionName: 'glenn-delete-account',
    authRedirectUrl: 'https://scidap.github.io/glenn/delete-account/',
    providers: ['google'],
    magicLinkEnabled: true,
    retentionCopy:
      'Ciertos registros mínimos podrían conservarse temporalmente por motivos regulatorios, fiscales, antifraude o integridad operativa.',
    deletedData: [
      'Tu cuenta de autenticación en Supabase.',
      'Tus datos personales y financieros configurados para Glenn según la política del backend.',
      'Registros anonimizables o eliminables definidos en la base de datos.',
    ],
  },
}

export function getDeleteAccountAppConfig(appKey) {
  return deleteAccountApps[appKey] ?? null
}
