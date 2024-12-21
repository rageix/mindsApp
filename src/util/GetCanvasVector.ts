import { IVector2 } from '@/types/Vectors';
import { MouseEvent } from 'react';
import { graphicsRound } from '@/hooks/GraphicsRound';

export function getCanvasVector(e: MouseEvent<HTMLCanvasElement>): IVector2 {
  const devicePixelRatio = window.devicePixelRatio;
  const rect = e.currentTarget.getBoundingClientRect();
  return {
    x: graphicsRound(
      (((e.clientX - rect.left) / (rect.right - rect.left)) *
        e.currentTarget.width) /
        devicePixelRatio,
    ),
    y: graphicsRound(
      (((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        e.currentTarget.height) /
        devicePixelRatio,
    ),
  };
}
