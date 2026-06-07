import type { Match, TeamRef } from '@/lib/types';

interface MatchCardProps {
  match: Match;
  teams: Record<string, string>;
  /** When set, dim matches that don't involve this team (path highlight). */
  highlightTeamId?: string | null;
}

function TeamRow({
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
      className={`flex h-[46px] items-center rounded-card bg-surface ${
        isWinner ? 'border border-accent-green' : ''
      }`}
    >
      <span className="flex-1 truncate pl-[10px] text-base font-normal uppercase text-text-primary">
        {name}
      </span>
      <span
        className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-r-card text-base text-text-primary ${
          isWinner ? 'bg-accent-green' : 'bg-surface-border'
        }`}
      >
        {score == null ? '' : score}
      </span>
    </div>
  );
}

export function MatchCard({ match, teams, highlightTeamId }: MatchCardProps) {
  const firstWin =
    match.winnerTeamId != null && match.first.teamId === match.winnerTeamId;
  const secondWin =
    match.winnerTeamId != null && match.second.teamId === match.winnerTeamId;

  const involvesHighlight =
    highlightTeamId == null ||
    match.first.teamId === highlightTeamId ||
    match.second.teamId === highlightTeamId;

  return (
    <div
      className={`flex h-[96px] flex-col justify-between transition-opacity ${
        involvesHighlight ? 'opacity-100' : 'opacity-30'
      }`}
    >
      <TeamRow
        team={match.first}
        score={match.score?.first}
        isWinner={firstWin}
        teams={teams}
      />
      <TeamRow
        team={match.second}
        score={match.score?.second}
        isWinner={secondWin}
        teams={teams}
      />
    </div>
  );
}
