import Link from "next/link";
import type { Notice } from "@/lib/types";
import { PortableText } from "./PortableText";
import { format } from "@/lib/utils";

type Props = {
  notice: Notice;
  truncate?: boolean; // If true, show only 2 lines of description
};

export function NoticeCard({ notice, truncate = false }: Props) {
  const isUrgent = notice.priority === "Urgent";
  const isPinned = notice.pin;

  const cardContent = (
    <article
      className={`card group flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-lg ${truncate ? "cursor-pointer" : ""
        } ${isUrgent ? "border-l-4 border-l-red-500" : isPinned ? "border-l-4 border-l-amber-400" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {notice.category || "General"}
        </span>
        <div className="flex gap-2">
          {isUrgent && (
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600 ring-1 ring-red-100">
              Urgent
            </span>
          )}
          {isPinned && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600 ring-1 ring-amber-100">
              Pinned
            </span>
          )}
        </div>
      </div>

      <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
        {notice.title}
      </h3>

      <div
        className={`prose prose-sm prose-slate text-slate-600 ${truncate ? "line-clamp-2" : ""
          }`}
      >
        <PortableText value={notice.content} />
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{notice.author || "Admin"}</span>
          {notice.publishedAt && (
            <span className="text-xs text-slate-500">{format(notice.publishedAt)}</span>
          )}
        </div>

        {notice.pdfUrl && !truncate && (
          <a
            href={notice.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        )}

        {truncate && (
          <span className="font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
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
