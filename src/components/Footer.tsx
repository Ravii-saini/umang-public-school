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
    <footer className="bg-white border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* left: badge + school name + address */}
          <div className="flex items-start gap-4 md:w-1/3 md:pr-6 md:border-r md:border-slate-100">
            <div className="h-10 w-10 flex-none rounded-full overflow-hidden ring-1 ring-slate-100 flex items-center justify-center shadow-sm bg-white/5">
              <Image src={logo} alt={SCHOOL_NAME} width={40} height={40} className="h-full w-full object-cover" />
            </div>

            <div className="text-sm text-slate-500">
              <p className="font-semibold text-slate-700">{SCHOOL_NAME}</p>
              <p className="max-w-xs leading-relaxed mt-2 flex items-start gap-2 text-slate-500">
                <svg className="flex-none mt-1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="9" r="2.2" fill="currentColor" />
                </svg>
                <span>{ADDRESS}</span>
              </p>
            </div>
          </div>

          {/* center: compact nav (light, subtle) */}
          <nav aria-label="Footer navigation" className="text-sm md:w-1/3 md:px-6">
            <ul className="flex flex-col md:flex-row items-start md:items-center md:justify-center gap-3 md:gap-6 text-slate-500">
              <li>
                <Link href="/" className="hover:text-slate-700 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-slate-700 transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-slate-700 transition">
                  Notices
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-slate-700 transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-700 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* right: contact details */}
          <div className="flex flex-col items-start gap-4 text-slate-500 md:w-1/3 md:pl-6 md:border-l md:border-slate-100">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-3 text-sm hover:text-slate-700 transition" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 8.5v7a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 8.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="break-all">{CONTACT_EMAIL}</span>
            </a>

            <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center gap-3 text-sm hover:text-slate-700 transition" aria-label="Phone primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.93.38 1.84.78 2.68a2 2 0 01-.45 2.11L9.91 9.91a14 14 0 006 6l1.4-1.4a2 2 0 012.11-.45c.84.4 1.75.66 2.68.78A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{CONTACT_PHONE}</span>
            </a>

            {CONTACT_PHONE1 && (
              <a href={`tel:${CONTACT_PHONE1}`} className="inline-flex items-center gap-3 text-sm hover:text-slate-700 transition" aria-label="Phone secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.93.38 1.84.78 2.68a2 2 0 01-.45 2.11L9.91 9.91a14 14 0 006 6l1.4-1.4a2 2 0 012.11-.45c.84.4 1.75.66 2.68.78A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{CONTACT_PHONE1}</span>
              </a>
            )}

            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm hover:text-slate-700 transition" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="17.3" cy="6.7" r="0.4" fill="currentColor" />
              </svg>
              <span className="font-medium text-slate-600">{INSTAGRAM_HANDLE ?? "@umang_public_school"}</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
         Umang Public School© 2026. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
