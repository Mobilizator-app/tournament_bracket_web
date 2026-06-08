'use client';

import { useState, useEffect } from 'react';
import type { LiveSnapshot, ConnState } from '@/lib/types';
import { EliminationView } from './bracket/EliminationView';
import { RoundRobinView } from './format/RoundRobinView';
import { SwissView } from './format/SwissView';
import { GroupStageView } from './format/GroupStageView';
import { ZoomPanStage } from './layout/ZoomPanStage';
import { LiveBadge } from './layout/LiveBadge';
import { AppStoreButton } from './layout/AppStoreButton';
import { TeamSelector } from './layout/TeamSelector';
import { cssVarsFromRender, teamNameMap } from '@/lib/render';
import { APP_NAME } from '@/lib/constants';
import { findChampionId } from '@/lib/champion';
import { analytics } from '@/lib/events';

interface TournamentViewProps {
  snapshot: LiveSnapshot;
  connState: ConnState;
  viewers?: number | null;
}

/** Root viewer. Dispatches by format; reused by the dev route and /t/[code]. */
export function TournamentView({ snapshot, connState, viewers }: TournamentViewProps) {
  const teams = teamNameMap(snapshot.teams);
  const [highlightTeamId, setHighlightTeamId] = useState<string | null>(null);
  const championId = findChampionId(snapshot);
  const championName = championId ? teams[championId] : null;

  useEffect(() => {
    analytics.tournamentOpen(snapshot.format);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot.tournamentId]);

  useEffect(() => {
    if (championName) analytics.championShown(championName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [championId]);

  return (
    <div
      className="flex h-[100dvh] flex-col bg-bg"
      style={cssVarsFromRender(snapshot.render)}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-surface-border px-4 py-2.5 md:px-8 md:py-4">
        <div className="flex min-w-0 items-center gap-2.5 md:gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={APP_NAME}
            className="h-10 w-10 shrink-0 rounded-[8px] md:h-14 md:w-14 md:rounded-[12px]"
          />
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-widest text-text-secondary md:text-xs">
              {APP_NAME}
            </div>
            <div className="truncate text-lg font-bold leading-tight text-text-primary md:text-3xl">
              {snapshot.name}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 md:gap-6">
          {viewers != null && viewers > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-text-secondary md:text-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 md:h-[18px] md:w-[18px]"
                aria-hidden
              >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {viewers}
            </span>
          )}
          <LiveBadge connState={connState} />
          <AppStoreButton />
        </div>
      </header>

      <TeamSelector
        teams={snapshot.teams}
        highlightableIds={snapshot.highlightableTeamIds}
        selected={highlightTeamId}
        onSelect={setHighlightTeamId}
      />

      {championName && (
        <div className="flex shrink-0 items-center justify-center gap-2 border-b border-amber-400/30 bg-amber-400/10 px-4 py-2 text-amber-400">
          <span className="text-base">🏆</span>
          <span className="text-sm font-bold uppercase tracking-wide md:text-base">
            Champion: {championName}
          </span>
        </div>
      )}

      <div className="relative flex-1 overflow-hidden">
        <Body snapshot={snapshot} teams={teams} highlightTeamId={highlightTeamId} />
      </div>
    </div>
  );
}

function Scroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mx-auto max-w-2xl">{children}</div>
    </div>
  );
}

function Empty({ format }: { format: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6 text-center text-text-secondary">
      No data for “{format}” yet.
    </div>
  );
}

function Body({
  snapshot,
  teams,
  highlightTeamId,
}: {
  snapshot: LiveSnapshot;
  teams: Record<string, string>;
  highlightTeamId: string | null;
}) {
  switch (snapshot.format) {
    case 'singleElimination':
    case 'doubleElimination':
      return snapshot.elimination ? (
        <ZoomPanStage>
          <div className="p-16">
            <EliminationView
              block={snapshot.elimination}
              teams={teams}
              highlightTeamId={highlightTeamId}
            />
          </div>
        </ZoomPanStage>
      ) : (
        <Empty format={snapshot.format} />
      );
    case 'roundRobin':
      return snapshot.roundRobin ? (
        <Scroll>
          <RoundRobinView
            block={snapshot.roundRobin}
            teams={teams}
            highlightTeamId={highlightTeamId}
          />
        </Scroll>
      ) : (
        <Empty format={snapshot.format} />
      );
    case 'swissSystem':
      return snapshot.swiss ? (
        <Scroll>
          <SwissView
            block={snapshot.swiss}
            teams={teams}
            highlightTeamId={highlightTeamId}
          />
        </Scroll>
      ) : (
        <Empty format={snapshot.format} />
      );
    case 'groupStage':
      return snapshot.groupStage ? (
        <Scroll>
          <GroupStageView
            block={snapshot.groupStage}
            elimination={snapshot.elimination}
            teams={teams}
            highlightTeamId={highlightTeamId}
          />
        </Scroll>
      ) : (
        <Empty format={snapshot.format} />
      );
    default:
      return <Empty format={snapshot.format} />;
  }
}
