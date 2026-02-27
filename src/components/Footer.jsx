export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()}{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            ScidaP
          </span>
          . Todos los derechos reservados.
        </p>
        <p className="text-zinc-600 text-sm">
          Construido con React &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
