"use client";

import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/types";

type Props = {
  announcements: Announcement[];
  variant?: "default" | "minimal";
};

export function AnnouncementCarousel({ announcements, variant = "default" }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!announcements || announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [announcements?.length]);

  if (!announcements || announcements.length === 0) return null;

  const current = announcements[currentIndex];

  // Minimal Variant (Text only, for banners)
  if (variant === "minimal") {
    const content = (
      <div className="flex items-center gap-2 animate-fade-in">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">
          {current.icon || "📢"}
        </span>
        <p className="text-sm font-medium text-white line-clamp-1">
          {current.title}
          {current.description && <span className="opacity-80 mx-1">- {current.description}</span>}
        </p>
      </div>
    );

    if (current.link) {
      return (
        <a
          href={current.link}
          target={current.link.startsWith("http") ? "_blank" : undefined}
          className="block w-full hover:opacity-90"
        >
          {content}
        </a>
      );
    }
    return <div className="w-full">{content}</div>;
  }

  // Default Card Variant
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
        <Indicators count={announcements.length} current={currentIndex} onSelect={setCurrentIndex} />
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      {content}
      <Indicators count={announcements.length} current={currentIndex} onSelect={setCurrentIndex} />
    </div>
  );
}

function Indicators({ count, current, onSelect }: { count: number; current: number; onSelect: (i: number) => void }) {
  if (count <= 1) return null;
  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect(idx);
          }}
          className={`h-2 rounded-full transition-all ${idx === current ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          aria-label={`Go to announcement ${idx + 1}`}
        />
      ))}
    </div>
  );
}
