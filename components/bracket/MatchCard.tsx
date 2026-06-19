'use client';

import { useEffect, useRef, useState } from 'react';
import type { Match, TeamRef } from '@/lib/types';
import { TeamLogo, useTeamLogos } from '@/components/TeamLogo';

interface MatchCardProps {
  match: Match;
  teams: Record<string, string>;
  /** When set, dim matches that don't involve this team (path highlight). */
  highlightTeamId?: string | null;
  /** Highlights this card as the tournament final (accent ring + glow). */
  isFinal?: boolean;
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
  const { logos, showLogos } = useTeamLogos();
  const name = team.teamId ? (teams[team.teamId] ?? '') : team.isBye ? 'BYE' : '';
  const hasLogo = showLogos && !!team.teamId;
  return (
    <div
      className={`flex h-[46px] items-center gap-2 rounded-card bg-surface ${
        hasLogo ? 'pl-[8px]' : ''
      } ${isWinner ? 'border border-accent-green' : ''}`}
    >
      {hasLogo && <TeamLogo name={name} logo={logos[team.teamId!]} size={28} />}
      <span
        className={`flex-1 truncate ${
          hasLogo ? '' : 'pl-[10px]'
        } text-base font-normal uppercase text-text-primary`}
      >
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

export function MatchCard({ match, teams, highlightTeamId, isFinal }: MatchCardProps) {
  // Only tint a winner once the match has a score, so a stray winnerTeamId on an
  // unplayed match never turns a team green.
  const decided = match.score != null;
  const firstWin =
    decided && match.winnerTeamId != null && match.first.teamId === match.winnerTeamId;
  const secondWin =
    decided && match.winnerTeamId != null && match.second.teamId === match.winnerTeamId;

  const involvesHighlight =
    highlightTeamId == null ||
    match.first.teamId === highlightTeamId ||
    match.second.teamId === highlightTeamId;

  // Flash the card briefly when its score changes via a live update.
  const [flash, setFlash] = useState(false);
  const prevScore = useRef(`${match.score?.first}-${match.score?.second}`);
  useEffect(() => {
    const key = `${match.score?.first}-${match.score?.second}`;
    if (key !== prevScore.current) {
      prevScore.current = key;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 1200);
      return () => clearTimeout(t);
    }
  }, [match.score?.first, match.score?.second]);

  return (
    <div
      className={`flex h-[96px] flex-col justify-between rounded-card transition-opacity ${
        involvesHighlight ? 'opacity-100' : 'opacity-30'
      } ${
        isFinal
          ? 'ring-2 ring-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.45)]'
          : ''
      } ${flash ? 'match-flash' : ''}`}
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
