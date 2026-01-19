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
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(94,234,212,0.11),_transparent_60%)]" />
      <Navbar settings={settings} />
      <main className="flex-1">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-12 pt-10 sm:px-6 lg:px-8">
          {heroTitle && heroVariant === 'default' && (
            <div className="glass relative overflow-hidden rounded-3xl px-6 py-7 shadow-[0_35px_80px_rgba(15,23,42,0.9)] sm:px-8 sm:py-9">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(129,230,217,0.22),transparent_60%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.28),transparent_60%)] opacity-70" />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
                <div className="md:flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80 sm:text-[0.7rem]">
                    {TAGLINE}
                  </p>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-[2.6rem]">
                      {heroTitle}
                    </h1>
                    {cta && <div className="ml-auto">{cta}</div>}
                  </div>
                  {heroSubtitle && (
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                      {heroSubtitle}
                    </p>
                  )}
                </div>
                {heroImage ? (
                  <div className="mt-4 md:mt-0 md:ml-6 md:w-56">
                    <img src={heroImage} alt={heroTitle} className="rounded-xl shadow-lg object-cover w-full animate-fade-up" />
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {heroTitle && heroVariant === 'minimal' && (
            <div className="relative py-20 md:py-28">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="animate-fade-up text-4xl font-extrabold leading-tight tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
                  {heroTitle}
                </h1>
                {/* subtle thin divider to keep background minimal */}
                <div className="mx-auto mt-6 h-px w-24 bg-slate-800/60" />
              </div>
            </div>
          )}
          <div className="space-y-6 md:space-y-8">{children}</div>
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
