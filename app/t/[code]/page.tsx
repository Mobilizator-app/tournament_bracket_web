import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchSnapshot } from '@/lib/api';
import { APP_NAME } from '@/lib/constants';
import { LiveTournament } from './LiveTournament';

// Always render fresh: the live view must reflect the current snapshot.
export const dynamic = 'force-dynamic';

// Rich link preview (Telegram/WhatsApp/etc.) with the tournament name + logo.
export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const data = await fetchSnapshot(params.code).catch(() => null);
  const name = data?.snapshot.name ?? 'Tournament';
  const title = `${name} · ${APP_NAME}`;
  const description = 'Follow this tournament live — the bracket updates in real time.';
  return {
    title,
    description,
    openGraph: { title, description, images: ['/logo.png'], type: 'website' },
    twitter: { card: 'summary', title, description, images: ['/logo.png'] },
  };
}

export default async function TournamentPage({
  params,
  searchParams,
}: {
  params: { code: string };
  searchParams: { src?: string };
}) {
  const data = await fetchSnapshot(params.code);
  if (!data) notFound();

  return (
    <LiveTournament
      code={params.code}
      initial={data.snapshot}
      initialIsLive={data.isLive}
      source={searchParams?.src}
    />
  );
}
