const RATIO = 180 / Math.PI;

export function radiansToDegrees(r: number): number {
  return r * RATIO;
}
