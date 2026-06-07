import type { Grid } from '@/lib/types';
import { connectorPath, gridWidth, gridHeight } from '@/lib/geometry';

/** SVG overlay drawing the connector lines for one grid. */
export function Connectors({ grid }: { grid: Grid }) {
  const w = gridWidth(grid.columns, grid);
  const h = gridHeight(grid.rows, grid);
  return (
    <svg
      className="pointer-events-none absolute left-0 top-0"
      width={w}
      height={h}
      style={{ overflow: 'visible' }}
      aria-hidden
    >
      {grid.connectors.map((c, i) => (
        <path
          key={i}
          d={connectorPath(c, grid)}
          fill="none"
          stroke="var(--c-border)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
