import { IVector2 } from '@/types/Vectors';

export function calculateLastPoint(point1: IVector2, point2: IVector2) {
  // Calculate the length of the long side
  const length = Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2),
  );

  // Find the midpoint of the long side
  const midpoint = {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  };

  // Calculate the angle between the long side and the x-axis
  const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);

  // Calculate the coordinates of the last point using the midpoint and angle
  const lastPoint = {
    x: midpoint.x + (length / 2) * Math.cos(angle + Math.PI / 2),
    y: midpoint.y + (length / 2) * Math.sin(angle + Math.PI / 2),
  };

  return lastPoint;
}
