import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const APPLE_SIGN_IN_SCRIPT_URL = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'

let appleSignInScriptPromise

function loadAppleSignInScript() {
  if (window.AppleID?.auth) {
    return Promise.resolve(window.AppleID)
  }

  if (appleSignInScriptPromise) {
    return appleSignInScriptPromise
  }

  appleSignInScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${APPLE_SIGN_IN_SCRIPT_URL}"]`)
    const script = existingScript || document.createElement('script')

    const handleLoad = () => {
      if (window.AppleID?.auth) {
        resolve(window.AppleID)
      } else {
        reject(new Error('Apple Sign In loaded without exposing its authentication API.'))
      }
    }

    const handleError = () => {
      appleSignInScriptPromise = undefined
      reject(new Error('Apple Sign In could not be loaded. Check your connection and try again.'))
    }

    script.addEventListener('load', handleLoad, { once: true })
    script.addEventListener('error', handleError, { once: true })

    if (!existingScript) {
      script.src = APPLE_SIGN_IN_SCRIPT_URL
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  })

  return appleSignInScriptPromise
}

function createAuthToken() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  const randomBytes = crypto.getRandomValues(new Uint8Array(32))
  return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function isAppleServiceIdConfigured(config) {
  return Boolean(config?.appleServiceId && !config.appleServiceId.includes('YOUR_'))
}

function getAppleErrorMessage(error) {
  const code = error?.error || error?.detail?.error
  if (code === 'user_cancelled_authorize') {
    return 'Apple sign-in was cancelled.'
  }

  return getFriendlyErrorMessage(error, 'Apple sign-in could not be completed.')
}

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

function getAuthRedirectUrl(config) {
  if (typeof window === 'undefined') {
    return config.authRedirectUrl
  }

  const { origin, pathname, protocol } = window.location
  if (protocol === 'http:' || protocol === 'https:') {
    return `${origin}${pathname}`
  }

  return config.authRedirectUrl
}

function StatusBanner({ kind, children }) {
  if (!children) return null
  return <div className={`status-banner ${kind}`}>{children}</div>
}

