import { PageShell } from "@/components/PageShell";
import { fetchDownloads, fetchSettings } from "@/lib/queries";
import type { Download } from "@/lib/types";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DownloadsPage() {
    const [settings, downloads] = await Promise.all([
        fetchSettings(),
        fetchDownloads()
    ]);

    // Group downloads by category
    const groupedDownloads = downloads.reduce((acc, download) => {
        if (!acc[download.category]) {
            acc[download.category] = [];
        }
        acc[download.category].push(download);
        return acc;
    }, {} as Record<string, Download[]>);

    const categories = Object.keys(groupedDownloads).sort();

    return (
        <PageShell settings={settings}>
            <div className="container-wide py-12">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="font-heading text-4xl font-bold md:text-5xl">
                        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                            Downloads
                        </span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 font-medium">
                        Access important documents, forms, and resources
                    </p>
                </div>

                {downloads.length === 0 ? (
                    <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 p-8">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📄</div>
                            <p className="text-lg font-medium text-slate-600">No downloads available yet.</p>
                            <p className="mt-2 text-sm text-slate-500">Check back later for important documents and forms.</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {categories.map((category) => (
                            <section key={category}>
                                {/* Category Header */}
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl shadow-lg">
                                        {getCategoryIcon(category)}
                                    </div>
                                    <h2 className="font-heading text-2xl font-bold text-slate-900">
                                        {category}
                                    </h2>
                                    <div className="ml-auto rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">
                                        {groupedDownloads[category].length} {groupedDownloads[category].length === 1 ? 'file' : 'files'}
                                    </div>
                                </div>

                                {/* Downloads Grid */}
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {groupedDownloads[category].map((download) => (
                                        <DownloadCard key={download._id} download={download} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </PageShell>
    );
}

function DownloadCard({ download }: { download: Download }) {
    return (
        <a
            href={download.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
        >
            {/* Gradient border on hover */}
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-0 blur transition-all duration-300 group-hover:opacity-75" />

            <div className="card relative flex flex-col gap-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                {/* Icon and Featured Badge */}
                <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-100 to-pink-100 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        📄
                    </div>
                    {download.featured && (
                        <div className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-1 text-xs font-bold text-white shadow-md">
                            ⭐ Featured
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="font-heading text-base font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {download.title}
                </h3>

                {/* Description */}
                {download.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                        {download.description}
                    </p>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="font-medium text-slate-500">
                        {new Date(download.publishedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </span>
                    {download.fileSize && (
                        <span className="font-semibold text-indigo-600">{download.fileSize}</span>
                    )}
                    <div className="flex items-center gap-1 font-bold text-indigo-600 transition-transform group-hover:translate-x-1">
                        Download
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </div>
                </div>
            </div>
        </a>
    );
}

function getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
        "Admission Forms": "📝",
        "Syllabus": "📚",
        "Time Tables": "📅",
        "Fee Structure": "💰",
        "Circulars": "📢",
        "Results": "🎯",
        "Other": "📄"
    };
    return icons[category] || "📄";
}
