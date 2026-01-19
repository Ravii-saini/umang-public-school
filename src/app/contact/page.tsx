import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";
import { fetchSettings } from "@/lib/queries";
import { ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/siteConstants";

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await fetchSettings();

  return (
    <PageShell
      settings={settings}
      heroTitle="Contact Us"
      heroSubtitle="Send us a message. Administrators can review submissions in Sanity Studio."
    >
      <section className="section-shell grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <ContactForm />
        <div className="space-y-3 rounded-2xl border border-slate-800/70 bg-slate-900/80 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.85)]">
          <h3 className="text-lg font-semibold text-slate-50">Visit or call</h3>
          <p className="text-sm text-slate-300">{ADDRESS}</p>
          <p className="text-sm text-slate-300">
            Email: {" "}
            <a className="font-medium text-cyan-300 hover:text-cyan-200" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-sm text-slate-300">Phone: {CONTACT_PHONE}</p>
          <p className="text-xs text-slate-500">
            All submissions are stored as <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[0.72rem] text-cyan-200">contactSubmission</code> documents with a review status.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
