"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/types";

type Props = {
  items: GalleryItem[];
};

export function GalleryCarousel({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  if (!items || items.length === 0) {
    return (
      <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-80 md:h-96">
        <div className="flex h-full items-center justify-center">
          <p className="text-slate-400">No gallery items yet.</p>
        </div>
      </div>
    );
  }

  const current = items[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Main Carousel Container */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-900 shadow-xl sm:h-80 md:h-96">
        {/* Image */}
        <div className="relative h-full w-full">
          {current.imageUrl ? (
            <Image
              src={current.imageUrl}
              alt={current.title}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="100vw"
              priority={currentIndex === 0}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-800/60 text-slate-300">
              No image
            </div>
          )}

          {/* Overlay with title and category */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-xl font-semibold text-white">{current.title}</p>
              <p className="text-sm uppercase tracking-wider text-slate-300 mt-1">
                {current.category || "Campus life"}
              </p>
            </div>
          </div>
        </div>

        {/* Left Arrow */}
        {items.length > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {items.length > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      {items.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex
                  ? "w-8 bg-cyan-400"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {items.length > 1 && (
        <div className="mt-2 text-center text-sm text-slate-400">
          {currentIndex + 1} / {items.length}
        </div>
      )}
    </div>
  );
}
