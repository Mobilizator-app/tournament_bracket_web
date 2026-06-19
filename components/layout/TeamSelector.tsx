'use client';

import type { Team } from '@/lib/types';
import { analytics } from '@/lib/events';
import { TeamLogo, useTeamLogos } from '@/components/TeamLogo';

interface TeamSelectorProps {
  teams: Team[];
  highlightableIds: string[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

/** Horizontal chip row: tap a team to highlight its path; tap again / Clear to reset. */
export function TeamSelector({
  teams,
  highlightableIds,
  selected,
  onSelect,
}: TeamSelectorProps) {
  const ids = new Set(highlightableIds);
  const list = teams.filter((t) => ids.has(t.id));
  const { showLogos } = useTeamLogos();
  if (list.length === 0) return null;

  return (
    <div className="flex shrink-0 items-center gap-2 overflow-x-auto border-b border-surface-border px-4 py-2 md:px-8">
      <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-text-secondary">
        Highlight
      </span>
      {selected && (
        <button
          onClick={() => {
            analytics.highlightClear();
            onSelect(null);
          }}
          className="shrink-0 rounded-full border border-surface-border px-3 py-1 text-xs font-bold uppercase text-text-secondary transition-colors hover:text-text-primary"
        >
          Clear
        </button>
      )}
      {list.map((t) => {
        const active = t.id === selected;
        return (
          <button
            key={t.id}
            onClick={() => {
              const next = active ? null : t.id;
              if (next) {
                analytics.highlightTeam();
              } else {
                analytics.highlightClear();
              }
              onSelect(next);
            }}
            className={`flex shrink-0 items-center gap-1.5 rounded-full py-1 text-xs font-bold uppercase transition-colors ${
              showLogos ? 'pl-1.5 pr-3' : 'px-3'
            } ${
              active
                ? 'bg-accent-green text-bg'
                : 'bg-surface text-text-primary hover:bg-surface-border'
            }`}
          >
            {showLogos && <TeamLogo name={t.name} logo={t.logo} size={16} />}
            {t.name}
          </button>
        );
      })}
    </div>
  );
}
