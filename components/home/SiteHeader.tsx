import Link from "next/link";
import EuroNotifyLogo from "@/components/EuroNotifyLogo";

export default function SiteHeader({ lang }: { lang: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${lang}`} className="flex items-center gap-2.5 font-semibold">
  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 border border-primary-100">
    <EuroNotifyLogo className="h-6 w-6 text-primary-600" />
  </span>
  <span className="text-slate-900 font-bold tracking-tight">EuroNotify</span>
</Link>


        <nav className="hidden items-center gap-8 md:flex">
          <Link href={`/${lang}#servicios`} className="text-sm text-slate-700 hover:text-slate-900">Servicios</Link>
          <Link href={`/${lang}#como-funciona`} className="text-sm text-slate-700 hover:text-slate-900">Cómo funciona</Link>
          <Link href={`/${lang}#precios`} className="text-sm text-slate-700 hover:text-slate-900">Precios</Link>
          <Link href={`/${lang}#asistente-ia`} className="text-sm text-slate-700 hover:text-slate-900">Asistente IA</Link>
        </nav>

        <Link
          href={`/${lang}/login`}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Acceso Cliente
        </Link>
      </div>
    </header>
  );
}
