import { IVector2 } from '@/types/Vectors';

export function getMidpoint(p1: IVector2, p2: IVector2): IVector2 {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}
