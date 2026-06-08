import type { EliminationBlock, GroupStageBlock } from '@/lib/types';
import {
  StandingsTable,
  formatGd,
  type Column,
} from '../standings/StandingsTable';
import { MatchList } from '../standings/MatchList';
import { EliminationView } from '../bracket/EliminationView';

const COLUMNS: Column[] = [
  { label: '#', ratio: 3, align: 'center', render: (r) => r.rank },
  { label: 'Team', ratio: 8, align: 'left', render: (r, t) => t[r.teamId] ?? r.teamId },
  { label: 'Pts', ratio: 3, align: 'center', render: (r) => r.pts },
  { label: 'W-L-D', ratio: 6, align: 'center', render: (r) => `${r.w}-${r.l}-${r.d}` },
  { label: 'GD', ratio: 3, align: 'center', render: (r) => formatGd(r.gd) },
];

export function GroupStageView({
  block,
  elimination,
  teams,
  highlightTeamId,
}: {
  block: GroupStageBlock;
  elimination?: EliminationBlock;
  teams: Record<string, string>;
  highlightTeamId?: string | null;
}) {
  return (
    <div className="flex flex-col gap-10">
      {block.groups.map((g) => (
        <div key={g.name} className="flex flex-col gap-3">
          <h2 className="text-lg font-bold uppercase text-text-primary">{g.name}</h2>
          <StandingsTable columns={COLUMNS} rows={g.standings} teams={teams} />
          {g.matches.length > 0 && (
            <MatchList
              groups={[{ title: 'Matches', matches: g.matches }]}
              teams={teams}
              highlightTeamId={highlightTeamId}
            />
          )}
        </div>
      ))}

      {block.playOff && elimination && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold uppercase text-text-primary">Playoff</h2>
          <div className="overflow-x-auto pb-2">
            <EliminationView
              block={elimination}
              teams={teams}
              highlightTeamId={highlightTeamId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
