import Image from "next/image";
import type { GalleryItem } from "@/lib/types";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  if (!items?.length) return <p className="text-sm text-slate-400">No gallery items yet.</p>;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item._id}
          className="card-shadow overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/70 ring-1 ring-slate-900/80"
        >
          <div className="relative h-52 w-full">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-800/60 text-sm text-slate-300">
                No image
              </div>
            )}
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-50">{item.title}</p>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-400">
                {item.category || "Campus life"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
