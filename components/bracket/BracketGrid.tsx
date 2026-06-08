import type { Grid } from '@/lib/types';
import { colLeftX, cellTop, cellHeight, gridWidth, gridHeight } from '@/lib/geometry';
import { Connectors } from './Connectors';
import { MatchCard } from './MatchCard';
import { CupCell } from './CupCell';

interface BracketGridProps {
  grid: Grid;
  teams: Record<string, string>;
  highlightTeamId?: string | null;
  /** Mark the last match (highest column) as the final — single-elim only. */
  markFinal?: boolean;
}

/** Absolute-positions each cell by (col,row,span) over the connector overlay. */
export function BracketGrid({
  grid,
  teams,
  highlightTeamId,
  markFinal,
}: BracketGridProps) {
  const w = gridWidth(grid.columns, grid);
  const h = gridHeight(grid.rows, grid);
  const matchCells = grid.cells.filter((c) => c.kind === 'match');
  // No "final" ring when there's only a single match (e.g. a 2-team bracket).
  const finalCol =
    markFinal && matchCells.length > 1
      ? Math.max(-1, ...matchCells.map((c) => c.col))
      : -1;
  return (
    <div className="relative" style={{ width: w, height: h }}>
      <Connectors grid={grid} />
      {grid.cells.map((cell) => (
        <div
          key={`${cell.col}-${cell.row}-${cell.kind}`}
          className="absolute"
          style={{
            // The cup hugs the final box (pull it back by most of the column gap).
            left:
              cell.kind === 'cup'
                ? colLeftX(cell.col, grid) - grid.columnSpacing + 16
                : colLeftX(cell.col, grid),
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
              isFinal={markFinal && cell.col === finalCol}
            />
          )}
          {cell.kind === 'cup' && <CupCell />}
        </div>
      ))}
    </div>
  );
}
