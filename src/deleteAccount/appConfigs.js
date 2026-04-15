export const deleteAccountApps = {
  equrix: {
    key: 'equrix',
    name: 'Equrix',
    pageTitle: 'Equrix — Delete Account',
    logoSrc: '../../equrix/android-icon-foreground.png',
    supportEmail: 'patricioscida@gmail.com',
    supabaseUrl: 'https://wqyahicffmwubrsyvmhs.supabase.co',
    supabaseAnonKey: 'sb_publishable_uYwEIITVp7bRRoXgLRQTSw_u-4VGIZw',
    functionName: 'equrix-delete-account',
    authRedirectUrl: 'https://scidap.github.io/equrix/delete-account/',
    providers: ['google'],
    magicLinkEnabled: false,
    retentionCopy:
      'If any data must be retained for legal, anti-fraud, or technical integrity reasons, it will be kept only to the minimum extent necessary.',
    deletedData: [
      'Your Supabase authentication account will be deleted.',
      'Your Equrix profile, progress, and related user data will be deleted.',
      'Any user record marked for deletion or anonymization in the backend will be deleted.',
    ],
  },
  glenn: {
    key: 'glenn',
    name: 'Glenn',
    pageTitle: 'Glenn — Delete Account',
    logoSrc: null,
    supportEmail: 'patricioscida@gmail.com',
    supabaseUrl: 'https://drvlnixmrikqygihpmey.supabase.co',
    supabaseAnonKey: 'sb_publishable_qf98wbEp-AmgSOzTOWN6Og_NVEARQb8',
    functionName: 'glenn-delete-account',
    authRedirectUrl: 'https://scidap.github.io/glenn/delete-account/',
    providers: ['google'],
    magicLinkEnabled: false,
    retentionCopy:
      'Some minimal records may be retained temporarily for regulatory, tax, anti-fraud, or operational integrity reasons.',
    deletedData: [
      'Your Supabase authentication account will be deleted.',
      'Your personal and financial data configured for Glenn according to the backend policy will be deleted.',
      'Records flagged in the database for deletion or anonymization will be deleted.',
    ],
  },
}

export function getDeleteAccountAppConfig(appKey) {
  return deleteAccountApps[appKey] ?? null
}
