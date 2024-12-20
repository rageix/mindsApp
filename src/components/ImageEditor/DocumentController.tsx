import BasicController from '@/util/BasicController';
import { MouseEvent } from 'react';
import { IVector2 } from '@/types/Vectors';
import { getCanvasVector } from '@/util/GetCanvasVector';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

export interface IDocumentControllerState {
  width: number;
  height: number;
  scale: number;
  ratio: number;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
  startX: number;
  startY: number;
}

export interface IState extends IDocumentControllerState {
}

export function newIState(): IState {
  return {
    width: 1920,
    height: 1080,
    scale: 1,
    ratio: 1,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    originX: 0,
    originY: 0,
    startX: 0,
    startY: 0,
  };
}

const SCALE_INCREMENT = 0.05;
const SCROLL_UP = -1;
// const SCROLL_DOWN = 1;

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

  calcScales = (scale: number) => {
    return {
      scaleX: this.state.width / (this.state.width * scale),
      scaleY: this.state.height / (this.state.height * scale),
      ratio: 1 / scale
    };
  };

  onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const scrollDirection = Math.sign(e.deltaY);
    if (e.ctrlKey) {
      let newScale: number;

      if (scrollDirection === SCROLL_UP) {
        newScale = this.state.scale + SCALE_INCREMENT;
      } else {
        newScale = this.state.scale - SCALE_INCREMENT;
      }

      newScale = limitNumberWithinRange(newScale, .1, 4);

      this.setState({ scale: newScale, ...this.calcScales(newScale) });
    }
  };
}