function GoogleIcon() {
  return (
    <svg className="provider-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.36l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.93A6 6 0 0 1 6.08 12c0-.67.11-1.32.31-1.93V7.45H3.04A10 10 0 0 0 2 12c0 1.63.39 3.17 1.04 4.55l3.35-2.62Z" />
      <path fill="#EA4335" d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.88A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.96 5.45l3.35 2.62C7.18 7.7 9.39 5.94 12 5.94Z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="provider-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M17.05 12.54c-.03-2.87 2.34-4.27 2.45-4.34a5.24 5.24 0 0 0-4.12-2.23c-1.73-.18-3.41 1.04-4.29 1.04-.9 0-2.26-1.02-3.73-.99a5.46 5.46 0 0 0-4.6 2.8c-1.99 3.45-.5 8.52 1.4 11.31.95 1.37 2.06 2.9 3.53 2.85 1.44-.06 1.98-.92 3.72-.92 1.72 0 2.23.92 3.73.89 1.55-.03 2.52-1.37 3.43-2.75a11.3 11.3 0 0 0 1.57-3.2 4.94 4.94 0 0 1-3.09-4.46ZM14.25 4.14A5.03 5.03 0 0 0 15.4.5a5.1 5.1 0 0 0-3.3 1.73 4.8 4.8 0 0 0-1.18 3.5 4.22 4.22 0 0 0 3.33-1.59Z" />
    </svg>
  )
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
  passwordAuthEnabled,
  authLoading,
  authMessage,
  passwordEmail,
  passwordValue,
  onPasswordEmailChange,
  onPasswordValueChange,
  onPasswordSubmit,
  magicEmail,
  onMagicEmailChange,
  onProviderLogin,
  onMagicLinkSubmit,
  magicLinkEnabled,
  anonymousSession,
}) {
  return (
    <section className="surface-card">
      <span className="eyebrow">Sign in required</span>
      <h2>Sign in with your real account</h2>
      <p className="muted-copy">
        To prevent impersonation, only the user authenticated through Supabase can request deletion of their own account.
      </p>

      {anonymousSession ? (
        <StatusBanner kind="info">
          This is an anonymous guest session. Link it to Google or sign in with the account used by the app first;
          anonymous sessions cannot be identified from this web page after the session is lost.
        </StatusBanner>
      ) : null}

      <div className="auth-grid">
        {providers.includes('google') ? (
          <button type="button" className="primary-button provider-button google-button" onClick={() => onProviderLogin('google')} disabled={authLoading}>
            <GoogleIcon />
            {authLoading ? 'Redirecting...' : 'Continue with Google'}
          </button>
        ) : null}
        {providers.includes('apple') ? (
          <button type="button" className="secondary-button provider-button apple-button" onClick={() => onProviderLogin('apple')} disabled={authLoading}>
            <AppleIcon />
            {authLoading ? 'Redirecting...' : 'Continue with Apple'}
          </button>
        ) : null}
      </div>

      {passwordAuthEnabled ? (
        <form className="magic-link-form" onSubmit={onPasswordSubmit}>
          <label className="field">
            <span>Or sign in with your email and password</span>
            <input
              type="email"
              value={passwordEmail}
              onChange={(event) => onPasswordEmailChange(event.target.value)}
              placeholder="your-email@example.com"
              autoComplete="email"
              disabled={authLoading}
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={passwordValue}
              onChange={(event) => onPasswordValueChange(event.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              disabled={authLoading}
              required
            />
          </label>
          <button type="submit" className="secondary-button" disabled={authLoading}>
            {authLoading ? 'Signing in...' : 'Sign in with email'}
          </button>
        </form>
      ) : null}

      {magicLinkEnabled ? (
        <form className="magic-link-form" onSubmit={onMagicLinkSubmit}>
          <label className="field">
            <span>Or receive a magic link for an existing account</span>
            <input
              type="email"
              value={magicEmail}
              onChange={(event) => onMagicEmailChange(event.target.value)}
              placeholder="your-email@example.com"
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
          <p>No. You can only request deletion of your own account.</p>
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
  const [passwordEmail, setPasswordEmail] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
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

  const isAnonymousSession = Boolean(session?.user?.is_anonymous || session?.user?.app_metadata?.provider === 'anonymous')
  const isAuthenticated = Boolean(session?.user) && !isAnonymousSession
  const currentEmail = useMemo(() => session?.user?.email || '', [session])
  const authRedirectUrl = useMemo(() => getAuthRedirectUrl(config), [config])

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

    if (provider === 'apple') {
      if (!isAppleServiceIdConfigured(config)) {
        setAuthMessage({
          kind: 'error',
          text: 'Apple Sign In is not configured yet. Add the public Services ID to this page configuration.',
        })
        setAuthLoading(false)
        return
      }

      try {
        const AppleID = await loadAppleSignInScript()
        const nonce = createAuthToken()
        const state = createAuthToken()

        AppleID.auth.init({
          clientId: config.appleServiceId,
          scope: 'name email',
          redirectURI: config.appleRedirectUrl || authRedirectUrl,
          state,
          nonce,
          usePopup: true,
        })

        const result = await AppleID.auth.signIn()
        const authorization = result?.authorization

        if (!authorization?.id_token) {
          throw new Error('Apple did not return an identity token.')
        }

        if (authorization.state !== state) {
          throw new Error('Apple returned an invalid authentication state. Please try again.')
        }

        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: authorization.id_token,
          nonce,
        })

        if (error) throw error
      } catch (error) {
        setAuthMessage({ kind: 'error', text: getAppleErrorMessage(error) })
      } finally {
        setAuthLoading(false)
      }

      return
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: authRedirectUrl,
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
        emailRedirectTo: authRedirectUrl,
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

  async function handlePasswordSubmit(event) {
    event.preventDefault()
    setAuthLoading(true)
    setAuthMessage(null)

    const { error } = await supabase.auth.signInWithPassword({
      email: passwordEmail.trim(),
      password: passwordValue,
    })

    if (error) {
      setAuthMessage({
        kind: 'error',
        text: getFriendlyErrorMessage(error, 'The email sign-in request could not be completed.'),
      })
      setAuthLoading(false)
      return
    }

    setPasswordValue('')
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
            This page lets you sign in with your real {config.name} account and request permanent deletion of the authenticated account.
          </p>
        </div>
        <div className="hero-points">
          <div>
            <strong>Secure</strong>
            <span>Identity comes from the Supabase Auth service.</span>
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
            passwordAuthEnabled={config.passwordAuthEnabled}
            authLoading={authLoading}
            authMessage={authMessage}
            passwordEmail={passwordEmail}
            passwordValue={passwordValue}
            onPasswordEmailChange={setPasswordEmail}
            onPasswordValueChange={setPasswordValue}
            onPasswordSubmit={handlePasswordSubmit}
            magicEmail={magicEmail}
            onMagicEmailChange={setMagicEmail}
            onProviderLogin={handleProviderLogin}
            onMagicLinkSubmit={handleMagicLinkSubmit}
            magicLinkEnabled={config.magicLinkEnabled}
            anonymousSession={isAnonymousSession}
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
