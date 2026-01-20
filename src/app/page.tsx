import Link from "next/link";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { HomeHeroCarousel } from "@/components/HomeHeroCarousel";
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel";
import { FacultyCard } from "@/components/FacultyCard";
import { PageShell } from "@/components/PageShell";
import { NoticesEventsTabs } from "@/components/NoticesEventsTabs";
import {
  fetchAbout,
  fetchAnnouncements,
  fetchEvents,
  fetchFeaturedFaculties,
  fetchGallery,
  fetchRecentNotices,
  fetchSettings
} from "@/lib/queries";
import { FACULTY_COUNT, STUDENT_COUNT, HIGHLIGHTS } from "@/lib/siteConstants";
import AnimatedCounter from "@/components/AnimatedCounter";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [settings, about, notices, events, gallery, announcements, featuredFaculties] = await Promise.all([
    fetchSettings(),
    fetchAbout(),
    fetchRecentNotices(),
    fetchEvents(),
    fetchGallery(),
    fetchAnnouncements(),
    fetchFeaturedFaculties()
  ]);

  const galleryItems = gallery || [];
  const heroItems = galleryItems.length > 0 ? galleryItems.slice(0, 5) : [];
  const safeNotices = notices || [];
  const safeEvents = events || [];
  const safeFeaturedFaculties = featuredFaculties || [];

  return (
    <PageShell settings={settings}>
      {/* Full Width Hero Carousel */}
      <section className="-mt-8 md:-mt-12 mb-8">
        {heroItems.length > 0 ? (
          <HomeHeroCarousel items={heroItems} />
        ) : (
          <div className="flex h-[60vh] items-center justify-center bg-slate-900 text-slate-400">
            <p>Add gallery images to see the hero slider.</p>
          </div>
        )}
      </section>

      <div className="container-wide space-y-16 pb-16">
        {/* Modern Animated Admissions Banner */}
        <section className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-200% px-4 py-4 shadow-xl shadow-indigo-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-1 sm:px-6 animate-gradient-shift">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Tagline */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="self-start rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow-lg animate-pulse-glow">
                ✨ Admissions Open
              </div>
              <p className="font-medium text-white text-sm sm:text-base">
                Enroll now for Academic Session 2026-27
              </p>
            </div>

            {/* Right: Announcement Ticker + Action */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto mt-2 sm:mt-0">
              {/* Vertical divider on desktop */}
              <div className="hidden h-6 w-px bg-white/20 lg:block" />

              {announcements && announcements.length > 0 && (
                <div className="w-full sm:w-64 lg:w-96">
                  <AnnouncementCarousel
                    key={announcements.map(a => a._id).join(',')}
                    announcements={announcements}
                    variant="minimal"
                  />
                </div>
              )}

              <Link
                href="/contact"
                className="whitespace-nowrap rounded-xl bg-white px-5 py-2.5 text-center text-sm font-bold text-indigo-700 shadow-lg transition-all hover:bg-gradient-to-r hover:from-cyan-50 hover:to-indigo-50 hover:shadow-xl hover:scale-105 sm:py-2 group-hover:animate-bounce-subtle"
              >
                Apply Now →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content Grid: Why Us vs NoticesTabs */}
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left: Why Choose Us (Takes 2/3 space) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-3xl font-bold">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  Why Choose Us?
                </span>
              </h2>
              <p className="mt-2 text-slate-600 font-medium">Excellence in education, character, and global vision.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-0 blur transition-all duration-300 group-hover:opacity-75" />
                  <div className="relative flex items-start gap-4 rounded-xl border border-slate-200/60 bg-white/80 p-4 shadow-elevation-1 backdrop-blur-sm transition-all duration-300 hover:shadow-elevation-2 hover:-translate-y-1">
                    <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {['🎓', '📚', '🔒', '🎨', '👩‍🏫', '🏫', '📞', '❤️'][i] || '✨'}
                    </div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">{h}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern Stats Section */}
            <div className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10" />
              <div className="relative grid grid-cols-2 gap-6">
                <div className="group text-center">
                  <div className="text-4xl font-bold sm:text-5xl">
                    <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                      <AnimatedCounter end={STUDENT_COUNT} duration={1500} suffix="+" />
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-indigo-300">Students</p>
                </div>
                <div className="group text-center">
                  <div className="text-4xl font-bold sm:text-5xl">
                    <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                      <AnimatedCounter end={FACULTY_COUNT} duration={1500} suffix="+" />
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-violet-300">Faculty</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Notices & Events Tabs (Takes 1/3 space) */}
          <div className="lg:col-span-1">
            <NoticesEventsTabs notices={safeNotices} events={safeEvents} />
          </div>
        </div>

        {/* Gallery Preview */}
        <section>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-heading text-3xl font-bold">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Campus Life
              </span>
            </h2>
            <Link href="/gallery" className="group text-sm font-semibold text-indigo-600 transition-all hover:text-violet-600">
              View Gallery
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <GalleryCarousel items={galleryItems.slice(0, 10)} />
        </section>

        {/* Featured Faculty */}
        {safeFeaturedFaculties.length > 0 && (
          <section>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-heading text-3xl font-bold">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  Our Mentors
                </span>
              </h2>
              <Link href="/faculties" className="group text-sm font-semibold text-indigo-600 transition-all hover:text-violet-600">
                View All
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {safeFeaturedFaculties.slice(0, 3).map((faculty) => (
                <FacultyCard key={faculty._id} faculty={faculty} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
