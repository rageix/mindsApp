import { IVector2 } from '@/types/Vectors';

export function distanceBetween(v1: IVector2, v2: IVector2): number {
  return Math.sqrt((Math.pow(v1.x-v2.x,2))+(Math.pow(v1.y-v2.y,2)))
}