import { EventCard } from "@/components/EventCard";
import { PageShell } from "@/components/PageShell";
import { fetchEvents, fetchSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function EventsPage() {
  const [settings, events] = await Promise.all([fetchSettings(), fetchEvents()]);
  return (
    <PageShell
      settings={settings}
      heroTitle="Events Calendar"
      heroSubtitle="Stay up to date with school programs, workshops, and celebrations."
    >
      <section className="section-shell space-y-5">
        <div className="flex flex-col gap-1">
          <h2 className="section-title">All upcoming events</h2>
          <p className="section-subtitle">
            Assemblies, exams, sports days, and more — all in one place.
          </p>
        </div>

        {events.length === 0 && <p className="text-sm text-slate-400">No events scheduled yet.</p>}

        {/* group events into upcoming and past for clarity */}
        {(() => {
          const now = new Date();
          const upcoming = events.filter((e) => new Date(e.date) >= now).sort((a, b) => +new Date(a.date) - +new Date(b.date));
          const past = events.filter((e) => new Date(e.date) < now).sort((a, b) => +new Date(b.date) - +new Date(a.date));

          return (
            <>
              {upcoming.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-emerald-300">Upcoming</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {upcoming.map((ev) => (
                      <EventCard key={ev._id} event={ev} />
                    ))}
                  </div>
                </div>
              )}

              {past.length > 0 && (
                <div>
                  <h3 className="mb-3 mt-4 text-sm font-semibold text-slate-400">Past</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {past.map((ev) => (
                      <EventCard key={ev._id} event={ev} />
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </section>
    </PageShell>
  );
}
