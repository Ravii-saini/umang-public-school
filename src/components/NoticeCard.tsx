import Link from "next/link";
import type { Notice } from "@/lib/types";
import { PortableText } from "./PortableText";
import { format } from "@/lib/utils";

type Props = {
  notice: Notice;
  truncate?: boolean; // If true, show only 2 lines of description
};

export function NoticeCard({ notice, truncate = false }: Props) {
  const accent =
    notice.priority === "Urgent"
      ? "border-l-4 border-red-500/70"
      : notice.pin
        ? "border-l-4 border-amber-400/60"
        : "border-l-4 border-cyan-400/40";

  const cardContent = (
    <article
      className={`card-shadow animate-fade-up card-hover-pop transform-gpu flex flex-col gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 ring-1 ring-slate-900/80 transition-all ${accent} ${
        truncate ? "cursor-pointer hover:scale-[1.02]" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
          {notice.category || "General"}
        </p>
        {notice.priority === "Urgent" && (
          <span className="rounded-full bg-red-500/15 px-3 py-1 text-[0.7rem] font-semibold text-red-300 ring-1 ring-red-500/50">
            Urgent
          </span>
        )}
        {notice.pin && (
          <span className="rounded-full bg-amber-400/15 px-3 py-1 text-[0.7rem] font-semibold text-amber-200 ring-1 ring-amber-400/60">
            Pinned
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold tracking-tight text-slate-50 sm:text-lg">
        {notice.title}
      </h3>
      <div
        className={`prose prose-invert prose-xs text-slate-300 sm:prose-sm ${
          truncate ? "line-clamp-2 overflow-hidden" : ""
        }`}
      >
        <PortableText value={notice.content} />
      </div>
      <div className="mt-auto flex items-center justify-between text-xs text-slate-400 sm:text-sm">
        <div>
          <p className="font-medium">{notice.author || "Admin"}</p>
          {notice.publishedAt && (
            <p className="text-[0.72rem] text-slate-400">{format(notice.publishedAt)}</p>
          )}
        </div>
        {notice.pdfUrl && !truncate && (
          <a
            href={notice.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-md bg-cyan-600/10 px-3 py-1 text-sm font-semibold text-cyan-300 hover:bg-cyan-600/20 hover:text-cyan-200"
          >
            Download PDF
          </a>
        )}
        {truncate && (
          <span className="text-xs font-medium text-cyan-400 hover:text-cyan-300">
            Read more →
          </span>
        )}
      </div>
    </article>
  );

  // If truncate is enabled, wrap in Link to detail page
  if (truncate) {
    return (
      <Link href={`/notices/${notice._id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
