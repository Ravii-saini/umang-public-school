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
        <section className="group relative overflow-hidden rounded-2xl bg-slate-900 px-5 py-6 shadow-2xl transition-all duration-300 hover:shadow-indigo-500/20 sm:px-8 sm:py-8 lg:px-12">
          {/* Animated gradient accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 bg-200% animate-gradient-shift" />

          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            {/* Left: Tagline */}
            <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
              <div className="flex h-fit w-fit items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-400 ring-1 ring-indigo-500/30">
                ✨ Admissions 2026-27 Open
              </div>
              <h2 className="max-w-md text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                Ready to Join the <span className="text-indigo-400">Umang</span> Family?
              </h2>
            </div>

            {/* Middle: Announcement Ticker */}
            {announcements && announcements.length > 0 && (
              <div className="hidden h-14 w-px bg-slate-800 lg:block" />
            )}

            {announcements && announcements.length > 0 && (
              <div className="w-full max-w-[320px] lg:max-w-sm">
                <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 lg:text-left">Important Updates</p>
                <AnnouncementCarousel
                  key={announcements.map(a => a._id).join(',')}
                  announcements={announcements}
                  variant="minimal"
                />
              </div>
            )}

            {/* Right: CTA */}
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95 sm:w-auto"
            >
              Get Prospectus
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Main Content Grid: Why Us vs NoticesTabs */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left: Why Choose Us (Takes 2/3 space) */}
          <div className="lg:col-span-2 space-y-10">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  Why Choose Us?
                </span>
              </h2>
              <p className="mt-3 text-slate-500 font-medium sm:text-lg">Nurturing curiosity and character since 2023.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-0 blur-sm transition-all duration-300 group-hover:opacity-60" />
                  <div className="relative flex items-center gap-4 rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 text-2xl">
                      {['🎓', '📚', '🔒', '🎨', '👩‍🏫', '🏫', '📞', '❤️'][i] || '✨'}
                    </div>
                    <p className="text-sm font-bold text-slate-700">{h}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 shadow-2xl sm:px-10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-violet-600/10" />
              <div className="relative grid grid-cols-2 gap-8 divide-x divide-slate-800">
                <div className="text-center">
                  <div className="text-3xl font-extrabold sm:text-5xl">
                    <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                      <AnimatedCounter end={STUDENT_COUNT} duration={1500} suffix="+" />
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/80">Students</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold sm:text-5xl">
                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                      <AnimatedCounter end={FACULTY_COUNT} duration={1500} suffix="+" />
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500/80">Mentors</p>
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
