import { IVector2 } from '@/types/Vectors';

/**
 * Checks if vec3 is positive against a line of vec1 and vec2
 * @param vec1 - Line point 1
 * @param vec2 - Line point 2
 * @param vec3 - Point to check if is positive
 */
export function isPointPositive(vec1: IVector2, vec2: IVector2, vec3: IVector2): boolean {
  // Calculate the cross product of the vectors formed by the two line segments
  const crossProduct =
    (vec2.x - vec1.x) * (vec3.y - vec1.y) -
    (vec3.x - vec1.x) * (vec2.y - vec1.y);

  // If cross product is positive, the point is on the left side (positive)
  return crossProduct > 0
}