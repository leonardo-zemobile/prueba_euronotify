// app/[lang]/checkout/page.tsx
import Link from "next/link";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ plan?: string }>;
};

function planLabel(plan?: string) {
  if (!plan) return "No especificado";
  const normalized = plan.toLowerCase();
  if (normalized === "starter") return "Starter";
  if (normalized === "pro") return "Pro";
  if (normalized === "enterprise") return "Enterprise";
  return plan;
}

export default async function CheckoutPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { plan } = await searchParams;

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">Checkout</h1>

      <p className="mt-4 text-muted-foreground">
        Resumen de tu elección. Este checkout es placeholder: después se conecta
        a pago real (Stripe/MercadoPago) y a tu backend.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Plan</p>
          <p className="mt-2 text-2xl font-medium">{planLabel(plan)}</p>

          <p className="mt-6 text-sm text-muted-foreground">Incluye</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>• Acceso a panel</li>
            <li>• Certificación y notificaciones</li>
            <li>• Trazabilidad y auditoría</li>
          </ul>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Datos de facturación</p>

          <div className="mt-4 space-y-3">
            <input
              placeholder="Nombre / Empresa"
              className="w-full rounded-md border px-3 py-2"
            />
            <input
              placeholder="Email"
              className="w-full rounded-md border px-3 py-2"
            />
            <input
              placeholder="País"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-primary-foreground"
            onClick={() => alert("Pago placeholder: conectar gateway después")}
          >
            Confirmar y pagar
          </button>

          <p className="mt-3 text-xs text-muted-foreground">
            * Acción simulada.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={`/${lang}#precios`}
          className="rounded-md border px-6 py-3"
        >
          Cambiar plan
        </Link>

        <Link
          href={`/${lang}/plans${plan ? `?plan=${plan}` : ""}`}
          className="rounded-md border px-6 py-3"
        >
          Volver
        </Link>

        <Link
          href={`/${lang}`}
          className="rounded-md border px-6 py-3"
        >
          Ir a la landing
        </Link>
      </div>
    </main>
  );
}
