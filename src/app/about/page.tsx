import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { PortableText } from "@/components/PortableText";
import { fetchAbout, fetchSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function AboutPage() {
  const [settings, about] = await Promise.all([fetchSettings(), fetchAbout()]);

  return (
    <PageShell
      settings={settings}
      heroTitle="About Our School"
      heroSubtitle="Learn about our values, curriculum, and community."
    >
      <section className="section-shell grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
        <div className="prose prose-invert prose-slate max-w-none">
          <h3>{about?.heading || "Our story"}</h3>
          <PortableText value={about?.body} />
        </div>
        {about?.heroImage && (
          <div className="relative h-72 w-full overflow-hidden rounded-2xl ring-1 ring-slate-700/80">
            <Image
              src={about.heroImage}
              alt="School campus"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        )}
      </section>
    </PageShell>
  );
}
