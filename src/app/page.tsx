import Link from "next/link";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { NoticeCard } from "@/components/NoticeCard";
import { EventCard } from "@/components/EventCard";
import { AnnouncementCarousel } from "@/components/AnnouncementCarousel";
import { FacultyCard } from "@/components/FacultyCard";
import { PageShell } from "@/components/PageShell";
import {
  fetchAbout,
  fetchAnnouncements,
  fetchEvents,
  fetchFeaturedFaculties,
  fetchGallery,
  fetchRecentNotices,
  fetchSettings
} from "@/lib/queries";
import { SCHOOL_NAME, HERO_DESCRIPTION, HIGHLIGHTS, FACULTY_COUNT, STUDENT_COUNT } from "@/lib/siteConstants";
import AnimatedCounter from "@/components/AnimatedCounter";

export const revalidate = 0; // Always fetch fresh data for announcements

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

  // Prefer a gallery hero image, then the about page hero; finally fall back to the local logo
  // Place your logo at `public/logo.jpg` so it's available at `/logo.jpg` in the app.
  const heroImage = galleryItems[0]?.imageUrl || about?.heroImage || '/logo.jpg';

  return (
    <PageShell
      settings={settings}
      heroTitle={SCHOOL_NAME}
      heroVariant="default"
      heroImage={heroImage}
      heroSubtitle={HERO_DESCRIPTION || about?.heading}
      cta={
        <Link
          href="/contact"
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Contact Admissions
        </Link>
      }
    >
      {/* Intro: classes + highlights */}
      <section className="section-shell">
        <div className="space-y-3">
          <p className="text-sm font-medium text-cyan-500">Classes: 1st - 10th</p>
          <p className="text-lg font-semibold text-app-heading">Why choose {SCHOOL_NAME}?</p>
          <p className="text-sm text-app-muted max-w-2xl">We focus on academic excellence, character formation and joyful learning — a balanced program for every child.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl p-3 card-soft card-hover-pop animate-fade-up">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 text-lg font-bold">{['🎓','📚','🔒','🎨','👩‍🏫','🏫','📞','❤️'][i]}</div>
                <div>
                  <p className="font-medium text-app-heading">{h}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Carousel - Just below Why choose section */}
      <section className="mt-6">
        <AnnouncementCarousel 
          key={announcements?.map(a => a._id).join(',') || 'empty'} 
          announcements={announcements || []} 
        />
      </section>

      {/* Faculty/Student Count - Just below Important Notes */}
      <section className="section-shell mt-6">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="w-full stat-card p-6">
            <div className="flex items-center justify-center">
              <div className="chip-playful">Faculty</div>
            </div>
            <div className="mt-2 text-3xl font-semibold text-slate-50">
              <AnimatedCounter end={FACULTY_COUNT} duration={1400} className="inline-block" suffix="+" />
            </div>
          </div>
          <div className="w-full stat-card p-6">
            <div className="flex items-center justify-center">
              <div className="chip-playful">Students</div>
            </div>
            <div className="mt-2 text-3xl font-semibold text-slate-50">
              <AnimatedCounter end={STUDENT_COUNT} duration={1600} className="inline-block" suffix="+" />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <section className="section-shell">
          <div className="section-header">
            <div>
              <h2 className="section-title">Latest Notices</h2>
              <p className="section-subtitle">Important updates from the school office.</p>
            </div>
            <Link href="/notices" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 sm:text-sm">
              View all
            </Link>
          </div>
          {notices.length === 0 ? (
            <p className="mt-4 text-slate-400 text-sm">No notices available yet.</p>
          ) : (
            <div className="mt-4 grid gap-4 grid-cols-1">
              {notices.slice(0, 2).map((notice) => (
                <NoticeCard key={notice._id} notice={notice} truncate={true} />
              ))}
            </div>
          )}
        </section>
        <section className="section-shell">
          <div className="section-header">
            <div>
              <h2 className="section-title">Upcoming Events</h2>
              <p className="section-subtitle">Workshops, competitions and school programs.</p>
            </div>
            <Link href="/events" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 sm:text-sm">
              View all
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="mt-4 text-slate-400 text-sm">No events scheduled yet.</p>
          ) : (
            <div className="mt-4 grid gap-4 grid-cols-1">
              {events.slice(0, 2).map((event) => (
                <EventCard key={event._id} event={event} truncate={true} />
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="section-shell mt-4 space-y-4">
        <div className="section-header">
          <div>
            <h2 className="section-title">Campus Gallery</h2>
            <p className="section-subtitle">A glimpse into everyday life at Umang Public School.</p>
          </div>
          <Link href="/gallery" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 sm:text-sm">
            Explore gallery
          </Link>
        </div>
        <GalleryCarousel items={galleryItems.slice(0, 10)} />
      </section>

      {/* Featured Faculty */}
      <section className="section-shell mt-4 space-y-4">
        <div className="section-header">
          <div>
            <h2 className="section-title">Our Faculty</h2>
            <p className="section-subtitle">Meet our dedicated team of educators.</p>
          </div>
          <Link href="/faculties" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 sm:text-sm">
            View all
          </Link>
        </div>
        {featuredFaculties && featuredFaculties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFaculties.slice(0, 3).map((faculty) => (
              <FacultyCard key={faculty._id} faculty={faculty} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            No featured faculty members yet. Add them in the admin panel and mark them as "Featured".
          </p>
        )}
      </section>
    </PageShell>
  );
}
