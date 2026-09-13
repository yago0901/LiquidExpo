import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/en",
        pt: "/pt",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('liquidexpo-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
      </head>
      <body className="flex h-dvh flex-col overflow-hidden bg-void text-ink">
        <NextIntlClientProvider>
          <JsonLd />
          <div className="film-grain" />
          <PageTransitionProvider>
            <SkipLink />
            <Header />
            <main id="main-content" className="min-h-0 flex-1 overflow-y-auto">
              {children}
            </main>
          </PageTransitionProvider>
        </NextIntlClientProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
