import { IVector2 } from '@/types/Vectors';

export function threePointDistance(
  point1: IVector2,
  point2: IVector2,
  point3: IVector2,
): number {
  // Calculate slope of the original line
  const slope = (point2.y - point1.y) / (point2.x - point1.x);

  if(slope === Infinity || slope === -Infinity) {
    return Infinity;
  }

  // Calculate the y-intercept of the parallel line using point3
  const yIntercept = point3.y - slope * point3.x;

  // Calculate the distance between the lines
  const distance =
    Math.abs(yIntercept - point1.y + slope * point1.x) /
    Math.sqrt(1 + slope * slope);

  // return {
  //   parallelLine: { slope, yIntercept },
  //   distance
  // };
  return distance;
}
