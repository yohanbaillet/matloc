import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface text-center px-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-px w-8 bg-amber-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">404</span>
        <span className="h-px w-8 bg-amber-500" />
      </div>
      <h1 className="text-5xl font-black tracking-tight text-midnight sm:text-6xl">Page introuvable</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Cette page n'existe pas ou a été déplacée. Retournez à l'accueil.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-7 py-3 font-semibold text-white shadow-amber transition-all hover:bg-amber-400 hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l'accueil
      </Link>
    </div>
  )
}
