/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import dynamicImport from 'next/dynamic'

// Load a client-only wrapper that imports the Studio and its config.
// This prevents server-side evaluation of Studio/browser-only modules
// during Next's build (which previously caused createContext errors).
const NextStudio = dynamicImport(() => import('../StudioClient'), { ssr: false })

export const dynamic = 'force-static'

// NOTE: avoid re-exporting anything from 'next-sanity/studio' here — that would
// import studio server-side during the build and trigger browser-only APIs.
export default function StudioPage() {
  return <NextStudio />
}
