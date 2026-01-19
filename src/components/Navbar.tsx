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
  { href: "/studio", label: "Admin" }
];

export function Navbar({ settings }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-slate-50">
          <Image src={logo} alt={SCHOOL_NAME} width={36} height={36} className="rounded-full object-cover shadow-md" />
          <span className="hidden sm:inline">{SCHOOL_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-medium text-slate-300 sm:flex sm:text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href as unknown as any}
              className="rounded-full px-3 py-1 transition hover:bg-slate-800/80 hover:text-slate-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
