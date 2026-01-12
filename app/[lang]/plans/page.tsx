
// app/[lang]/plans/page.tsx
import Link from "next/link";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ plan?: string }>;
};

export default async function PlansPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { plan } = await searchParams;

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">Elegiste tu plan</h1>

      <p className="mt-4 text-muted-foreground">
        Estás a un paso de comenzar. Confirmá el plan y continuá.
      </p>

      <div className="mt-10 rounded-xl border p-6">
        <p className="text-sm text-muted-foreground">Plan seleccionado</p>
        <p className="mt-2 text-xl font-medium capitalize">
          {plan ?? "No especificado"}
        </p>
      </div>

      <div className="mt-10 flex gap-4">
        <Link
          href={`/${lang}/login${plan ? `?plan=${plan}` : ""}`}
          className="rounded-md bg-primary px-6 py-3 text-primary-foreground"
        >
          Continuar
        </Link>

        <Link
          href={`/${lang}#precios`}
          className="rounded-md border px-6 py-3"
        >
          Volver a planes
        </Link>
      </div>
    </main>
  );
}
