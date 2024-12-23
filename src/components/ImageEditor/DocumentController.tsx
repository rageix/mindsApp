import BasicController from '@/util/BasicController';
import { MouseEvent } from 'react';
import { IVector2 } from '@/types/Vectors';
import { getCanvasVector } from '@/util/GetCanvasVector';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';
import { roundTo1Place } from '@/util/RoundTo1Place';

function roundToNearest10(num: number) {
  const floorNum = Math.floor(num / 10) * 10;
  const ceilNum = Math.ceil(num / 10) * 10;
  return ceilNum - num < num - floorNum ? ceilNum : floorNum;
}

export interface IDocumentControllerState {
  width: number;
  height: number;
  scale: number;
  scaleInt: number;
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

export interface IState extends IDocumentControllerState {}

export function newIState(): IState {
  return {
    width: 1920,
    height: 1080,
    scale: 1,
    scaleInt: 100,
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

const SCALE_INCREMENT = 10;
const SCROLL_UP = -1;

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
      x: roundTo1Place(this.state.originX + xDiff),
      y: roundTo1Place(this.state.originY + yDiff),
    });
  };

  calcScales = (scale: number) => {
    return {
      scaleX: roundTo1Place(this.state.width / (this.state.width * scale)),
      scaleY: roundTo1Place(this.state.height / (this.state.height * scale)),
      ratio: roundTo1Place(1 / scale),
    };
  };

  onWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey) {
      const scrollDirection = Math.sign(e.deltaY);

      if (scrollDirection === SCROLL_UP) {
        this.onZoomIn();
        return;
      }

      this.onZoomOut();
    }
  };

  calcScaleState = (value: number) => {
    const newScaleInt = limitNumberWithinRange(value, 10, 400);
    const newScale = newScaleInt / 100;

    return {
      scale: newScale,
      scaleInt: newScaleInt,
      ...this.calcScales(newScale),
    };
  };

  calcNewXY = (newScale: number): IVector2 => {
    const oldWidth =
      this.state.width - this.state.width * (this.state.scale || 0);
    const oldHeight =
      this.state.height - this.state.height * (this.state.scale || 0);
    const newWidth = this.state.width - this.state.width * newScale;
    const newHeight = this.state.height - this.state.height * newScale;
    let xDiff: number;
    let yDiff: number;
    let newX: number;
    let newY: number;

    if (newScale > this.state.scale) {
      xDiff = (oldWidth - newWidth) / 2;
      yDiff = (oldHeight - newHeight) / 2;

      newX = roundTo1Place(this.state.x - xDiff);
      newY = roundTo1Place(this.state.y - yDiff);
    } else {
      xDiff = (newWidth - oldWidth) / 2;
      yDiff = (newHeight - oldHeight) / 2;

      newX = roundTo1Place(this.state.x + xDiff);
      newY = roundTo1Place(this.state.y + yDiff);
    }

    return { x: newX, y: newY };
  };

  onZoomIn = () => {
    const newState = this.calcScaleState(
      roundToNearest10(this.state.scaleInt) + SCALE_INCREMENT,
    );

    const newPosition = this.calcNewXY(newState.scale);

    this.setState({ ...newState, x: newPosition.x, y: newPosition.y });
  };

  onZoomOut = () => {
    const newState = this.calcScaleState(
      roundToNearest10(this.state.scaleInt) - SCALE_INCREMENT,
    );

    const newPosition = this.calcNewXY(newState.scale);

    this.setState({ ...newState, x: newPosition.x, y: newPosition.y });
  };

  onChangeScale = (scale: number) => {
    const newState = this.calcScaleState(scale);
    const newPosition = this.calcNewXY(newState.scale);

    this.setState({ ...newState, x: newPosition.x, y: newPosition.y });
  };

  onFitToView = (width: number, height: number) => {
    const viewportRatio = width / height;
    const documentRatio = this.state.width / this.state.height;

    const scale =
      viewportRatio < documentRatio
        ? width / this.state.width
        : height / this.state.height;

    const newState = this.calcScaleState(roundTo1Place(scale * 100));
    const newX = roundTo1Place((width - this.state.width * scale) / 2);
    const newY = roundTo1Place((height - this.state.height * scale) / 2);
    this.setState({ ...newState, x: newX, y: newY });
  };
}
