// components/home/HomeData.tsx
"use client";

import React, { useCallback } from "react";
import Hero from "./Hero";
import TrustSection from "./TrustSection";
import { getLandingContent } from "./data/landing";

export default function HomeData({ lang }: { lang: string }) {
  const content = getLandingContent(lang);

  const onStart = useCallback(() => {
    const el = document.getElementById(content.pricing.id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [content.pricing.id]);

  return (
    <>
      <Hero onStart={onStart} />
      <TrustSection />

      {/* SERVICES */}
      <section id={content.services.id} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">
              {content.services.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {content.services.subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.services.cards.map((c) => (
              <div key={c.title} className="card-base card-hover p-8">
                <h3 className="text-xl font-semibold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id={content.howItWorks.id}
        className="py-20 bg-white border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">
              {content.howItWorks.title}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.howItWorks.steps.map((s, idx) => (
              <div key={s.title} className="card-base p-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center font-bold text-primary-700">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ASSISTANT */}
      <section id={content.aiAssistant.id} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">
              {content.aiAssistant.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {content.aiAssistant.subtitle}
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto card-base p-8">
            <ul className="space-y-3 text-slate-700">
              {content.aiAssistant.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id={content.pricing.id}
        className="py-24 bg-white border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">
              {content.pricing.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {content.pricing.subtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {content.pricing.plans.map((p) => (
              <div
                key={p.id}
                className={[
                  "card-base p-8",
                  p.highlighted ? "ring-2 ring-primary-500 shadow-primary-glow" : "",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {p.name}
                  </h3>
                  {p.highlighted ? (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700">
                      Recomendado
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-slate-600">{p.tagline}</p>

                <div className="mt-6 text-4xl font-bold text-slate-900">
                  {p.priceMonthly > 0 ? (
                    <>
                      {p.priceMonthly}
                      <span className="text-base font-semibold text-slate-500">
                        {" "}
                        {p.currency}/mes
                      </span>
                    </>
                  ) : (
                    "Custom"
                  )}
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={p.ctaHref(lang)}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-white font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/25"
                >
                  {p.ctaLabel}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            {content.pricing.note}
          </p>
        </div>
      </section>
    </>
  );
}
