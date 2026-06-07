import fs from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { LiveSnapshot } from '@/lib/types';
import { TournamentView } from '@/components/TournamentView';

async function loadFixture(name: string): Promise<LiveSnapshot | null> {
  try {
    const file = path.join(process.cwd(), 'fixtures', `${name}.json`);
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw) as LiveSnapshot;
  } catch {
    return null;
  }
}

// Dev-only route to render a fixture without the backend or app. The live
// route (/t/[code]) reuses the same <TournamentView> with real data.
export default async function DevFixturePage({
  params,
}: {
  params: { fixture: string };
}) {
  const snapshot = await loadFixture(params.fixture);
  if (!snapshot) notFound();

  return <TournamentView snapshot={snapshot} connState="live" />;
}
