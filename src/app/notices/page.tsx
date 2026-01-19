import { NoticeCard } from "@/components/NoticeCard";
import { PageShell } from "@/components/PageShell";
import { fetchRecentNotices, fetchSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function NoticesPage() {
  const [settings, notices] = await Promise.all([fetchSettings(), fetchRecentNotices()]);
  return (
    <PageShell
      settings={settings}
      heroTitle="School Notices"
      heroSubtitle="Find urgent updates, circulars, and important communication."
    >
      <section className="section-shell space-y-5">
        <div className="flex flex-col gap-1">
          <h2 className="section-title">All notices</h2>
          <p className="section-subtitle">
            Sorted by recency with pinned and urgent notices highlighted for quick scanning.
          </p>
        </div>

        {notices.length === 0 && <p className="text-sm text-slate-400">No notices yet.</p>}

        {/* split notices into pinned / urgent / others for clearer presentation */}
        {(() => {
          const pinned = notices.filter((n) => n.pin);
          const urgent = notices.filter((n) => n.priority === "Urgent" && !n.pin);
          const rest = notices.filter((n) => !n.pin && n.priority !== "Urgent");
          return (
            <>
              {pinned.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-amber-200">Pinned</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {pinned.map((p) => (
                      <NoticeCard key={p._id} notice={p} />
                    ))}
                  </div>
                </div>
              )}

              {urgent.length > 0 && (
                <div>
                  <h3 className="mb-3 mt-4 text-sm font-semibold text-red-300">Urgent</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {urgent.map((u) => (
                      <NoticeCard key={u._id} notice={u} />
                    ))}
                  </div>
                </div>
              )}

              {rest.length > 0 && (
                <div>
                  <h3 className="mb-3 mt-4 text-sm font-semibold text-slate-200">All</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {rest.map((n) => (
                      <NoticeCard key={n._id} notice={n} />
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
