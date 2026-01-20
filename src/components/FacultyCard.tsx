"use client";

import Image from "next/image";
import type { Faculty } from "@/lib/types";

type Props = {
  faculty: Faculty;
};

export function FacultyCard({ faculty }: Props) {
  return (
    <div className="group relative">
      {/* Animated gradient border on hover */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100 animate-gradient-shift" />

      <div className="card relative flex flex-col items-center gap-5 overflow-hidden text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
        {/* Profile photo with rotating gradient ring */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-400 via-violet-500 to-cyan-400 opacity-75 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-md animate-gradient-shift" />
          <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:ring-indigo-100">
            {faculty.photoUrl ? (
              <Image
                src={faculty.photoUrl}
                alt={faculty.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="112px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 via-violet-100 to-cyan-100 text-4xl">
                👤
              </div>
            )}
          </div>
        </div>

        {/* Info section */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-lg font-bold transition-all duration-300 group-hover:scale-105">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-violet-600 group-hover:to-cyan-600">
              {faculty.name}
            </span>
          </h3>
          <p className="text-sm font-bold text-indigo-600">{faculty.designation}</p>
          {faculty.subject && (
            <p className="text-xs font-medium text-slate-500">{faculty.subject}</p>
          )}
        </div>

        {/* Contact button with gradient */}
        {faculty.mobileNumber && (
          <a
            href={`tel:${faculty.mobileNumber}`}
            className="group/contact relative inline-flex items-center gap-2 overflow-hidden rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-white to-indigo-50/50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-md transition-all duration-300 hover:border-indigo-400 hover:from-indigo-50 hover:to-violet-50 hover:shadow-lg hover:scale-105"
          >
            <svg className="h-4 w-4 transition-transform duration-300 group-hover/contact:rotate-12 group-hover/contact:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.09 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.93.38 1.84.78 2.68a2 2 0 01-.45 2.11L9.91 9.91a14 14 0 006 6l1.4-1.4a2 2 0 012.11-.45c.84.4 1.75.66 2.68.78A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold">{faculty.mobileNumber}</span>
          </a>
        )}
      </div>
    </div>
  );
}
