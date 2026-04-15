import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

function getFriendlyErrorMessage(error, fallback) {
  const message = error?.message?.trim()
  if (!message) return fallback

  const normalized = message.toLowerCase()
  if (normalized.includes('invalid login credentials')) {
    return 'Your session could not be validated. Please sign in again and try once more.'
  }
  if (normalized.includes('email rate limit exceeded')) {
    return 'The email rate limit was reached. Please wait a few minutes and try again.'
  }
  if (normalized.includes('user not allowed')) {
    return 'This account is not enabled for this sign-in method.'
  }

  return message
}

function createSupabaseClient(config) {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      persistSession: true,
    },
  })
}

function buildFunctionUrl(config) {
  return `${config.supabaseUrl.replace(/\/$/, '')}/functions/v1/${config.functionName}`
}

function StatusBanner({ kind, children }) {
  if (!children) return null
  return <div className={`status-banner ${kind}`}>{children}</div>
}

function ConfigError({ config }) {
  return (
    <main className="delete-account-page">
      <section className="hero-card config-card">
        <span className="eyebrow">Delete Account</span>
        <h1>This page is not configured</h1>
        <p>
          Complete the public configuration for <strong>{config?.name || 'this app'}</strong> in
          `src/deleteAccount/appConfigs.js` before publishing this route.
        </p>
      </section>
    </main>
  )
}

