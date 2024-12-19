import { IVector2 } from '@/types/Vectors';
import { ICorners } from '@/types/Corners';

export function getBoundingBox(corners: ICorners[]): ICorners {
  const vectors: IVector2[] = [];

  for (const corner of corners) {
    vectors.push(corner.bottomLeft);
    vectors.push(corner.topLeft);
    vectors.push(corner.topRight);
    vectors.push(corner.bottomRight);
  }

  const xValues = vectors.map((v) => v.x);
  const yValues = vectors.map((v) => v.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  return {
    bottomLeft: {
      x: minX,
      y: maxY,
    },
    topLeft: {
      x: minX,
      y: minY,
    },
    topRight: {
      x: maxX,
      y: minY,
    },
    bottomRight: {
      x: maxX,
      y: maxY,
    },
  };
}
