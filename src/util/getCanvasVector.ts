import { IVector2 } from '@/types/Vectors';
import {MouseEvent} from 'react';

export function getCanvasVector(e: MouseEvent<HTMLCanvasElement>): IVector2 {
  const devicePixelRatio = window.devicePixelRatio;
  const rect = e.currentTarget.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / (rect.right - rect.left) * e.currentTarget.width) / devicePixelRatio,
    y: ((e.clientY - rect.top) / (rect.bottom - rect.top) * e.currentTarget.height) / devicePixelRatio
  };
}