function ConfirmModal({ email, onCancel, onConfirm, loading, error }) {
  const [confirmationText, setConfirmationText] = useState('')
  const isValid = confirmationText.trim().toUpperCase() === 'DELETE'

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <p className="eyebrow">Final confirmation</p>
        <h2 id="confirm-title">Permanently delete my account</h2>
        <p>
          You are about to delete the account currently authenticated as <strong>{email || 'current user'}</strong>.
          This action is irreversible.
        </p>
        <ul className="danger-list">
          <li>Your access to the app will be removed.</li>
          <li>Your data will be deleted or anonymized according to the policy configured in Supabase.</li>
          <li>You will not be able to recover the account from this page once the process is completed.</li>
        </ul>
        <label className="field">
          <span>
            Type <strong>DELETE</strong> to confirm
          </span>
          <input
            type="text"
            value={confirmationText}
            onChange={(event) => setConfirmationText(event.target.value)}
            placeholder="DELETE"
            autoFocus
          />
        </label>
        <StatusBanner kind="error">{error}</StatusBanner>
        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={onConfirm} disabled={!isValid || loading}>
            {loading ? 'Deleting...' : 'Delete my account'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AccountPanel({ session, onDeleteClick, onSignOut, deleteLoading, deleteError }) {
  const email = session?.user?.email || 'No email available'
  const provider = session?.user?.app_metadata?.provider

  return (
    <section className="surface-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">Authenticated session</span>
          <h2>Account ready for deletion</h2>
        </div>
        <button type="button" className="ghost-button" onClick={onSignOut} disabled={deleteLoading}>
          Sign out
        </button>
      </div>

      <div className="identity-box">
        <span className="identity-label">Authenticated user</span>
        <strong>{email}</strong>
        {provider ? <span className="identity-meta">Provider: {provider}</span> : null}
      </div>

      <p className="muted-copy">
        Deletion only affects the account currently authenticated. A manually typed email is never accepted as proof of identity.
      </p>

      <StatusBanner kind="error">{deleteError}</StatusBanner>

      <button type="button" className="danger-button wide-button" onClick={onDeleteClick} disabled={deleteLoading}>
        {deleteLoading ? 'Processing...' : 'Delete my account'}
      </button>
    </section>
  )
}

function LoginPanel({
  providers,
  authLoading,
  authMessage,
  magicEmail,
  onMagicEmailChange,
  onProviderLogin,
  onMagicLinkSubmit,
  magicLinkEnabled,
}) {
  return (
    <section className="surface-card">
      <span className="eyebrow">Sign in required</span>
      <h2>Sign in with your real account</h2>
      <p className="muted-copy">
        To prevent impersonation, only the user authenticated through Supabase can request deletion of their own account.
      </p>

      <div className="auth-grid">
        {providers.includes('google') ? (
          <button type="button" className="primary-button" onClick={() => onProviderLogin('google')} disabled={authLoading}>
            {authLoading ? 'Redirecting...' : 'Continue with Google'}
          </button>
        ) : null}
        {providers.includes('apple') ? (
          <button type="button" className="secondary-button" onClick={() => onProviderLogin('apple')} disabled={authLoading}>
            {authLoading ? 'Redirecting...' : 'Continue with Apple'}
          </button>
        ) : null}
      </div>

      {magicLinkEnabled ? (
        <form className="magic-link-form" onSubmit={onMagicLinkSubmit}>
          <label className="field">
            <span>Or receive a magic link for an existing account</span>
            <input
              type="email"
              value={magicEmail}
              onChange={(event) => onMagicEmailChange(event.target.value)}
              placeholder="tu-email@ejemplo.com"
              autoComplete="email"
              disabled={authLoading}
              required
            />
          </label>
          <button type="submit" className="ghost-button" disabled={authLoading}>
            {authLoading ? 'Sending...' : 'Send magic link'}
          </button>
        </form>
      ) : null}

      <StatusBanner kind={authMessage?.kind || 'info'}>{authMessage?.text}</StatusBanner>
    </section>
  )
}

function SuccessPanel({ email, onReset }) {
  return (
    <section className="surface-card success-card">
      <span className="eyebrow">Deletion completed</span>
      <h2>Your account was deleted successfully</h2>
      <p>
        The request was processed for <strong>{email || 'your account'}</strong>. Your local session has been signed out and this account can no longer be used.
      </p>
      <button type="button" className="secondary-button" onClick={onReset}>
        Back to start
      </button>
    </section>
  )
}

function FAQ({ config }) {
  return (
    <section className="surface-card faq-card">
      <span className="eyebrow">FAQ</span>
      <h2>Before you continue</h2>
      <div className="faq-list">
        <article>
          <h3>What data is deleted?</h3>
          <p>{config.deletedData.join(' ')}</p>
        </article>
        <article>
          <h3>What data may be retained?</h3>
          <p>{config.retentionCopy}</p>
        </article>
        <article>
          <h3>Can I delete someone else&apos;s account?</h3>
          <p>No. Identity comes from the Supabase Auth JWT. The system never accepts a manually typed email to decide which account to delete.</p>
        </article>
        <article>
          <h3>What happens if my session expires?</h3>
          <p>The page will ask you to sign in again before deletion can continue.</p>
        </article>
      </div>
    </section>
  )
}

export function DeleteAccountApp({ config }) {
  const [session, setSession] = useState(null)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [authMessage, setAuthMessage] = useState(null)
  const [magicEmail, setMagicEmail] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [deletedEmail, setDeletedEmail] = useState('')

  const isConfigured = Boolean(
    config?.supabaseUrl &&
    !config.supabaseUrl.includes('YOUR_') &&
    config?.supabaseAnonKey &&
    !config.supabaseAnonKey.includes('YOUR_')
  )

  const supabase = useMemo(
    () => (isConfigured ? createSupabaseClient(config) : null),
    [config, isConfigured]
  )

  const isAuthenticated = Boolean(session?.user)
  const currentEmail = useMemo(() => session?.user?.email || '', [session])

  useEffect(() => {
    document.title = config?.pageTitle || 'Delete Account'
  }, [config])

  useEffect(() => {
    if (!supabase) return undefined

    const params = new URLSearchParams(window.location.search)
    const oauthError = params.get('error_description') || params.get('error')
    if (oauthError) {
      setAuthMessage({ kind: 'error', text: decodeURIComponent(oauthError) })
    }

    let mounted = true

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return

      if (error) {
        setAuthMessage({
          kind: 'error',
          text: getFriendlyErrorMessage(error, 'The current session could not be loaded.'),
        })
      }

      setSession(data.session ?? null)
      setSessionLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setSessionLoading(false)

      const cleanUrl = new URL(window.location.href)
      if (cleanUrl.searchParams.has('code') || cleanUrl.searchParams.has('error') || cleanUrl.searchParams.has('error_description')) {
        cleanUrl.search = ''
        cleanUrl.hash = ''
        window.history.replaceState({}, document.title, cleanUrl.toString())
      }
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [supabase])

  async function handleProviderLogin(provider) {
    setAuthLoading(true)
    setAuthMessage(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: config.authRedirectUrl,
      },
    })

    if (error) {
      setAuthMessage({
        kind: 'error',
        text: getFriendlyErrorMessage(error, 'The authentication flow could not be started.'),
      })
      setAuthLoading(false)
    }
  }

  async function handleMagicLinkSubmit(event) {
    event.preventDefault()
    setAuthLoading(true)
    setAuthMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email: magicEmail.trim(),
      options: {
        emailRedirectTo: config.authRedirectUrl,
        shouldCreateUser: false,
      },
    })

    if (error) {
      setAuthMessage({
        kind: 'error',
        text: getFriendlyErrorMessage(error, 'The magic link could not be sent.'),
      })
    } else {
      setAuthMessage({
        kind: 'success',
        text: 'We sent you a magic link. Open it on the same device or browser to continue.',
      })
    }

    setAuthLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut({ scope: 'local' })
    setShowConfirmModal(false)
    setDeleteError('')
    setAuthMessage(null)
  }

  async function handleDeleteConfirmed() {
    setDeleteLoading(true)
    setDeleteError('')

    const { data, error } = await supabase.auth.getSession()
    const activeSession = data.session

    if (error || !activeSession?.access_token) {
      setDeleteLoading(false)
      setShowConfirmModal(false)
      await supabase.auth.signOut({ scope: 'local' })
      setAuthMessage({
        kind: 'error',
        text: 'Your session expired. Please sign in again to continue.',
      })
      return
    }

    try {
      const response = await fetch(buildFunctionUrl(config), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeSession.access_token}`,
        },
        body: JSON.stringify({}),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        if (response.status === 401) {
          await supabase.auth.signOut({ scope: 'local' })
          setShowConfirmModal(false)
          setAuthMessage({
            kind: 'error',
            text: 'Your session expired or is no longer valid. Please sign in again.',
          })
          return
        }

        throw new Error(payload?.error || 'The account deletion request could not be processed.')
      }

      const resolvedEmail = currentEmail
      await supabase.auth.signOut({ scope: 'local' })
      setDeletedEmail(resolvedEmail)
      setSession(null)
      setShowConfirmModal(false)
    } catch (requestError) {
      setDeleteError(getFriendlyErrorMessage(requestError, 'The account could not be deleted.'))
    } finally {
      setDeleteLoading(false)
    }
  }

  function resetSuccessState() {
    setDeletedEmail('')
    setAuthMessage(null)
    setDeleteError('')
  }

  if (!isConfigured) {
    return <ConfigError config={config} />
  }

  return (
    <main className="delete-account-page">
      <section className="hero-card">
        <div className="hero-copy">
          {config.logoSrc ? (
            <img
              src={config.logoSrc}
              alt={`${config.name} logo`}
              className="app-logo"
            />
          ) : null}
          <span className="eyebrow">Google Play compliant account deletion</span>
          <h1>Delete your {config.name} account</h1>
          <p>
            This page lets you sign in with your real {config.name} account and request permanent deletion of the authenticated account. The final deletion step is executed securely in Supabase through an Edge Function.
          </p>
        </div>
        <div className="hero-points">
          <div>
            <strong>Secure</strong>
            <span>Identity comes from the Supabase Auth JWT, not from a manually typed email.</span>
          </div>
          <div>
            <strong>Irreversible</strong>
            <span>A strong confirmation step is required before the account is deleted.</span>
          </div>
          <div>
            <strong>Support</strong>
            <span>
              If you need help, email <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
            </span>
          </div>
        </div>
      </section>

      <div className="content-grid">
        <section className="surface-card">
          <span className="eyebrow">How it works</span>
          <h2>What happens to your account</h2>
          <ul className="info-list">
            {config.deletedData.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>{config.retentionCopy}</li>
          </ul>
        </section>

        {deletedEmail ? (
          <SuccessPanel email={deletedEmail} onReset={resetSuccessState} />
        ) : sessionLoading ? (
          <section className="surface-card">
            <span className="eyebrow">Loading</span>
            <h2>Checking your session</h2>
            <p className="muted-copy">We are checking whether an active Supabase Auth session already exists.</p>
          </section>
        ) : isAuthenticated ? (
          <AccountPanel
            session={session}
            onDeleteClick={() => setShowConfirmModal(true)}
            onSignOut={handleSignOut}
            deleteLoading={deleteLoading}
            deleteError={deleteError}
          />
        ) : (
          <LoginPanel
            providers={config.providers}
            authLoading={authLoading}
            authMessage={authMessage}
            magicEmail={magicEmail}
            onMagicEmailChange={setMagicEmail}
            onProviderLogin={handleProviderLogin}
            onMagicLinkSubmit={handleMagicLinkSubmit}
            magicLinkEnabled={config.magicLinkEnabled}
          />
        )}
      </div>

      <FAQ config={config} />

      <section className="surface-card">
        <span className="eyebrow">Need help?</span>
        <h2>Contact</h2>
        <p>
          If you cannot sign in or believe there was a problem with the deletion process, email{' '}
          <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
        </p>
      </section>

      {showConfirmModal ? (
        <ConfirmModal
          email={currentEmail}
          onCancel={() => !deleteLoading && setShowConfirmModal(false)}
          onConfirm={handleDeleteConfirmed}
          loading={deleteLoading}
          error={deleteError}
        />
      ) : null}
    </main>
  )
}
