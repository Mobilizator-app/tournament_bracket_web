import type { ReactNode } from 'react';
import type { StandingRow } from '@/lib/types';

export interface Column {
  label: string;
  ratio: number;
  align?: 'left' | 'center';
  render: (row: StandingRow, teams: Record<string, string>) => ReactNode;
}

// Mirrors the app's standings tables: 36px header on a surface fill with a
// 16px top radius, rows separated by #575757 borders, column widths by ratio.
export function StandingsTable({
  columns,
  rows,
  teams,
}: {
  columns: Column[];
  rows: StandingRow[];
  teams: Record<string, string>;
}) {
  return (
    <div className="min-w-[320px]">
      <div className="flex h-9 items-center rounded-t-table-header border border-surface-border bg-surface">
        {columns.map((c, i) => (
          <div
            key={i}
            style={{ flex: c.ratio }}
            className={`px-2 text-xs font-bold uppercase tracking-wide text-text-secondary ${
              c.align === 'left' ? 'text-left' : 'text-center'
            }`}
          >
            {c.label}
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.teamId}
          className="flex items-center border-x border-b border-surface-border bg-surface/40 last:rounded-b-card"
        >
          {columns.map((c, i) => (
            <div
              key={i}
              style={{ flex: c.ratio }}
              className={`truncate px-2 py-2.5 text-sm ${
                c.align === 'left'
                  ? 'text-left font-bold uppercase'
                  : 'text-center'
              }`}
            >
              {c.render(row, teams)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function formatGd(gd: number | undefined): string {
  if (gd == null) return '-';
  return gd > 0 ? `+${gd}` : `${gd}`;
}
