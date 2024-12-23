import { IVector2 } from '@/types/Vectors';

export function distanceBetween(v1: IVector2, v2: IVector2): number {
  return Math.sqrt((Math.pow(v2.x-v1.x,2))+(Math.pow(v2.y-v1.y,2)))
}