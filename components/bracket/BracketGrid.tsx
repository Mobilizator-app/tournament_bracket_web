import type { Grid } from '@/lib/types';
import { colLeftX, cellTop, cellHeight, gridWidth, gridHeight } from '@/lib/geometry';
import { Connectors } from './Connectors';
import { MatchCard } from './MatchCard';
import { CupCell } from './CupCell';

interface BracketGridProps {
  grid: Grid;
  teams: Record<string, string>;
  highlightTeamId?: string | null;
}

/** Absolute-positions each cell by (col,row,span) over the connector overlay. */
export function BracketGrid({ grid, teams, highlightTeamId }: BracketGridProps) {
  const w = gridWidth(grid.columns, grid);
  const h = gridHeight(grid.rows, grid);
  return (
    <div className="relative" style={{ width: w, height: h }}>
      <Connectors grid={grid} />
      {grid.cells.map((cell) => (
        <div
          key={`${cell.col}-${cell.row}-${cell.kind}`}
          className="absolute"
          style={{
            left: colLeftX(cell.col, grid),
            top: cellTop(cell.row, grid),
            width: grid.columnWidth,
            height: cellHeight(cell.span, grid),
          }}
        >
          {cell.kind === 'match' && cell.match && (
            <MatchCard
              match={cell.match}
              teams={teams}
              highlightTeamId={highlightTeamId}
            />
          )}
          {cell.kind === 'cup' && <CupCell />}
        </div>
      ))}
    </div>
  );
}
