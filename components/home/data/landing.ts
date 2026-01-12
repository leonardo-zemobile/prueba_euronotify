// components/home/data/landing.ts

export type Lang = "es" | "en" | "pt" | "fr" | "it";

export type LandingSectionId =
  | "servicios"
  | "como-funciona"
  | "precios"
  | "asistente-ia";

export type PlanId = "starter" | "pro" | "enterprise";

export type NavItem = {
  label: string;
  href: `#${LandingSectionId}`; // anchors internos
};

export type Feature = {
  title: string;
  description: string;
};

export type Plan = {
  id: PlanId;
  name: string;
  priceMonthly: number; // en EUR (o ajustá a tu modelo)
  currency: "EUR" | "USD";
  tagline: string;
  features: string[];
  ctaLabel: string;
  // Ruta del funnel: el usuario elige plan -> login -> checkout
  // Importante: dejamos la URL lista aunque hoy sean placeholders.
  ctaHref: (lang: string) => string;
  highlighted?: boolean;
};

export type LandingContent = {
  brand: {
    name: string;
    shortName: string;
  };

  header: {
    nav: NavItem[];
    primaryCta: {
      label: string;
      href: (lang: string) => string;
    };
  };

  hero: {
    headline: string;
    subheadline: string;
    bullets: string[];
    primaryCta: {
      label: string;
      href: (lang: string) => string;
    };
    secondaryCta: {
      label: string;
      href: `#${LandingSectionId}`;
    };
    proof: {
      text: string;
    };
  };

  trust: {
    title: string;
    items: { label: string }[]; // simple (luego podés pasar logos)
  };

  services: {
    id: LandingSectionId;
    title: string;
    subtitle: string;
    cards: Feature[];
  };

  howItWorks: {
    id: LandingSectionId;
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };

  aiAssistant: {
    id: LandingSectionId;
    title: string;
    subtitle: string;
    bullets: string[];
  };

  pricing: {
    id: LandingSectionId;
    title: string;
    subtitle: string;
    plans: Plan[];
    note: string;
  };
};

/**
 * Contenido base por idioma.
 * En esta etapa lo dejamos hardcodeado para avanzar rápido.
 * Después lo conectás a tu diccionario (supabase/local) si querés.
 */
const CONTENT: Record<Lang, LandingContent> = {
  es: {
    brand: { name: "EuroNotify", shortName: "EuroNotify" },

    header: {
      nav: [
        { label: "Servicios", href: "#servicios" },
        { label: "Cómo funciona", href: "#como-funciona" },
        { label: "Precios", href: "#precios" },
        { label: "Asistente IA", href: "#asistente-ia" },
      ],
      primaryCta: {
        label: "Acceso Cliente",
        href: (lang) => `/${lang}/login`,
      },
    },

    hero: {
      headline: "Certificación digital y notificaciones con validez y trazabilidad",
      subheadline:
        "Centralizá certificaciones, evidencia y notificaciones en un flujo simple: elegir plan, iniciar sesión y operar.",
      bullets: [
        "Trazabilidad completa y auditoría",
        "Plantillas, evidencia y seguimiento",
        "Listo para operar en minutos",
      ],
      primaryCta: {
        label: "Ver planes",
        href: (lang) => `/${lang}#precios`,
      },
      secondaryCta: {
        label: "Cómo funciona",
        href: "#como-funciona",
      },
      proof: { text: "Diseñado para equipos que necesitan control, registro y velocidad." },
    },

    trust: {
      title: "Confiado por equipos que operan con compliance",
      items: [{ label: "Finanzas" }, { label: "Legal" }, { label: "RRHH" }, { label: "Operaciones" }],
    },

    services: {
      id: "servicios",
      title: "Servicios",
      subtitle: "Las piezas esenciales para certificar y notificar sin fricción.",
      cards: [
        {
          title: "Certificación digital",
          description: "Generación de certificados y evidencia con estructura consistente.",
        },
        {
          title: "Notificaciones",
          description: "Envios con registro, estados, y trazabilidad para auditoría.",
        },
        {
          title: "Panel y reportes",
          description: "Historial, exportación y búsqueda rápida por caso/usuario.",
        },
      ],
    },

    howItWorks: {
      id: "como-funciona",
      title: "Cómo funciona",
      steps: [
        {
          title: "Elegí un plan",
          description: "Seleccionás Starter/Pro/Enterprise según volumen y necesidades.",
        },
        {
          title: "Login rápido",
          description: "Acceso cliente y alta mínima para empezar a operar.",
        },
        {
          title: "Emití y seguí",
          description: "Creás, enviás, y monitoreás el estado con trazabilidad.",
        },
      ],
    },

    aiAssistant: {
      id: "asistente-ia",
      title: "Asistente IA",
      subtitle: "Automatizá el trabajo repetitivo y mantené consistencia documental.",
      bullets: [
        "Sugerencias de plantillas y campos",
        "Revisión de consistencia y faltantes",
        "Ayuda contextual en cada paso",
      ],
    },

    pricing: {
      id: "precios",
      title: "Planes",
      subtitle: "Arrancá simple y escalá cuando aumente tu volumen.",
      plans: [
        {
          id: "starter",
          name: "Starter",
          priceMonthly: 29,
          currency: "EUR",
          tagline: "Para comenzar con certificaciones y notificaciones básicas.",
          features: [
            "Usuarios limitados",
            "Historial y trazabilidad",
            "Soporte estándar",
          ],
          ctaLabel: "Elegir Starter",
          ctaHref: (lang) => `/${lang}/plans?plan=starter`,
        },
        {
          id: "pro",
          name: "Pro",
          priceMonthly: 79,
          currency: "EUR",
          tagline: "Para equipos que necesitan control y velocidad operativa.",
          features: [
            "Más usuarios y volumen",
            "Plantillas avanzadas",
            "Exportación y reportes",
          ],
          ctaLabel: "Elegir Pro",
          ctaHref: (lang) => `/${lang}/plans?plan=pro`,
          highlighted: true,
        },
        {
          id: "enterprise",
          name: "Enterprise",
          priceMonthly: 0,
          currency: "EUR",
          tagline: "Para integraciones, compliance estricto y SLA dedicado.",
          features: [
            "SLA y soporte dedicado",
            "SSO / Integraciones",
            "Controles y permisos avanzados",
          ],
          ctaLabel: "Hablar con ventas",
          ctaHref: (lang) => `/${lang}/contact?topic=enterprise`,
        },
      ],
      note: "Los precios son orientativos. Podés ajustar moneda/IVA/periodicidad según tu modelo.",
    },
  },

  // Por ahora clonamos estructura; después traducís.
  en: null as any,
  pt: null as any,
  fr: null as any,
  it: null as any,
};

// Fallback simple: si no completaste otros idiomas, usa ES.
CONTENT.en = CONTENT.es;
CONTENT.pt = CONTENT.es;
CONTENT.fr = CONTENT.es;
CONTENT.it = CONTENT.es;

export function getLandingContent(lang: string): LandingContent {
  const normalized = (lang || "es").toLowerCase() as Lang;
  return CONTENT[normalized] ?? CONTENT.es;
}
