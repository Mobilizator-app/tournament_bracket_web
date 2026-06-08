import type { EliminationBlock, Grid, GridCell } from '@/lib/types';
import { BracketGrid } from './BracketGrid';
import { MatchCard } from './MatchCard';
import { CupCell } from './CupCell';
import {
  gridWidth,
  gridHeight,
  cellCenterY,
  colRightX,
  anchoredCurvePath,
  EDGE_PADDING,
} from '@/lib/geometry';

interface EliminationViewProps {
  block: EliminationBlock;
  teams: Record<string, string>;
  highlightTeamId?: string | null;
}

const DOUBLE_GAP = 48; // vertical gap between winners and losers grids
const GF_GAP = 96; // horizontal gap before the Grand Final box
const BOX_HEIGHT = 96;

function lastMatchCell(grid: Grid): GridCell | null {
  let best: GridCell | null = null;
  for (const c of grid.cells) {
    if (c.kind !== 'match') continue;
    if (!best || c.col > best.col) best = c;
  }
  return best;
}

/**
 * Single-elim = one grid. Double-elim = winners grid over losers grid, with the
 * Grand Final box placed to the RIGHT of both (so the WB final feeds it from the
 * top-left and the LB final from the bottom-left — no backwards lines), then the
 * cup beside it.
 */
export function EliminationView({
  block,
  teams,
  highlightTeamId,
}: EliminationViewProps) {
  if (block.kind === 'single' || !block.losersGrid) {
    return (
      <BracketGrid
        grid={block.grid}
        teams={teams}
        highlightTeamId={highlightTeamId}
        markFinal
      />
    );
  }

  const w = block.grid;
  const l = block.losersGrid;
  const H1 = gridHeight(w.rows, w);
  const W1 = gridWidth(w.columns, w);
  const W2 = gridWidth(l.columns, l);
  const H2 = gridHeight(l.rows, l);
  const losersTop = H1 + DOUBLE_GAP;
  const bracketsW = Math.max(W1, W2);

  const wbFinal = lastMatchCell(w);
  const lbFinal = lastMatchCell(l);
  const gf = block.grandFinal;

  // Grand Final box: to the right of both brackets. Align its UPPER slot with
  // the WB final's center so the WB-final -> Grand Final line is dead straight.
  const gfLeft = bracketsW + GF_GAP;
  const gfRow = wbFinal ? wbFinal.row : 0;
  const wbFinalCenterY = cellCenterY(gfRow, 2, w);
  const gfTopY = wbFinalCenterY - 23;
  const cupLeft = gfLeft + w.columnWidth + 16;
  const totalW = cupLeft + w.columnWidth;
  const totalH = losersTop + H2;

  // Anchors into the GF box left edge: upper slot for WB, lower slot for LB.
  const gfLeftX = gfLeft - EDGE_PADDING;
  const upperSlotY = gfTopY + 23;
  const lowerSlotY = gfTopY + BOX_HEIGHT - 23;

  const paths: string[] = [];
  if (gf && wbFinal) {
    paths.push(
      anchoredCurvePath(
        { x: colRightX(wbFinal.col, w) + EDGE_PADDING, y: cellCenterY(wbFinal.row, 2, w) },
        { x: gfLeftX, y: upperSlotY },
      ),
    );
  }
  if (gf && lbFinal) {
    paths.push(
      anchoredCurvePath(
        {
          x: colRightX(lbFinal.col, l) + EDGE_PADDING,
          y: cellCenterY(lbFinal.row, 2, l) + losersTop,
        },
        { x: gfLeftX, y: lowerSlotY },
      ),
    );
  }

  return (
    <div className="relative" style={{ width: totalW, height: totalH }}>
      <div className="absolute left-0 top-0">
        <BracketGrid grid={w} teams={teams} highlightTeamId={highlightTeamId} />
      </div>
      <div className="absolute left-0" style={{ top: losersTop }}>
        <BracketGrid grid={l} teams={teams} highlightTeamId={highlightTeamId} />
      </div>

      {paths.length > 0 && (
        <svg
          className="pointer-events-none absolute left-0 top-0"
          width={totalW}
          height={totalH}
          style={{ overflow: 'visible' }}
          aria-hidden
        >
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--c-border)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      )}

      {gf && (
        <>
          <div
            className="absolute"
            style={{ left: gfLeft, top: gfTopY, width: w.columnWidth, height: BOX_HEIGHT }}
          >
            <div className="absolute -top-6 left-0 right-0 text-center text-xs font-bold uppercase tracking-widest text-amber-400">
              Final
            </div>
            <MatchCard
              match={gf}
              teams={teams}
              highlightTeamId={highlightTeamId}
              isFinal
            />
          </div>
          <div
            className="absolute"
            style={{ left: cupLeft, top: gfTopY, width: w.columnWidth, height: BOX_HEIGHT }}
          >
            <CupCell />
          </div>
        </>
      )}
    </div>
  );
}
