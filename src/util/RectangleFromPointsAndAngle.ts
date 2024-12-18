import { IVector2 } from '@/types/Vectors';
import { degreesToRadians } from '@/util/DegreesToRadians';

export function rectangleFromPointsAndAngle(
  anchor: IVector2,
  target: IVector2,
  degrees: number,
): number[] {
  const x1 = anchor.x,
    y1 = anchor.y,
    x3 = target.x,
    y3 = target.y,
    angle = degreesToRadians(degrees);

  const mx = x1 + (x3 - x1) * 0.5,
    my = y1 + (y3 - y1) * 0.5,
    cos = Math.cos(-angle),
    sin = Math.sin(-angle);

  // unrotate known points (using negative of known angle)
  const x1u = cos * (x1 - mx) - sin * (y1 - my) + mx,
    y1u = sin * (x1 - mx) + cos * (y1 - my) + my,
    x3u = cos * (x3 - mx) - sin * (y3 - my) + mx,
    y3u = sin * (x3 - mx) + cos * (y3 - my) + my;

  // Get width and height:
  const width = Math.abs(x3u - x1u),
    height = Math.abs(y3u - y1u);

  return [width, height];
}
