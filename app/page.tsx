import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';

async function listFixtures(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), 'fixtures');
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
      .sort();
  } catch {
    return [];
  }
}

export default async function Home() {
  const fixtures = await listFixtures();
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-xl flex-col justify-center gap-8 px-6">
      <header>
        <h1 className="text-[28px] font-bold leading-tight">Tournament Live</h1>
        <p className="mt-2 text-text-secondary">
          Real-time tournament bracket viewer. Open a tournament link to follow
          results live.
        </p>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-text-secondary">
          Dev fixtures
        </h2>
        {fixtures.length === 0 ? (
          <p className="text-text-secondary">No fixtures found.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {fixtures.map((name) => (
              <li key={name}>
                <Link
                  href={`/dev/${name}`}
                  className="block rounded-card border border-surface-border bg-surface px-4 py-3 font-bold uppercase transition-colors hover:border-accent-green"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
