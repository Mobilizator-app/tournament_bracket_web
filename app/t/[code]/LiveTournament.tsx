'use client';

import { useEffect } from 'react';
import type { LiveSnapshot } from '@/lib/types';
import { useLiveSnapshot } from '@/lib/useLiveSnapshot';
import { TournamentView } from '@/components/TournamentView';
import { analytics } from '@/lib/events';

export function LiveTournament({
  code,
  initial,
  initialIsLive,
  source,
}: {
  code: string;
  initial: LiveSnapshot;
  initialIsLive: boolean;
  source?: string;
}) {
  const { snapshot, connState, viewers } = useLiveSnapshot(
    code,
    initial,
    initialIsLive,
  );

  useEffect(() => {
    // 'qr' / 'link' come from the ?src= tag the app adds; otherwise 'direct'.
    analytics.shareSource(source ?? 'direct');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TournamentView snapshot={snapshot} connState={connState} viewers={viewers} />
  );
}
