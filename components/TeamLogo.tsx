'use client';

import { createContext, useContext } from 'react';

interface TeamLogosCtx {
  /** teamId -> base64 data URI (undefined when that team has no uploaded logo). */
  logos: Record<string, string | undefined>;
  /** Whether the tournament uses team logos at all. */
  showLogos: boolean;
}

const Ctx = createContext<TeamLogosCtx>({ logos: {}, showLogos: false });

export const TeamLogosProvider = Ctx.Provider;

export function useTeamLogos(): TeamLogosCtx {
  return useContext(Ctx);
}

/** Deterministic fallback colour from the team name — mirrors the app's TeamLogo. */
function colorFromName(name: string): string {
  const n = name.trim().toLowerCase();
  if (!n) return 'hsl(0, 0%, 45%)';
  let hash = 0;
  for (let i = 0; i < n.length; i++) hash = hash * 31 + n.charCodeAt(i);
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 50%, 55%)`;
}

/**
 * Round team logo: the uploaded image when present, otherwise a coloured circle
 * with the team's first letter. Mirrors the Flutter app's `TeamLogo` widget.
 */
export function TeamLogo({
  name,
  logo,
  size = 22,
}: {
  name: string;
  logo?: string;
  size?: number;
}) {
  const dim = { width: size, height: size };
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={logo}
        alt=""
        style={dim}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }
  const letter = (name.trim()[0] ?? '?').toUpperCase();
  return (
    <span
      style={{ ...dim, backgroundColor: colorFromName(name), fontSize: size * 0.46 }}
      className="flex shrink-0 items-center justify-center rounded-full font-semibold leading-none text-white"
    >
      {letter}
    </span>
  );
}

/** Standings-cell helper: logo + name, but only when the tournament uses logos. */
export function TeamNameCell({ teamId, name }: { teamId: string; name: string }) {
  const { logos, showLogos } = useTeamLogos();
  if (!showLogos) return <>{name}</>;
  return (
    <span className="flex items-center gap-2">
      <TeamLogo name={name} logo={logos[teamId]} size={20} />
      <span className="truncate">{name}</span>
    </span>
  );
}
