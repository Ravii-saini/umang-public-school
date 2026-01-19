import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PortableText } from "@/components/PortableText";
import { fetchNoticeById, fetchSettings } from "@/lib/queries";
import { format } from "@/lib/utils";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const notice = await fetchNoticeById(params.id);
  if (!notice) return { title: "Notice Not Found" };
  return { title: notice.title };
}

export default async function NoticeDetailPage({ params }: Props) {
  const [settings, noticeData] = await Promise.all([
    fetchSettings(),
    fetchNoticeById(params.id)
  ]);

  if (!noticeData) {
    notFound();
  }

  const notice = noticeData;

  const accent =
    notice.priority === "Urgent"
      ? "border-l-4 border-red-500/70"
      : notice.pin
        ? "border-l-4 border-amber-400/60"
        : "border-l-4 border-cyan-400/40";

  return (
    <PageShell
      settings={settings}
      heroTitle="Notice Details"
      heroSubtitle="Full details of the school notice"
    >
      <div className="max-w-4xl">
        <Link
          href="/notices"
          className="mb-6 inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Back to Notices
        </Link>

        <article
          className={`card-shadow flex flex-col gap-6 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-8 ring-1 ring-slate-900/80 ${accent}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300/90">
                {notice.category || "General"}
              </p>
            </div>
            <div className="flex gap-2">
              {notice.priority === "Urgent" && (
                <span className="rounded-full bg-red-500/15 px-4 py-1.5 text-sm font-semibold text-red-300 ring-1 ring-red-500/50">
                  Urgent
                </span>
              )}
              {notice.pin && (
                <span className="rounded-full bg-amber-400/15 px-4 py-1.5 text-sm font-semibold text-amber-200 ring-1 ring-amber-400/60">
                  Pinned
                </span>
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">{notice.title}</h1>

          <div className="prose prose-invert prose-lg max-w-none">
            <PortableText value={notice.content} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/70 pt-6">
            <div>
              <p className="text-sm font-medium text-slate-300">{notice.author || "Admin"}</p>
              {notice.publishedAt && (
                <p className="text-sm text-slate-400">{format(notice.publishedAt)}</p>
              )}
            </div>
            {notice.pdfUrl && (
              <a
                href={notice.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600/20 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-600/30 hover:text-cyan-200"
              >
                Download PDF →
              </a>
            )}
          </div>
        </article>
      </div>
    </PageShell>
  );
}
