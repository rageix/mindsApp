import BasicController from '@/util/BasicController';
import { MouseEvent } from 'react';
import { IVector2 } from '@/types/Vectors';
import { getCanvasVector } from '@/util/GetCanvasVector';

export interface IState {
  width: number;
  height: number;
  scale: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
  startX: number;
  startY: number;
}

export function newIState(): IState {
  return {
    width: 1920,
    height: 1080,
    scale: 1,
    x: 0,
    y: 0,
    originX: 0,
    originY: 0,
    startX: 0,
    startY: 0,
  };
}

export default class DocumentController extends BasicController<IState> {
  defaultState = newIState();

  onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const currentMouseVector: IVector2 = getCanvasVector(e);

    this.setState({
      originX: this.state.x,
      originY: this.state.y,
      startX: currentMouseVector.x,
      startY: currentMouseVector.y,
    });
  };

  onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const currentMouseVector: IVector2 = getCanvasVector(e);
    const xDiff = currentMouseVector.x - this.state.startX;
    const yDiff = currentMouseVector.y - this.state.startY;

    this.setState({
      x: this.state.originX + xDiff,
      y: this.state.originY + yDiff,
    });
  };
}
