import type { SwissBlock } from '@/lib/types';
import {
  StandingsTable,
  formatGd,
  type Column,
} from '../standings/StandingsTable';
import { MatchList, type MatchGroup } from '../standings/MatchList';

const COLUMNS: Column[] = [
  { label: '#', ratio: 3, align: 'center', render: (r) => r.rank },
  { label: 'Team', ratio: 9, align: 'left', render: (r, t) => t[r.teamId] ?? r.teamId },
  { label: 'MP', ratio: 3, align: 'center', render: (r) => r.p ?? r.gp ?? '-' },
  { label: 'W', ratio: 3, align: 'center', render: (r) => r.w },
  { label: 'D', ratio: 3, align: 'center', render: (r) => r.d },
  { label: 'L', ratio: 3, align: 'center', render: (r) => r.l },
  { label: 'TB', ratio: 4, align: 'center', render: (r) => r.tb ?? '-' },
  { label: '+/-', ratio: 4, align: 'center', render: (r) => formatGd(r.diff ?? r.gd) },
  { label: 'Pts', ratio: 4, align: 'center', render: (r) => r.pts },
];

export function SwissView({
  block,
  teams,
  highlightTeamId,
}: {
  block: SwissBlock;
  teams: Record<string, string>;
  highlightTeamId?: string | null;
}) {
  const groups: MatchGroup[] = block.rounds.map((r) => ({
    title: `Round ${r.number}`,
    matches: r.matches,
  }));

  return (
    <div className="flex flex-col gap-8">
      <StandingsTable columns={COLUMNS} rows={block.standings} teams={teams} />
      <MatchList groups={groups} teams={teams} highlightTeamId={highlightTeamId} />
    </div>
  );
}
