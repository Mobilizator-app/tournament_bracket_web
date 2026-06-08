import type { ConnState } from '@/lib/types';

const STATES: Record<
  ConnState,
  { label: string; dot: string; pulse: boolean }
> = {
  connecting: { label: 'Connecting', dot: 'bg-text-secondary', pulse: true },
  live: { label: 'Live', dot: 'bg-accent-green', pulse: true },
  reconnecting: { label: 'Reconnecting', dot: 'bg-amber-400', pulse: true },
  stopped: { label: 'Final', dot: 'bg-text-secondary', pulse: false },
};

export function LiveBadge({ connState }: { connState: ConnState }) {
  const s = STATES[connState];
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
        {s.pulse && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${s.dot} opacity-60`}
          />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${s.dot}`}
        />
      </span>
      <span className="text-xs font-bold uppercase tracking-wide text-text-secondary md:text-base">
        {s.label}
      </span>
    </div>
  );
}
