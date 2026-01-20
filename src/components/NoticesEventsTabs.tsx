"use client";

import { useState } from "react";
import Link from "next/link";
import { NoticeCard } from "@/components/NoticeCard";
import { EventCard } from "@/components/EventCard";
import type { Notice, Event } from "@/lib/types";

type Props = {
    notices: Notice[];
    events: Event[];
};

export function NoticesEventsTabs({ notices, events }: Props) {
    const [activeTab, setActiveTab] = useState<"notices" | "events">("notices");

    return (
        <div className="section-shell">
            <div className="mb-6 flex items-center justify-between">
                {/* Modern Tabs with gradient */}
                <div className="relative flex rounded-full bg-gradient-to-r from-slate-100 to-slate-50 p-1 shadow-inner">
                    <button
                        onClick={() => setActiveTab("notices")}
                        className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${activeTab === "notices"
                                ? "text-white"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        {activeTab === "notices" && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg animate-gradient-shift" />
                        )}
                        <span className="relative z-10">📢 Notices</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("events")}
                        className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${activeTab === "events"
                                ? "text-white"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                    >
                        {activeTab === "events" && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 shadow-lg animate-gradient-shift" />
                        )}
                        <span className="relative z-10">🎉 Events</span>
                    </button>
                </div>

                {/* View All Link */}
                <Link
                    href={activeTab === "notices" ? "/notices" : "/events"}
                    className="group text-xs font-bold text-indigo-600 transition-all hover:text-violet-600 sm:text-sm"
                >
                    View all
                    <span className="inline-block transition-transform group-hover:translate-x-1"> →</span>
                </Link>
            </div>

            {/* Content with fade transition */}
            <div className="min-h-[300px]">
                {activeTab === "notices" ? (
                    notices.length === 0 ? (
                        <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50/30 text-slate-400 text-sm">
                            No notices available yet.
                        </div>
                    ) : (
                        <div className="grid gap-4 animate-fade-in">
                            {notices.slice(0, 2).map((notice) => (
                                <NoticeCard key={notice._id} notice={notice} truncate={true} />
                            ))}
                        </div>
                    )
                ) : (
                    events.length === 0 ? (
                        <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-violet-50/30 text-slate-400 text-sm">
                            No events scheduled yet.
                        </div>
                    ) : (
                        <div className="grid gap-4 animate-fade-in">
                            {events.slice(0, 2).map((event) => (
                                <EventCard key={event._id} event={event} truncate={true} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
