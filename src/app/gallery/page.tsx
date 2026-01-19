import { GalleryGrid } from "@/components/GalleryGrid";
import { PageShell } from "@/components/PageShell";
import { fetchGallery, fetchSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function GalleryPage() {
  const [settings, items] = await Promise.all([fetchSettings(), fetchGallery()]);

  return (
    <PageShell
      settings={settings}
      heroTitle="Gallery"
      heroSubtitle="Snapshots from our classrooms, sports, and community events."
    >
      <section className="section-shell space-y-5">
        <div className="flex flex-col gap-1">
          <h2 className="section-title">Campus moments</h2>
          <p className="section-subtitle">
            Explore photos curated by the school administration in real time from the Studio.
          </p>
        </div>
        <GalleryGrid items={items} />
      </section>
    </PageShell>
  );
}
