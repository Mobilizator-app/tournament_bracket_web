import type { LiveSnapshot } from './types';

export interface SnapshotResponse {
  code: string;
  revision: number;
  schemaVersion: number;
  isLive: boolean;
  snapshot: LiveSnapshot;
}

// Server-side fetch must hit the backend directly; client-side uses a relative
// path proxied by Next rewrites (so EventSource/fetch are same-origin).
function serverApiBase(): string {
  return process.env.API_BASE ?? 'http://localhost:8080';
}

/** Public client-side base ('' => relative, proxied via next.config rewrites). */
export function clientApiBase(): string {
  return process.env.NEXT_PUBLIC_API_BASE ?? '';
}

export async function fetchSnapshot(
  code: string,
): Promise<SnapshotResponse | null> {
  const res = await fetch(`${serverApiBase()}/api/tournaments/${code}`, {
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`snapshot fetch failed: ${res.status}`);
  return (await res.json()) as SnapshotResponse;
}

export function streamUrl(code: string): string {
  return `${clientApiBase()}/api/tournaments/${code}/stream`;
}
