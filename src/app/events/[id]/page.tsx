import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PortableText } from "@/components/PortableText";
import { fetchEventById, fetchSettings } from "@/lib/queries";
import { format } from "@/lib/utils";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const event = await fetchEventById(params.id);
  if (!event) return { title: "Event Not Found" };
  return { title: event.title };
}

export default async function EventDetailPage({ params }: Props) {
  const [settings, eventData] = await Promise.all([
    fetchSettings(),
    fetchEventById(params.id)
  ]);

  if (!eventData) {
    notFound();
  }

  const event = eventData;

  return (
    <PageShell
      settings={settings}
      heroTitle="Event Details"
      heroSubtitle="Full details of the school event"
    >
      <div className="max-w-4xl">
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Events
        </Link>

        <article className="card-shadow flex flex-col gap-6 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-8 ring-1 ring-slate-900/80 border-l-4 border-indigo-500/50">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300/90">
                {event.category || "Event"}
              </p>
            </div>
            <div className="rounded-full bg-indigo-600/20 px-4 py-1.5 text-sm font-semibold text-indigo-300 ring-1 ring-indigo-500/50">
              {format(event.date)}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">{event.title}</h1>

          {event.description && (
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={event.description} />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/70 pt-6">
            <div>
              <p className="text-sm font-medium text-slate-300">
                <span className="text-slate-400">Location:</span> {event.location || "On campus"}
              </p>
            </div>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
