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
        <div className="container-wide pb-10 pt-6 md:pb-20 md:pt-12">
          {heroTitle && heroVariant === 'default' && (
            <div className="relative mb-8 overflow-hidden rounded-2xl bg-indigo-600 px-5 py-8 text-white shadow-xl sm:rounded-3xl sm:px-12 sm:py-12 md:py-16">
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                <div className="md:flex-1">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200 sm:text-xs">
                    {TAGLINE}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                      {heroTitle}
                    </h1>
                    {cta && <div className="hidden sm:block sm:ml-auto">{cta}</div>}
                  </div>
                  {heroSubtitle && (
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-indigo-100/90 sm:mt-6 sm:text-lg">
                      {heroSubtitle}
                    </p>
                  )}
                  {cta && <div className="mt-6 sm:hidden">{cta}</div>}
                </div>
                {heroImage ? (
                  <div className="hidden md:block md:w-64 lg:w-80">
                    <img src={heroImage} alt={heroTitle} className="aspect-square w-full rounded-2xl object-cover shadow-2xl ring-4 ring-white/20" />
                  </div>
                ) : null}
              </div>

              {/* Decorative circles - Adjusted for mobile */}
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl sm:-right-20 sm:h-96 sm:w-96" />
              <div className="absolute -bottom-10 -left-16 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl sm:-bottom-20 sm:h-72 sm:w-72" />
            </div>
          )}

          {heroTitle && heroVariant === 'minimal' && (
            <div className="mb-10 text-center md:mb-20">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                {heroTitle}
              </h1>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-indigo-600 sm:mt-6 sm:w-20" />
            </div>
          )}

          <div className="animate-slide-up">{children}</div>
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
