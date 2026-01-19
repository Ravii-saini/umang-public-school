"use client";

import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/types";

type Props = {
  announcements: Announcement[];
};

export function AnnouncementCarousel({ announcements }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!announcements || announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [announcements?.length]);

  // Show placeholder if no announcements
  if (!announcements || announcements.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl flex-shrink-0" role="img" aria-label="">
            📢
          </span>
          <div className="flex-1">
            <p className="font-semibold text-slate-50 text-lg">Important Announcements</p>
            <p className="text-slate-200 text-sm mt-1">
              No announcements yet. Add them in the admin panel under "Announcements (Carousel)".
            </p>
          </div>
        </div>
      </div>
    );
  }

  const current = announcements[currentIndex];

  const content = (
    <div className="flex items-center gap-3">
      {current.icon && (
        <span className="text-2xl flex-shrink-0" role="img" aria-label="">
          {current.icon}
        </span>
      )}
      <div className="flex-1">
        <p className="font-semibold text-slate-50 text-lg">{current.title}</p>
        {current.description && (
          <p className="text-slate-200 text-sm mt-1">{current.description}</p>
        )}
      </div>
    </div>
  );

  const wrapperClassName =
    "relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-6 shadow-lg transition-all duration-500 ease-in-out";

  if (current.link) {
    return (
      <div className={wrapperClassName}>
        <a
          href={current.link}
          target={current.link.startsWith("http") ? "_blank" : undefined}
          rel={current.link.startsWith("http") ? "noopener noreferrer" : undefined}
          className="block text-white hover:opacity-90 transition-opacity"
        >
          {content}
        </a>
        {announcements.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {announcements.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to announcement ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      {content}
      {announcements.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {announcements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to announcement ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
