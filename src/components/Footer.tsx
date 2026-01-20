import type { SiteSettings } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import {
  SCHOOL_NAME,
  TAGLINE,
  ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE1,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
} from "@/lib/siteConstants";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/notices", label: "Notices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-indigo-600/30 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Column 1: Brand & Social (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-2xl">
                <Image src={logo} alt={SCHOOL_NAME} width={40} height={40} className="h-full w-full rounded-lg object-cover" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-tight text-white">{SCHOOL_NAME}</span>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-400">{TAGLINE}</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Nurturing students into lifelong learners and responsible global citizens.
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Follow Us</p>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 w-fit">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 transition-all group-hover:border-indigo-500 group-hover:bg-indigo-600/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </div>
                <span className="text-sm font-semibold text-slate-400 group-hover:text-indigo-400 transition-colors">{INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </div>

          {/* Quick Links & Contact Columns (8/12) */}
          <div className="lg:col-span-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {/* Quick Links */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Explore</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href as any} className="text-sm font-medium text-slate-400 transition-all hover:text-indigo-400 hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <a href={`tel:${CONTACT_PHONE}`} className="group flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.93.38 1.84.78 2.68a2 2 0 01-.45 2.11L9.91 9.91a14 14 0 006 6l1.4-1.4a2 2 0 012.11-.45c.84.4 1.75.66 2.68.78A2 2 0 0122 16.92z" /></svg>
                    </div>
                    <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{CONTACT_PHONE}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT_PHONE1}`} className="group flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.93.38 1.84.78 2.68a2 2 0 01-.45 2.11L9.91 9.91a14 14 0 006 6l1.4-1.4a2 2 0 012.11-.45c.84.4 1.75.66 2.68.78A2 2 0 0122 16.92z" /></svg>
                    </div>
                    <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{CONTACT_PHONE1}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-center gap-3 max-w-[200px] sm:max-w-none">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </div>
                    <span className="truncate text-sm font-medium text-slate-400 group-hover:text-white transition-colors" title={CONTACT_EMAIL}>{CONTACT_EMAIL}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Address</h3>
              <div className="flex gap-3 text-sm leading-relaxed text-slate-400">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <span>{ADDRESS}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-900 pt-8 sm:flex-row">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
            © {new Date().getFullYear()} Umang Public School.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <Link href="/" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

