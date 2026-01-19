import Link from "next/link";
import type { Event } from "@/lib/types";
import { format } from "@/lib/utils";
import { PortableText } from "./PortableText";

type Props = {
  event: Event;
  truncate?: boolean; // If true, show only 2 lines of description
};

export function EventCard({ event, truncate = false }: Props) {
  const accent = "border-l-4 border-indigo-500/50";

  const cardContent = (
    <article
      className={`card-shadow animate-fade-up card-hover-pop transform-gpu flex flex-col gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 ring-1 ring-slate-900/80 transition-all ${accent} ${
        truncate ? "cursor-pointer hover:scale-[1.02]" : ""
      }`}
    >
      <div className="flex items-center justify-between text-xs text-cyan-300/90 sm:text-sm">
        <p className="font-semibold uppercase tracking-[0.18em]">
          {event.category || "Event"}
        </p>
        <p className="rounded-full bg-slate-900/80 px-3 py-1 text-[0.7rem] font-semibold text-slate-200 ring-1 ring-slate-700">
          {format(event.date)}
        </p>
      </div>
      <h3 className="text-base font-semibold tracking-tight text-slate-50 sm:text-lg">
        {event.title}
      </h3>
      {event.description && (
        <div
          className={`prose prose-invert prose-xs text-slate-300 sm:prose-sm ${
            truncate ? "line-clamp-2 overflow-hidden" : ""
          }`}
        >
          <PortableText value={event.description} />
        </div>
      )}
      <div className="mt-auto flex items-center justify-between text-xs text-slate-400 sm:text-sm">
        <p className="text-xs font-medium text-slate-300 sm:text-sm">
          {event.location ? `Location: ${event.location}` : "On campus"}
        </p>
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
      <Link href={`/events/${event._id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
