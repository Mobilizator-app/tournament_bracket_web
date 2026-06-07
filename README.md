# Tournament Live — web (Next.js)

Public, no-auth live viewer for tournament brackets. A participant opens
`/t/<code>`, sees the full bracket, and it updates in real time over SSE.
Visually identical to the Flutter app (same colors, Jost font, UI kit).

The web is a **pure renderer**: it draws exactly what the `LiveSnapshot`
carries (pre-laid-out grid cells + connectors, or standings tables). No bracket
logic is reimplemented here.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

Backend connection is configured in `.env.local`:

```
API_BASE=http://localhost:8080            # server-side SSR fetch
NEXT_PUBLIC_API_BASE=http://localhost:8080 # client EventSource (SSE, direct — bypasses dev rewrites)
```

## Routes

- `/t/[code]` — live tournament page (SSR initial load + EventSource stream).
- `/dev/[fixture]` — render any file in `fixtures/` without a backend (design/dev).
- `/` — lists the dev fixtures.

## Fixtures

`fixtures/*.json` are sample `LiveSnapshot`s (one per format) used to develop
the renderer independently of the backend and app. Schema: `lib/types.ts`.

## Structure

```
lib/types.ts        LiveSnapshot contract (TypeScript)
lib/geometry.ts     port of the app's connector math (anchors + S-curve)
lib/useLiveSnapshot EventSource hook (reconnect, revision-ordered)
components/bracket   elimination grid, match cards, SVG connectors, cup, zoom
components/standings standings table + match list (round-robin/swiss/group)
components/format     per-format views
components/TournamentView  root dispatcher by format
```
# tournament_bracket_web
