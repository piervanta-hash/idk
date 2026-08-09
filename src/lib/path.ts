/* ==========================================================================
   TRACCIATI MORBIDI DA POCHI PUNTI

   Le coste si disegnano indicando una manciata di citta' reali e lasciando
   che la curva le attraversi: scrivere a mano decine di comandi di curva
   sarebbe illeggibile e impossibile da correggere.

   Catmull-Rom convertita in curve di Bezier cubiche: la curva passa
   esattamente per i punti dati, senza oscillazioni.
   ========================================================================== */

export type Pt = [number, number];

export function smoothPath(points: Pt[], closed = false, tension = 1): string {
  if (points.length < 2) return "";

  const p = (i: number): Pt => {
    if (closed) return points[(i + points.length) % points.length];
    return points[Math.max(0, Math.min(points.length - 1, i))];
  };

  const last = closed ? points.length : points.length - 1;
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;

  for (let i = 0; i < last; i++) {
    const p0 = p(i - 1);
    const p1 = p(i);
    const p2 = p(i + 1);
    const p3 = p(i + 2);

    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension;

    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }

  return closed ? `${d} Z` : d;
}
