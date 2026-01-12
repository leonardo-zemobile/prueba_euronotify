// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { updateSession } from "./lib/supabase/supabase_middleware";

// --- Configuration for Auth Routes ---
// Paths to exclude from UTM logic. Add any other auth-related paths here.
const AUTH_PATHS = ["/auth/", "/login", "/verify", "/dashboard/"];
// URL parameters that signal an auth callback.
const AUTH_PARAM_KEYS = ["code", "token_hash", "error", "error_description", "token", "redirect_to"];

const UTM_KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "utm_adgroup", "ad_id", "gad_campaignid", "gad_source",
  "gbraid", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic", "utm_remarketing"
];

export async function proxy(request: NextRequest) {
  let response = i18nRouter(request, i18nConfig);
  const { pathname, searchParams } = request.nextUrl;

  // --- Determine if this is an authentication-related request ---
  const isAuthPath = AUTH_PATHS.some(path => pathname.startsWith(path));
  const hasAuthParams = AUTH_PARAM_KEYS.some(key => searchParams.has(key));

  // Only run the UTM logic if it's NOT an auth-related request.
  if (!isAuthPath && !hasAuthParams) {
    // ---- UTM & adsMetadata capture ----
    const url = request.nextUrl;
    const sp = url.searchParams;

    let stored: Record<string, string> = {};
    try {
      stored = request.cookies.get("utm")?.value
        ? JSON.parse(request.cookies.get("utm")!.value)
        : {};
    } catch {
      stored = {};
    }

    const incoming: Record<string, string> = {};
    const rawAds = sp.get("adsMetadata") || sp.get("ads");
    if (rawAds) {
      try {
        const parsed = JSON.parse(decodeURIComponent(rawAds));
        Object.entries(parsed || {}).forEach(([k, v]) => {
          if (UTM_KEYS.includes(k) && typeof v === "string" && v.trim().length > 0) {
            incoming[k] = v.trim();
          }
        });
      } catch { /* ignore parse errors */ }
    }

    for (const k of UTM_KEYS) {
      const v = sp.get(k);
      if (v && v.trim()) incoming[k] = v.trim();
    }

    if (Object.keys(incoming).length) {
      const merged = { ...stored, ...incoming };
      response.cookies.set("utm", JSON.stringify(merged), {
        path: "/",
        maxAge: 60 * 60 * 24 * 90, // 90 days
      });

      const CLEAN_URL = false;
      if (CLEAN_URL) {
        const cleaned = url.clone();
        let changed = false;
        for (const k of [...UTM_KEYS, "adsMetadata", "ads"]) {
          if (cleaned.searchParams.has(k)) {
            cleaned.searchParams.delete(k);
            changed = true;
          }
        }
        if (changed) {
          const redirectRes = NextResponse.redirect(cleaned);
          redirectRes.cookies.set("utm", JSON.stringify(merged), {
            path: "/",
            maxAge: 60 * 60 * 24 * 90,
          });
          return await updateSession(request, redirectRes);
        }
      }
    }
    // ---- end capture ----
  }

  // Finally, always update the Supabase session for every request
  return await updateSession(request, response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\..*|static).*)",
  ],
};