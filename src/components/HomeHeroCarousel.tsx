"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/types";
import { TAGLINE } from "@/lib/siteConstants";

type Props = {
    items: GalleryItem[];
};

export function HomeHeroCarousel({ items }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (items.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [items.length]);

    if (!items || items.length === 0) {
        return null;
    }

    const current = items[currentIndex];

    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
            {items.map((item, index) => (
                <div
                    key={item._id}
                    className={`absolute inset-0 transition-all duration-1000 ${index === currentIndex
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                        }`}
                >
                    {item.imageUrl && (
                        <Image
                            src={item.imageUrl}
                            alt={item.title || "School Image"}
                            fill
                            className="object-cover transition-transform duration-[7000ms] ease-out"
                            style={{
                                transform: index === currentIndex ? 'scale(1.05)' : 'scale(1)'
                            }}
                            priority={index === 0}
                        />
                    )}
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-violet-900/20" />
                </div>
            ))}

            {/* Modern Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="space-y-6 px-4">
                    {/* Animated gradient tagline */}
                    <p className="animate-fade-in-down text-base font-bold tracking-widest uppercase sm:text-lg md:text-2xl drop-shadow-lg">
                        <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-200% bg-clip-text text-transparent animate-gradient-shift">
                            Learning Today, Leading Tomorrow
                        </span>
                    </p>

                    {/* Main heading with slide-up animation */}
                    <h2 className="animate-fade-in-up font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-2xl leading-tight">
                        Best English Medium School in{" "}
                        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            Bhiwadi
                        </span>
                    </h2>

                    {/* Subtitle with delay */}
                    <p className="animate-fade-in text-lg font-semibold text-indigo-100 sm:text-xl md:text-2xl drop-shadow-md">
                        Nursery to 10th Class
                    </p>

                    {/* Decorative line */}
                    <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-glow" />
                </div>
            </div>

            {/* Modern Indicators with glow */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`group relative h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "w-12 bg-gradient-to-r from-indigo-400 to-cyan-400"
                                : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {index === currentIndex && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 blur-sm animate-pulse-glow" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
