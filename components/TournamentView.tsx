'use client';

import type { LiveSnapshot, ConnState } from '@/lib/types';
import { EliminationView } from './bracket/EliminationView';
import { RoundRobinView } from './format/RoundRobinView';
import { SwissView } from './format/SwissView';
import { GroupStageView } from './format/GroupStageView';
import { ZoomPanStage } from './layout/ZoomPanStage';
import { LiveBadge } from './layout/LiveBadge';
import { cssVarsFromRender, teamNameMap } from '@/lib/render';

interface TournamentViewProps {
  snapshot: LiveSnapshot;
  connState: ConnState;
}

/** Root viewer. Dispatches by format; reused by the dev route and /t/[code]. */
export function TournamentView({ snapshot, connState }: TournamentViewProps) {
  const teams = teamNameMap(snapshot.teams);

  return (
    <div
      className="flex h-[100dvh] flex-col bg-bg"
      style={cssVarsFromRender(snapshot.render)}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-surface-border px-4 py-3">
        <h1 className="truncate text-lg font-bold uppercase text-text-primary">
          {snapshot.name}
        </h1>
        <LiveBadge connState={connState} />
      </header>

      <div className="relative flex-1 overflow-hidden">
        <Body snapshot={snapshot} teams={teams} />
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
}: {
  snapshot: LiveSnapshot;
  teams: Record<string, string>;
}) {
  switch (snapshot.format) {
    case 'singleElimination':
    case 'doubleElimination':
      return snapshot.elimination ? (
        <ZoomPanStage>
          <div className="p-16">
            <EliminationView block={snapshot.elimination} teams={teams} />
          </div>
        </ZoomPanStage>
      ) : (
        <Empty format={snapshot.format} />
      );
    case 'roundRobin':
      return snapshot.roundRobin ? (
        <Scroll>
          <RoundRobinView block={snapshot.roundRobin} teams={teams} />
        </Scroll>
      ) : (
        <Empty format={snapshot.format} />
      );
    case 'swissSystem':
      return snapshot.swiss ? (
        <Scroll>
          <SwissView block={snapshot.swiss} teams={teams} />
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
          />
        </Scroll>
      ) : (
        <Empty format={snapshot.format} />
      );
    default:
      return <Empty format={snapshot.format} />;
  }
}
