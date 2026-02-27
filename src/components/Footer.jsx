export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-stone-400 text-xs">
          © {new Date().getFullYear()} Patricio Scidá
        </p>
        <p className="text-stone-300 text-xs">
          Construido con React & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
