// app/[lang]/login/page.tsx
import Link from "next/link";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ plan?: string }>;
};

export default async function LoginPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { plan } = await searchParams;

  return (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-3xl font-semibold">Acceso cliente</h1>

      <p className="mt-4 text-muted-foreground">
        Iniciá sesión para continuar con la activación del plan.
      </p>

      <form className="mt-10 space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="tu@email.com"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* Botón fake de login: seguimos el funnel */}
        <Link
          href={`/${lang}/checkout${plan ? `?plan=${plan}` : ""}`}
          className="mt-6 block rounded-md bg-primary px-4 py-3 text-center text-primary-foreground"
        >
          Ingresar
        </Link>
      </form>

      <p className="mt-6 text-xs text-muted-foreground">
        * Login de ejemplo. La autenticación real se conecta más adelante.
      </p>
    </main>
  );
}
