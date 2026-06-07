import type { Match, TeamRef } from '@/lib/types';

function TeamTile({
  team,
  score,
  isWinner,
  teams,
}: {
  team: TeamRef;
  score: number | undefined;
  isWinner: boolean;
  teams: Record<string, string>;
}) {
  const name = team.teamId ? (teams[team.teamId] ?? '') : team.isBye ? 'BYE' : '';
  return (
    <div
      className={`flex h-12 flex-1 items-center rounded-card bg-surface ${
        isWinner ? 'border border-accent-green' : ''
      }`}
    >
      <span className="flex-1 truncate px-2.5 text-base uppercase text-text-primary">
        {name}
      </span>
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-r-card text-base text-text-primary ${
          isWinner ? 'bg-accent-green' : 'bg-surface-border'
        }`}
      >
        {score == null ? '' : score}
      </span>
    </div>
  );
}

export function MatchRow({
  match,
  teams,
}: {
  match: Match;
  teams: Record<string, string>;
}) {
  const w1 = match.winnerTeamId != null && match.first.teamId === match.winnerTeamId;
  const w2 = match.winnerTeamId != null && match.second.teamId === match.winnerTeamId;
  return (
    <div className="flex items-stretch gap-1.5">
      <TeamTile team={match.first} score={match.score?.first} isWinner={w1} teams={teams} />
      <TeamTile team={match.second} score={match.score?.second} isWinner={w2} teams={teams} />
    </div>
  );
}

export interface MatchGroup {
  title: string;
  matches: Match[];
}

export function MatchList({
  groups,
  teams,
}: {
  groups: MatchGroup[];
  teams: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-5">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-text-secondary">
            {g.title}
          </h3>
          <div className="flex flex-col gap-2">
            {g.matches.map((m) => (
              <MatchRow key={m.matchNumber} match={m} teams={teams} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
