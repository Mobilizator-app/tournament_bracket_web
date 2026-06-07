import type { RoundRobinBlock } from '@/lib/types';
import {
  StandingsTable,
  formatGd,
  type Column,
} from '../standings/StandingsTable';
import { MatchList, type MatchGroup } from '../standings/MatchList';

const COLUMNS: Column[] = [
  { label: '#', ratio: 3, align: 'center', render: (r) => r.rank },
  { label: 'Team', ratio: 8, align: 'left', render: (r, t) => t[r.teamId] ?? r.teamId },
  { label: 'Pts', ratio: 4, align: 'center', render: (r) => r.pts },
  { label: 'W-L-D', ratio: 7, align: 'center', render: (r) => `${r.w}-${r.l}-${r.d}` },
  { label: 'GD', ratio: 4, align: 'center', render: (r) => formatGd(r.gd) },
  { label: 'GP', ratio: 5, align: 'center', render: (r) => r.gp ?? r.p ?? '-' },
];

export function RoundRobinView({
  block,
  teams,
}: {
  block: RoundRobinBlock;
  teams: Record<string, string>;
}) {
  const groups: MatchGroup[] = block.rounds.flatMap((round) =>
    round.tours.map((tour) => ({
      title:
        round.tours.length > 1
          ? `Round ${round.number} · Tour ${tour.number}`
          : `Round ${round.number}`,
      matches: tour.matches,
    })),
  );

  return (
    <div className="flex flex-col gap-8">
      <StandingsTable columns={COLUMNS} rows={block.standings} teams={teams} />
      <MatchList groups={groups} teams={teams} />
    </div>
  );
}
