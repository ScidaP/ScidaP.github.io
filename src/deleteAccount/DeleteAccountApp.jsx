import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

function getFriendlyErrorMessage(error, fallback) {
  const message = error?.message?.trim()
  if (!message) return fallback

  const normalized = message.toLowerCase()
  if (normalized.includes('invalid login credentials')) {
    return 'No se pudo validar la sesión. Volvé a iniciar sesión e intentá de nuevo.'
  }
  if (normalized.includes('email rate limit exceeded')) {
    return 'Se alcanzó el límite de emails. Esperá unos minutos e intentá de nuevo.'
  }
  if (normalized.includes('user not allowed')) {
    return 'Esta cuenta no está habilitada para iniciar sesión desde este método.'
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
        <h1>La página no está configurada</h1>
        <p>
          Completá la configuración pública de <strong>{config?.name || 'la app'}</strong> en
          `src/deleteAccount/appConfigs.js` antes de publicar esta ruta.
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
        <h2 id="confirm-title">Eliminar mi cuenta de forma permanente</h2>
        <p>
          Estás a punto de eliminar la cuenta autenticada como <strong>{email || 'usuario actual'}</strong>.
          Esta acción es irreversible.
        </p>
        <ul className="danger-list">
          <li>Se eliminará tu acceso a la app.</li>
          <li>Se borrarán o anonimizarán tus datos según la política configurada en Supabase.</li>
          <li>No vas a poder recuperar la cuenta desde esta página una vez procesada.</li>
        </ul>
        <label className="field">
          <span>
            Escribí <strong>DELETE</strong> para confirmar
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
            Cancelar
          </button>
          <button type="button" className="danger-button" onClick={onConfirm} disabled={!isValid || loading}>
            {loading ? 'Eliminando...' : 'Eliminar mi cuenta'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AccountPanel({ session, onDeleteClick, onSignOut, deleteLoading, deleteError }) {
  const email = session?.user?.email || 'No email disponible'
  const provider = session?.user?.app_metadata?.provider

  return (
    <section className="surface-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">Authenticated session</span>
          <h2>Cuenta lista para eliminarse</h2>
        </div>
        <button type="button" className="ghost-button" onClick={onSignOut} disabled={deleteLoading}>
          Cerrar sesión
        </button>
      </div>

      <div className="identity-box">
        <span className="identity-label">Usuario autenticado</span>
        <strong>{email}</strong>
        {provider ? <span className="identity-meta">Proveedor: {provider}</span> : null}
      </div>

      <p className="muted-copy">
        La eliminación solo afecta a la cuenta actualmente autenticada. No se acepta un email manual como prueba de identidad.
      </p>

      <StatusBanner kind="error">{deleteError}</StatusBanner>

      <button type="button" className="danger-button wide-button" onClick={onDeleteClick} disabled={deleteLoading}>
        {deleteLoading ? 'Procesando...' : 'Eliminar mi cuenta'}
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
      <h2>Iniciá sesión con tu cuenta real</h2>
      <p className="muted-copy">
        Para evitar suplantaciones, solo el usuario autenticado en Supabase puede solicitar la eliminación de su propia cuenta.
      </p>

      <div className="auth-grid">
        {providers.includes('google') ? (
          <button type="button" className="primary-button" onClick={() => onProviderLogin('google')} disabled={authLoading}>
            {authLoading ? 'Redirigiendo...' : 'Continuar con Google'}
          </button>
        ) : null}
        {providers.includes('apple') ? (
          <button type="button" className="secondary-button" onClick={() => onProviderLogin('apple')} disabled={authLoading}>
            {authLoading ? 'Redirigiendo...' : 'Continuar con Apple'}
          </button>
        ) : null}
      </div>

      {magicLinkEnabled ? (
        <form className="magic-link-form" onSubmit={onMagicLinkSubmit}>
          <label className="field">
            <span>O recibí un magic link para una cuenta existente</span>
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
            {authLoading ? 'Enviando...' : 'Enviar magic link'}
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
      <h2>La cuenta fue eliminada correctamente</h2>
      <p>
        La solicitud se procesó para <strong>{email || 'tu cuenta'}</strong>. La sesión local se cerró y ya no se puede volver a usar esta cuenta.
      </p>
      <button type="button" className="secondary-button" onClick={onReset}>
        Volver al inicio
      </button>
    </section>
  )
}

function FAQ({ config }) {
  return (
    <section className="surface-card faq-card">
      <span className="eyebrow">FAQ</span>
      <h2>Antes de continuar</h2>
      <div className="faq-list">
        <article>
          <h3>¿Qué datos se eliminan?</h3>
          <p>{config.deletedData.join(' ')}</p>
        </article>
        <article>
          <h3>¿Qué datos podrían conservarse?</h3>
          <p>{config.retentionCopy}</p>
        </article>
        <article>
          <h3>¿Puedo eliminar la cuenta de otra persona?</h3>
          <p>No. La identidad se toma del JWT de Supabase Auth. El sistema no acepta un email manual para decidir qué cuenta borrar.</p>
        </article>
        <article>
          <h3>¿Qué pasa si mi sesión expiró?</h3>
          <p>La página te va a pedir que vuelvas a iniciar sesión antes de habilitar la eliminación.</p>
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
          text: getFriendlyErrorMessage(error, 'No se pudo recuperar la sesión actual.'),
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
        text: getFriendlyErrorMessage(error, 'No se pudo iniciar el flujo de autenticación.'),
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
        text: getFriendlyErrorMessage(error, 'No se pudo enviar el magic link.'),
      })
    } else {
      setAuthMessage({
        kind: 'success',
        text: 'Te enviamos un magic link. Abrilo desde el mismo dispositivo o navegador para continuar.',
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
        text: 'La sesión expiró. Volvé a iniciar sesión para continuar.',
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
            text: 'La sesión expiró o ya no es válida. Volvé a iniciar sesión.',
          })
          return
        }

        throw new Error(payload?.error || 'No se pudo procesar la eliminación de la cuenta.')
      }

      const resolvedEmail = currentEmail
      await supabase.auth.signOut({ scope: 'local' })
      setDeletedEmail(resolvedEmail)
      setSession(null)
      setShowConfirmModal(false)
    } catch (requestError) {
      setDeleteError(getFriendlyErrorMessage(requestError, 'No se pudo eliminar la cuenta.'))
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
          <span className="eyebrow">Google Play compliant account deletion</span>
          <h1>Eliminar cuenta de {config.name}</h1>
          <p>
            Esta página permite iniciar sesión con tu cuenta real de {config.name} y pedir la eliminación permanente de la cuenta autenticada. La operación final se ejecuta en Supabase mediante una Edge Function segura.
          </p>
        </div>
        <div className="hero-points">
          <div>
            <strong>Seguro</strong>
            <span>La identidad sale del JWT de Supabase Auth, no de un email escrito manualmente.</span>
          </div>
          <div>
            <strong>Irreversible</strong>
            <span>Se exige una confirmación fuerte antes de borrar la cuenta.</span>
          </div>
          <div>
            <strong>Soporte</strong>
            <span>
              Si necesitás ayuda, escribí a <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>.
            </span>
          </div>
        </div>
      </section>

      <div className="content-grid">
        <section className="surface-card">
          <span className="eyebrow">How it works</span>
          <h2>Qué va a pasar con tu cuenta</h2>
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
            <h2>Verificando sesión</h2>
            <p className="muted-copy">Estamos comprobando si ya existe una sesión activa en Supabase Auth.</p>
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
        <h2>Contacto</h2>
        <p>
          Si no podés iniciar sesión o creés que hubo un problema con la eliminación, escribí a{' '}
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
