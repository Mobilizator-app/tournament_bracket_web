import type { Connector } from '@/lib/types';

// Direct port of the Flutter app's BracketsConnectorsPainter geometry
// (lib/.../widgets/bracket_connector.dart). Keeping the math identical is what
// makes the web bracket line up pixel-for-pixel with the app.

export interface GridMetrics {
  rowHeight: number;
  rowSpacing: number;
  columnWidth: number;
  columnSpacing: number;
}

export const EDGE_PADDING = 8;

export function colLeftX(col: number, m: GridMetrics): number {
  return col * (m.columnWidth + m.columnSpacing);
}

export function colRightX(col: number, m: GridMetrics): number {
  return col * (m.columnWidth + m.columnSpacing) + m.columnWidth;
}

export function cellTop(row: number, m: GridMetrics): number {
  return row * (m.rowHeight + m.rowSpacing);
}

export function cellHeight(span: number, m: GridMetrics): number {
  return span * m.rowHeight + (span - 1) * m.rowSpacing;
}

export function cellCenterY(row: number, span: number, m: GridMetrics): number {
  return cellTop(row, m) + cellHeight(span, m) / 2;
}

/** Center of the upper (slot 0) or lower (slot 1) team row of a 2-span cell. */
export function teamSlotCenterY(row: number, slot: number, m: GridMetrics): number {
  const top = cellTop(row, m);
  if (slot <= 0) return top + m.rowHeight / 2;
  return top + m.rowHeight + m.rowSpacing + m.rowHeight / 2;
}

export function gridWidth(columns: number, m: GridMetrics): number {
  return columns * (m.columnWidth + m.columnSpacing);
}

export function gridHeight(rows: number, m: GridMetrics): number {
  return rows * (m.rowHeight + m.rowSpacing);
}

/**
 * Build the SVG path `d` for a connector, mirroring the painter exactly:
 * straight line, or an S-curve with control points at 5/40/60/95% of the
 * vertical delta.
 */
export function connectorPath(c: Connector, m: GridMetrics): string {
  const x1 = colRightX(c.fromCol, m) + EDGE_PADDING;
  const y1 = cellCenterY(c.fromRow, c.fromSpan, m);
  const x2 = colLeftX(c.toCol, m) - EDGE_PADDING;

  let y2: number;
  if (c.kind === 'straight' || c.toSpan <= 1) {
    y2 = cellCenterY(c.toRow, c.toSpan, m);
  } else {
    const childCenter = cellCenterY(c.toRow, c.toSpan, m);
    // Two children sit clearly above/below the parent center -> aim at their
    // team slot. A single/aligned child (e.g. WB-final -> Grand Final) is level
    // with the center, so aim at the center to keep the line straight.
    if (Math.abs(y1 - childCenter) < m.rowHeight) {
      y2 = childCenter;
    } else {
      const toSlot = y1 <= childCenter ? 0 : 1;
      y2 = teamSlotCenterY(c.toRow, toSlot, m);
    }
  }

  if (c.kind === 'straight') {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const dy = y2 - y1;
  // Aligned endpoints -> a straight line. (The app nudges absDy up to half a
  // row here, which adds a visible hook on level connectors — we don't want it.)
  if (Math.abs(dy) < 2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const midX = (x1 + x2) / 2;
  const absDy = Math.abs(dy);
  const sign = dy >= 0 ? 1 : -1;

  const yCtrl1 = y1 + sign * absDy * 0.05;
  const yMidTop = y1 + sign * absDy * 0.4;
  const yMidBot = y1 + sign * absDy * 0.6;
  const yCtrl2 = y1 + sign * absDy * 0.95;

  return `M ${x1} ${y1} Q ${midX} ${yCtrl1} ${midX} ${yMidTop} L ${midX} ${yMidBot} Q ${midX} ${yCtrl2} ${x2} ${y2}`;
}

/** Anchor on the right-center of a cell — used for the double-elim cross curve. */
export function rightCenterAnchor(
  col: number,
  row: number,
  span: number,
  m: GridMetrics,
): { x: number; y: number } {
  return { x: colRightX(col, m) + EDGE_PADDING, y: cellCenterY(row, span, m) };
}

/** Anchor on the left-center of a cell. */
export function leftCenterAnchor(
  col: number,
  row: number,
  span: number,
  m: GridMetrics,
): { x: number; y: number } {
  return { x: colLeftX(col, m) - EDGE_PADDING, y: cellCenterY(row, span, m) };
}

/** S-curve between two free-floating anchors (mirrors the anchored branch). */
export function anchoredCurvePath(
  a: { x: number; y: number },
  b: { x: number; y: number },
): string {
  const { x: x1, y: y1 } = a;
  const { x: x2, y: y2 } = b;
  const midX = (x1 + x2) / 2;
  const dy = y2 - y1;
  const absDy = Math.abs(dy);
  const sign = dy >= 0 ? 1 : -1;
  const yCtrl1 = y1 + sign * absDy * 0.05;
  const yMidTop = y1 + sign * absDy * 0.4;
  const yMidBot = y1 + sign * absDy * 0.6;
  const yCtrl2 = y1 + sign * absDy * 0.95;
  return `M ${x1} ${y1} Q ${midX} ${yCtrl1} ${midX} ${yMidTop} L ${midX} ${yMidBot} Q ${midX} ${yCtrl2} ${x2} ${y2}`;
}
