import type { EliminationBlock } from '@/lib/types';
import { BracketGrid } from './BracketGrid';

interface EliminationViewProps {
  block: EliminationBlock;
  teams: Record<string, string>;
  highlightTeamId?: string | null;
}

/**
 * Single-elim = one grid. Double-elim = winners grid, gap, losers grid (the
 * cross-bracket curve to the Grand Final is added once the double-elim fixture
 * lands).
 */
export function EliminationView({
  block,
  teams,
  highlightTeamId,
}: EliminationViewProps) {
  if (block.kind === 'single' || !block.losersGrid) {
    return (
      <BracketGrid grid={block.grid} teams={teams} highlightTeamId={highlightTeamId} />
    );
  }
  return (
    <div className="flex flex-col gap-12">
      <BracketGrid grid={block.grid} teams={teams} highlightTeamId={highlightTeamId} />
      <BracketGrid
        grid={block.losersGrid}
        teams={teams}
        highlightTeamId={highlightTeamId}
      />
    </div>
  );
}
