import type { LiveSnapshot } from './types';

/**
 * Returns the tournament champion's teamId once it's decided, else null.
 * - elimination: winner of the Grand Final (double) or the last match (single)
 * - round-robin / swiss: standings leader, but only once every match is played
 */
export function findChampionId(s: LiveSnapshot): string | null {
  const e = s.elimination;
  if (e) {
    if (e.kind === 'double' && e.grandFinal) {
      return e.grandFinal.winnerTeamId ?? null;
    }
    const matchCells = e.grid.cells.filter((c) => c.kind === 'match' && c.match);
    if (matchCells.length) {
      const last = matchCells.reduce((a, b) => (b.col > a.col ? b : a));
      return last.match?.winnerTeamId ?? null;
    }
  }

  if (s.roundRobin) {
    const allPlayed = s.roundRobin.rounds.every((r) =>
      r.tours.every((t) => t.matches.every((m) => m.score != null)),
    );
    if (allPlayed && s.roundRobin.standings.length > 0) {
      return s.roundRobin.standings[0].teamId;
    }
  }

  if (s.swiss) {
    const done =
      s.swiss.rounds.length >= s.swiss.totalRounds &&
      s.swiss.rounds.every((r) => r.isFinished);
    if (done && s.swiss.standings.length > 0) {
      return s.swiss.standings[0].teamId;
    }
  }

  return null;
}
