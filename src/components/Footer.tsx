import type { SiteSettings } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import {
  SCHOOL_NAME,
  ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE1,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
} from "@/lib/siteConstants";

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Animated gradient top border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-200% animate-gradient-shift" />

      <div className="container-wide py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-0.5 shadow-lg transition-all duration-300 hover:shadow-glow-violet">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-900">
                  <Image src={logo} alt={SCHOOL_NAME} width={40} height={40} className="h-9 w-9 rounded object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <div>
                <span className="font-heading text-lg font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">{SCHOOL_NAME}</span>
                <p className="text-xs font-medium bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Learning Today, Leading Tomorrow</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-300">
              <svg className="mt-0.5 h-4 w-4 flex-none text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="9" r="2.5" fill="currentColor" />
              </svg>
              <span className="max-w-xs leading-relaxed">{ADDRESS}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li><Link href="/" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 group">
                <span className="h-1 w-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                Home
              </Link></li>
              <li><Link href="/events" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 group">
                <span className="h-1 w-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                Events
              </Link></li>
              <li><Link href="/notices" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 group">
                <span className="h-1 w-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                Notices
              </Link></li>
              <li><Link href="/gallery" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 group">
                <span className="h-1 w-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                Gallery
              </Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 group">
                <span className="h-1 w-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                Contact
              </Link></li>
            </ul>
          </nav>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Get in Touch</h3>
            <div className="flex flex-col gap-2 text-xs text-slate-300">
              <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-center gap-2 transition-all hover:text-cyan-400" aria-label="Email">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 text-cyan-400 transition-all group-hover:bg-cyan-500/20 group-hover:shadow-glow-cyan">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 8.5v7a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 8.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="break-all text-xs">{CONTACT_EMAIL}</span>
              </a>

              <a href={`tel:${CONTACT_PHONE}`} className="group flex items-center gap-2 transition-all hover:text-indigo-400" aria-label="Phone primary">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 text-indigo-400 transition-all group-hover:bg-indigo-500/20 group-hover:shadow-glow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.93.38 1.84.78 2.68a2 2 0 01-.45 2.11L9.91 9.91a14 14 0 006 6l1.4-1.4a2 2 0 012.11-.45c.84.4 1.75.66 2.68.78A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>{CONTACT_PHONE}</span>
              </a>

              {CONTACT_PHONE1 && (
                <a href={`tel:${CONTACT_PHONE1}`} className="group flex items-center gap-2 transition-all hover:text-violet-400" aria-label="Phone secondary">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 text-violet-400 transition-all group-hover:bg-violet-500/20 group-hover:shadow-glow-violet">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.93.38 1.84.78 2.68a2 2 0 01-.45 2.11L9.91 9.91a14 14 0 006 6l1.4-1.4a2 2 0 012.11-.45c.84.4 1.75.66 2.68.78A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span>{CONTACT_PHONE1}</span>
                </a>
              )}

              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 transition-all hover:text-pink-400" aria-label="Instagram">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/50 text-pink-400 transition-all group-hover:bg-pink-500/20 group-hover:shadow-glow group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="17.3" cy="6.7" r="0.4" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-medium">{INSTAGRAM_HANDLE ?? "@umang_public_school"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-2 border-t border-slate-700/50 pt-6 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Umang Public School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

