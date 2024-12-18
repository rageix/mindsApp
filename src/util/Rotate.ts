import { IVector2 } from '@/types/Vectors';
import { degreesToRadians } from '@/util/DegreesToRadians';

export function rotate(target: IVector2, origin: IVector2, deg: number): IVector2 {
  //Translate point to the origin
  const p0 = target.x - origin.x,
    p1 = target.y - origin.y,
    rad = degreesToRadians(deg),
    sinC = Math.sin(rad),
    cosC = Math.cos(rad);
  //perform rotation and translate to correct position
  return {
    x: p0 * cosC - p1 * sinC + origin.x,
    y: p0 * sinC + p1 * cosC + origin.y,
  };
}
