import Link from "next/link";
import type { Event } from "@/lib/types";
import { format } from "@/lib/utils";
import { PortableText } from "./PortableText";

type Props = {
  event: Event;
  truncate?: boolean; // If true, show only 2 lines of description
};

export function EventCard({ event, truncate = false }: Props) {
  const cardContent = (
    <article
      className={`card group flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-lg ${truncate ? "cursor-pointer" : ""
        }`}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-blue-600">
          {event.category || "Event"}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
          {format(event.date)}
        </span>
      </div>

      <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
        {event.title}
      </h3>

      {event.description && (
        <div
          className={`prose prose-sm prose-slate text-slate-600 ${truncate ? "line-clamp-2" : ""
            }`}
        >
          <PortableText value={event.description} />
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location ? event.location : "On campus"}
        </div>

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
      <Link href={`/events/${event._id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
