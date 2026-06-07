import type { CSSProperties } from 'react';
import type { RenderTokens } from '@/lib/types';

/**
 * Map a snapshot's render.colors onto the CSS custom properties that Tailwind
 * reads, so a tournament can carry its own palette and the web follows without
 * a rebuild. Returned as inline style for a wrapper element.
 */
export function cssVarsFromRender(render?: RenderTokens): CSSProperties {
  if (!render) return {};
  const c = render.colors;
  return {
    ['--c-bg' as string]: c.background,
    ['--c-surface' as string]: c.surface,
    ['--c-border' as string]: c.border,
    ['--c-accent-red' as string]: c.accentRed,
    ['--c-accent-green' as string]: c.accentGreen,
    ['--c-text-primary' as string]: c.textPrimary,
    ['--c-text-secondary' as string]: c.textSecondary,
  } as CSSProperties;
}

export function teamNameMap(teams: { id: string; name: string }[]): Record<string, string> {
  return Object.fromEntries(teams.map((t) => [t.id, t.name]));
}
