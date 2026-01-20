import type { ReactNode } from "react";
import type { SiteSettings } from "@/lib/types";
import { TAGLINE } from "@/lib/siteConstants";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type Props = {
  settings?: SiteSettings | null;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string | null;
  heroVariant?: 'default' | 'minimal';
  cta?: ReactNode;
  children: ReactNode;
};

export function PageShell({ settings, heroTitle, heroSubtitle, heroImage, heroVariant = 'default', cta, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar settings={settings} />
      <main className="flex-1">
        <div className="container-wide pb-12 pt-8 md:pb-20 md:pt-12">
          {heroTitle && heroVariant === 'default' && (
            <div className="relative mb-12 overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-white shadow-xl sm:px-12 md:py-16">
              <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
                <div className="md:flex-1">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-200">
                    {TAGLINE}
                  </p>
                  <div className="flex items-center gap-4">
                    <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                      {heroTitle}
                    </h1>
                    {cta && <div className="ml-auto">{cta}</div>}
                  </div>
                  {heroSubtitle && (
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
                      {heroSubtitle}
                    </p>
                  )}
                </div>
                {heroImage ? (
                  <div className="hidden md:block md:w-64 lg:w-80">
                    <img src={heroImage} alt={heroTitle} className="aspect-square w-full rounded-2xl object-cover shadow-2xl ring-4 ring-white/20" />
                  </div>
                ) : null}
              </div>

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            </div>
          )}

          {heroTitle && heroVariant === 'minimal' && (
            <div className="mb-12 text-center md:mb-20">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                {heroTitle}
              </h1>
              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-blue-600" />
            </div>
          )}

          <div className="animate-slide-up">{children}</div>
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
