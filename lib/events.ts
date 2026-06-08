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

  /** A team chip was tapped to highlight its path. */
  highlightTeam: (team: string) => track('highlight_team', { team }),

  /** Highlight was cleared. */
  highlightClear: () => track('highlight_clear'),

  /** The App Store button was tapped. */
  appStoreClick: () => track('appstore_click'),

  /** Contact form submitted. ok=false when the request failed. */
  contactSubmit: (ok: boolean) => track('contact_submit', { ok }),

  /** The champion banner became visible. */
  championShown: (team: string) => track('champion_shown', { team }),

  /** SSE stream connected. */
  liveConnected: () => track('live_connected'),

  /** SSE stream dropped and is reconnecting. */
  liveReconnecting: () => track('live_reconnecting'),

  /** The tournament stopped broadcasting. */
  liveEnded: () => track('live_ended'),

  /** Uncaught error / render crash — the web equivalent of Crashlytics. */
  exception: (description: string, fatal: boolean) =>
    track('exception', { description: description.slice(0, 150), fatal }),
};
