'use client';

import { PLAY_STORE_URL } from '@/lib/constants';
import { analytics } from '@/lib/events';

/** "Google Play" pill linking to the Android app. `compact` => icon-only on mobile. */
export function PlayStoreButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => analytics.playStoreClick()}
      className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black transition-opacity hover:opacity-85 md:gap-2 md:px-5 md:py-2.5 md:text-base"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 md:h-5 md:w-5" fill="currentColor" aria-hidden>
        <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.04.906-.208l13.324-7.545-3.23-3.18z" />
      </svg>
      <span className={compact ? 'hidden md:inline' : undefined}>Google Play</span>
    </a>
  );
}
