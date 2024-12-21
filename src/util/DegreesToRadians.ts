const RATIO = Math.PI / 180;

export function degreesToRadians(d: number): number {
  return d * RATIO;
}
