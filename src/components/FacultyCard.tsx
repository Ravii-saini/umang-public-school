"use client";

import Image from "next/image";
import type { Faculty } from "@/lib/types";

type Props = {
  faculty: Faculty;
};

export function FacultyCard({ faculty }: Props) {
  return (
    <div className="card-shadow flex flex-col items-center gap-4 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-6 ring-1 ring-slate-900/80 transition-all hover:scale-[1.02] hover:shadow-lg">
      {/* Photo */}
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-cyan-500/30 ring-2 ring-cyan-500/20">
        {faculty.photoUrl ? (
          <Image
            src={faculty.photoUrl}
            alt={faculty.name}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800 text-2xl text-slate-400">
            👤
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-lg font-semibold text-slate-50">{faculty.name}</h3>
        <p className="text-sm font-medium text-cyan-400">{faculty.designation}</p>
        {faculty.subject && (
          <p className="text-xs text-slate-400">{faculty.subject}</p>
        )}
      </div>

      {/* Contact */}
      {faculty.mobileNumber && (
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
          <span className="text-slate-400">📱</span>
          <a
            href={`tel:${faculty.mobileNumber}`}
            className="hover:text-cyan-400 transition-colors"
          >
            {faculty.mobileNumber}
          </a>
        </div>
      )}
      {faculty.email && (
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="text-slate-400">✉️</span>
          <a
            href={`mailto:${faculty.email}`}
            className="hover:text-cyan-400 transition-colors break-all"
          >
            {faculty.email}
          </a>
        </div>
      )}
    </div>
  );
}
