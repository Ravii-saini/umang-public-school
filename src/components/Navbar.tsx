"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import { SCHOOL_NAME } from "@/lib/siteConstants";
import logo from "@/assets/logo.jpg";

type Props = {
  settings?: SiteSettings | null;
};

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/notices", label: "Notices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faculties", label: "Faculties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/downloads", label: "Downloads" }
];

export function Navbar({ settings }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      {/* Animated gradient border */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-200% animate-gradient-shift" />

      <div className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-2 font-heading font-bold text-slate-900 transition-all hover:opacity-90 sm:gap-3"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-75" />
            <Image
              src={logo}
              alt={SCHOOL_NAME}
              width={36}
              height={36}
              className="relative rounded-full border border-slate-200 object-cover shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight sm:text-lg bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent">
              {SCHOOL_NAME}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-500 leading-none">estd 2023</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className="group relative rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:text-indigo-600"
            >
              <span className="relative z-10">{link.label}</span>
              <div className="absolute inset-x-1 bottom-1.5 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 group-hover:w-[calc(100%-0.5rem)]" />
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200/60 bg-white/50 shadow-sm transition-all hover:bg-white lg:hidden"
          aria-label="Toggle Menu"
        >
          <span className={`h-0.5 w-5 rounded-full bg-slate-600 transition-all duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 rounded-full bg-slate-600 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 rounded-full bg-slate-600 transition-all duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        {/* Semi-transparent backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Side Drawer */}
        <div
          className={`absolute right-0 top-0 h-[100dvh] w-[300px] bg-white shadow-2xl transition-transform duration-500 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col bg-white">
            {/* Header section in drawer */}
            <div className="flex flex-col gap-1 border-b border-slate-100 px-8 py-10">
              <p className="text-xl font-black uppercase tracking-tight text-slate-900 leading-none">{SCHOOL_NAME}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500 mt-1">Navigation Menu</p>
            </div>

            {/* Main Links section - made very simple to avoid layout issues */}
            <div className="flex-grow overflow-y-auto px-4 py-6">
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as any}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 px-6 py-5 text-base font-extrabold text-slate-800 transition-all hover:bg-slate-100 hover:text-indigo-600 active:scale-95 border border-slate-100"
                  >
                    <span>{link.label}</span>
                    <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom help section */}
            <div className="border-t border-slate-100 p-8">
              <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Addmission Help</p>
                <p className="mt-2 text-[11px] font-medium leading-relaxed text-slate-400">
                  Contact our school office for admissions or any queries.
                </p>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-xs font-black text-white transition-all hover:bg-indigo-500 active:scale-95"
                >
                  Contact Us Now
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
