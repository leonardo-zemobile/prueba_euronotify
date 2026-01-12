import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/auth-context";
import { Suspense } from "react";
import Loading from "./loading";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import SiteHeader from "@/components/home/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return {
    title: "Website title",
    description: "Website Slogan",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/icon0.svg",
      apple: "/apple-icon.png",
      other: { rel: "manifest", url: "/manifest.json" },
    },
    openGraph: {
      title: "Website title",
      description: "Website Slogan",
      images: ["/og-default.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Website title",
      description: "Website Slogan",
      images: ["/twitter-default.png"],
    },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const { lang } = params;

  return (
    <html lang={lang}>
      <head>
        <meta
          name="facebook-domain-verification"
          content="g0xkoxvc6k17n0yz....."
        />
        <meta name="apple-mobile-web-app-title" content="websiteName" />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MP7KW38F');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Meta Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
              n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4373333056247362');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* End Meta Pixel Script */}
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MP7KW38F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ThemeProvider>
          <AuthProvider>
            {/* Header global para que se parezca al preview de Google AI */}
            <SiteHeader lang={lang} />

            <Suspense fallback={<Loading />}>{children}</Suspense>

            <SpeedInsights />
            <Analytics />
          </AuthProvider>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
