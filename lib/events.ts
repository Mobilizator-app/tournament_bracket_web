import { track } from './firebase';

/**
 * Single source of truth for every analytics event in the web app.
 * Each method maps to one Firebase Analytics event with typed params, so all
 * tracked events are visible in one place.
 */
export const analytics = {
  /** A tournament live page was opened. */
  tournamentOpen: (format: string) => track('tournament_open', { format }),

  /** How the viewer arrived: 'qr' (scanned), 'link' (tapped a shared link), or 'direct'. */
  shareSource: (source: string) => track('share_source', { source }),

  /** A team chip was tapped to highlight its path (feature-usage signal; count it). */
  highlightTeam: () => track('highlight_team'),

  /** Highlight was cleared. */
  highlightClear: () => track('highlight_clear'),

  /** App Store button tapped. `placement`: hero | header | live_header. */
  appStoreClick: (placement = 'unknown') =>
    track('appstore_click', { placement }),

  /** Google Play button tapped. `placement`: hero | header | live_header. */
  playStoreClick: (placement = 'unknown') =>
    track('playstore_click', { placement }),

  /** Contact form submitted. ok=false when the request failed. */
  contactSubmit: (ok: boolean) => track('contact_submit', { ok }),

  /** The champion banner became visible (a tournament reached a winner; team name not tracked). */
  championShown: () => track('champion_shown'),

  /** SSE stream connected. */
  liveConnected: (format: string) => track('live_connected', { format }),

  /** SSE stream dropped and is reconnecting. */
  liveReconnecting: (format: string) =>
    track('live_reconnecting', { format }),

  /** The tournament stopped broadcasting. */
  liveEnded: (format: string) => track('live_ended', { format }),

  /** Uncaught error / render crash — the web equivalent of Crashlytics. */
  exception: (description: string, fatal: boolean) =>
    track('exception', { description: description.slice(0, 150), fatal }),
};
