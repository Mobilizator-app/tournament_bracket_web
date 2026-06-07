// LiveSnapshot contract (schemaVersion 1).
//
// This is the single, format-agnostic JSON shape that the Flutter app produces
// and the web renders. The web is a *pure deterministic renderer*: it never
// recomputes bracket logic or geometry — it draws exactly what the snapshot
// carries (cells at col/row/span + connectors). See plan §1.

export const SCHEMA_VERSION = 1 as const;

/** Live connection state shown by the LiveBadge. */
export type ConnState = 'connecting' | 'live' | 'reconnecting' | 'stopped';

export type TournamentFormat =
  | 'singleElimination'
  | 'doubleElimination'
  | 'roundRobin'
  | 'groupStage'
  | 'swissSystem';

/** pending = slot(s) not filled yet; ready = both teams, no score; final = decided; bye = walkover. */
export type MatchState = 'pending' | 'ready' | 'final' | 'bye';

export type ConnectorKind = 'straight' | 'curve';

export interface Team {
  id: string;
  name: string;
}

/** Reference to a team inside a match. teamId null => slot is TBD (not yet known). */
export interface TeamRef {
  teamId: string | null;
  isBye?: boolean;
}

export interface MatchScore {
  first: number;
  second: number;
}

export interface Match {
  /** App-internal stable id (int). Used as a React key. */
  matchNumber: number;
  first: TeamRef;
  second: TeamRef;
  /** null when no score entered yet. */
  score: MatchScore | null;
  /** Precomputed by the app (MatchModel.winner). null when undecided. */
  winnerTeamId: string | null;
  state: MatchState;
  /** Round-robin / group / swiss only: true when a finished match ended level. */
  isTie?: boolean;
}

// ---------------------------------------------------------------------------
// Elimination (single / double / group-playoff) — pre-laid-out grid.
// ---------------------------------------------------------------------------

export type GridCellKind = 'match' | 'cup' | 'spacer';

export interface GridCell {
  col: number;
  row: number;
  /** Number of grid-rows this cell spans (a match box is span 2). */
  span: number;
  kind: GridCellKind;
  /** Present when kind === 'match'. */
  match?: Match;
}

export interface Connector {
  fromCol: number;
  fromRow: number;
  toCol: number;
  toRow: number;
  fromSpan: number;
  toSpan: number;
  kind: ConnectorKind;
}

/**
 * A fully laid-out bracket grid. Layout constants are echoed here (not in
 * `render`) because they are geometry, not theme — the web computes connector
 * anchors with the same math as the app's BracketsConnectorsPainter.
 */
export interface Grid {
  columns: number;
  rows: number;
  rowHeight: number;
  rowSpacing: number;
  columnWidth: number;
  columnSpacing: number;
  cells: GridCell[];
  connectors: Connector[];
}

export interface GrandFinal {
  matchNumber: number;
  /** WB-finalist vs LB-finalist. */
  final: MatchScore | null;
  /** Reset/second match, present only when the WB-finalist lost `final`. */
  grand: MatchScore | null;
  first: TeamRef;
  second: TeamRef;
  winnerTeamId: string | null;
}

/** Free-floating curve linking the LB-final box to the Grand Final box. */
export interface CrossConnector {
  fromGrid: 'winners' | 'losers';
  fromCol: number;
  fromRow: number;
  toGrid: 'winners' | 'losers';
  toCol: number;
  toRow: number;
  kind: ConnectorKind;
}

export interface EliminationBlock {
  kind: 'single' | 'double';
  /** Winners grid (also the only grid for single-elim). */
  grid: Grid;
  /** Losers grid — double-elim only. */
  losersGrid?: Grid;
  /** Double-elim only. */
  grandFinal?: GrandFinal;
  /** Double-elim only. */
  crossConnector?: CrossConnector;
}

// ---------------------------------------------------------------------------
// Standings-based formats (round-robin / group / swiss).
// ---------------------------------------------------------------------------

export interface PointSystem {
  allowDraws: boolean;
  win: number;
  draw: number;
  loss: number;
}

/** Generic standings row; not all fields apply to every format. */
export interface StandingRow {
  rank: number;
  teamId: string;
  pts: number;
  /** played / matches-played */
  p?: number;
  gp?: number;
  w: number;
  d: number;
  l: number;
  for?: number;
  against?: number;
  gd?: number;
  /** swiss tiebreak (Buchholz-like). */
  tb?: number;
  /** swiss score difference. */
  diff?: number;
}

export interface RoundTour {
  number: number;
  matches: Match[];
}

export interface RoundRobinRound {
  number: number;
  tours: RoundTour[];
}

export interface RoundRobinBlock {
  pointSystem: PointSystem;
  rounds: RoundRobinRound[];
  standings: StandingRow[];
}

export interface Group {
  name: string;
  matches: Match[];
  standings: StandingRow[];
}

export interface GroupStageBlock {
  playOff: boolean;
  playOffTeamsCount: number;
  pointSystem: PointSystem;
  groups: Group[];
}

export interface SwissRound {
  number: number;
  isFinished: boolean;
  matches: Match[];
}

export interface SwissBlock {
  totalRounds: number;
  pointSystem: PointSystem;
  rounds: SwissRound[];
  standings: StandingRow[];
}

// ---------------------------------------------------------------------------
// Render tokens — design system carried with the data so the web can't drift.
// ---------------------------------------------------------------------------

export interface RenderTokens {
  colors: {
    background: string;
    surface: string;
    border: string;
    accentRed: string;
    accentGreen: string;
    textPrimary: string;
    textSecondary: string;
  };
  fontFamily: string;
  match: {
    boxHeight: number;
    rowHeight: number;
    scoreBoxSize: number;
    radius: number;
  };
  radii: {
    card: number;
    input: number;
    tableHeader: number;
  };
  standings: {
    roundRobinColRatios: number[];
    swissColRatios: number[];
  };
}

// ---------------------------------------------------------------------------
// Top-level snapshot.
// ---------------------------------------------------------------------------

export interface LiveSnapshot {
  schemaVersion: number;
  /** App's opaque ISO id. */
  tournamentId: string;
  name: string;
  format: TournamentFormat;
  seeded: boolean;
  /** ISO-8601 UTC of when the snapshot was built. */
  generatedAt: string;
  /** Monotonic per-tournament counter; used to ignore out-of-order SSE frames. */
  appRevision: number;
  teams: Team[];
  render: RenderTokens;
  elimination?: EliminationBlock;
  roundRobin?: RoundRobinBlock;
  groupStage?: GroupStageBlock;
  swiss?: SwissBlock;
  /** Teams a viewer may tap to highlight their path. */
  highlightableTeamIds: string[];
}

// ---------------------------------------------------------------------------
// Shared default render tokens (fallback when a snapshot omits `render`).
// Mirrors the Flutter app's resources/app_colors.dart + app_styles.dart.
// ---------------------------------------------------------------------------

export const DEFAULT_RENDER: RenderTokens = {
  colors: {
    background: '#151515',
    surface: '#222223',
    border: '#575757',
    accentRed: '#FF232B',
    accentGreen: '#00DE00',
    textPrimary: '#FFFFFF',
    textSecondary: '#74727F',
  },
  fontFamily: 'Jost',
  match: { boxHeight: 96, rowHeight: 46, scoreBoxSize: 46, radius: 7 },
  radii: { card: 7, input: 12, tableHeader: 16 },
  standings: {
    roundRobinColRatios: [3, 8, 4, 7, 4, 5],
    swissColRatios: [3, 9, 3, 3, 3, 3, 4, 4, 4],
  },
};
