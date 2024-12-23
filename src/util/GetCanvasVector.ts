import { IVector2 } from '@/types/Vectors';
import { MouseEvent } from 'react';
import { roundTo1Place } from '@/util/RoundTo1Place';

export function getCanvasVector(e: MouseEvent<HTMLCanvasElement>): IVector2 {
  const devicePixelRatio = window.devicePixelRatio;
  const rect = e.currentTarget.getBoundingClientRect();
  return {
    x: roundTo1Place(
      (((e.clientX - rect.left) / (rect.right - rect.left)) *
        e.currentTarget.width) /
        devicePixelRatio,
    ),
    y: roundTo1Place(
      (((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        e.currentTarget.height) /
        devicePixelRatio,
    ),
  };
}
