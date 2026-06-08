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
  highlightTeamId,
}: {
  match: Match;
  teams: Record<string, string>;
  highlightTeamId?: string | null;
}) {
  // Only tint a winner once the match is actually played (has a score), so a
  // stray winnerTeamId on an unplayed match never turns a team green.
  const decided = match.score != null;
  const w1 = decided && match.winnerTeamId != null && match.first.teamId === match.winnerTeamId;
  const w2 = decided && match.winnerTeamId != null && match.second.teamId === match.winnerTeamId;
  const involves =
    highlightTeamId == null ||
    match.first.teamId === highlightTeamId ||
    match.second.teamId === highlightTeamId;
  return (
    <div
      className={`flex items-stretch gap-1.5 transition-opacity ${
        involves ? 'opacity-100' : 'opacity-30'
      }`}
    >
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
  highlightTeamId,
}: {
  groups: MatchGroup[];
  teams: Record<string, string>;
  highlightTeamId?: string | null;
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
              <MatchRow
                key={m.matchNumber}
                match={m}
                teams={teams}
                highlightTeamId={highlightTeamId}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
