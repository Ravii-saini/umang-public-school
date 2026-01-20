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
  return (
    <header className="sticky top-0 z-40 glass-nav">
      {/* Animated gradient border */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-200% animate-gradient-shift" />

      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 font-heading font-bold text-slate-900 transition-all hover:opacity-90">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 blur transition-opacity duration-300 group-hover:opacity-75" />
            <Image
              src={logo}
              alt={SCHOOL_NAME}
              width={40}
              height={40}
              className="relative rounded-full object-cover shadow-md ring-2 ring-white transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="hidden text-lg tracking-tight sm:inline bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text">
            {SCHOOL_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href as unknown as any}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:text-indigo-600"
            >
              <span className="relative z-10">{link.label}</span>
              {/* Hover background */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Animated underline */}
              <div className="absolute bottom-1 left-1/2 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 group-hover:left-2 group-hover:w-[calc(100%-1rem)]" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
