import { notFound } from 'next/navigation';
import { fetchSnapshot } from '@/lib/api';
import { LiveTournament } from './LiveTournament';

// Always render fresh: the live view must reflect the current snapshot.
export const dynamic = 'force-dynamic';

export default async function TournamentPage({
  params,
}: {
  params: { code: string };
}) {
  const data = await fetchSnapshot(params.code);
  if (!data) notFound();

  return (
    <LiveTournament
      code={params.code}
      initial={data.snapshot}
      initialIsLive={data.isLive}
    />
  );
}
