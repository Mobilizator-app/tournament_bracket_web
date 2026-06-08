'use client';

import type { LiveSnapshot } from '@/lib/types';
import { useLiveSnapshot } from '@/lib/useLiveSnapshot';
import { TournamentView } from '@/components/TournamentView';

export function LiveTournament({
  code,
  initial,
  initialIsLive,
}: {
  code: string;
  initial: LiveSnapshot;
  initialIsLive: boolean;
}) {
  const { snapshot, connState, viewers } = useLiveSnapshot(code, initial, initialIsLive);
  return (
    <TournamentView snapshot={snapshot} connState={connState} viewers={viewers} />
  );
}
