import Link from "next/link";
import { FacultyCard } from "@/components/FacultyCard";
import { PageShell } from "@/components/PageShell";
import { fetchFaculties, fetchSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function FacultiesPage() {
  const [settings, faculties] = await Promise.all([fetchSettings(), fetchFaculties()]);

  return (
    <PageShell
      settings={settings}
      heroTitle="Our Faculty"
      heroSubtitle="Meet our dedicated team of educators committed to student success."
    >
      <section className="section-shell space-y-5">
        <div className="flex flex-col gap-1">
          <h2 className="section-title">All Faculty Members</h2>
          <p className="section-subtitle">
            Experienced educators dedicated to nurturing young minds and shaping futures.
          </p>
        </div>

        {faculties.length === 0 ? (
          <p className="text-sm text-slate-400">No faculty members added yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {faculties.map((faculty) => (
              <FacultyCard key={faculty._id} faculty={faculty} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
