import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-2xl font-bold uppercase text-text-primary">
        Tournament not found
      </h1>
      <p className="max-w-sm text-text-secondary">
        This link is invalid or the tournament has ended.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-card border border-surface-border px-4 py-2 text-sm font-bold uppercase transition-colors hover:border-accent-green"
      >
        Home
      </Link>
    </main>
  );
}
