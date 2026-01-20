import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h2 className="font-heading text-4xl font-bold text-slate-900">Not Found</h2>
            <p className="mt-4 text-slate-600">Could not find requested resource</p>
            <Link href="/" className="btn-primary mt-8">
                Return Home
            </Link>
        </div>
    )
}
