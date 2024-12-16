import BasicController from '@/util/BasicController';
import { FederatedPointerEvent } from 'pixi.js';

export enum EHandle {
  TopLeft,
  Top,
  TopRight,
  Right,
  BottomRight,
  Bottom,
  BottomLeft,
  Left,
}

export interface IState {
  width: number;
  height: number;
  rotation: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
  mouseOver: boolean;
  mouseDown: boolean;
  downX: number;
  downY: number;
  handle: EHandle | null;
}

function newIState(): IState {
  return {
    width: 0,
    height: 0,
    rotation: 0,
    x: 200,
    y: 150,
    startX: 0,
    startY: 0,
    mouseOver: false,
    mouseDown: false,
    downX: 0,
    downY: 0,
    handle: null,
  };
}

export default class PixiTransformerController extends BasicController<IState> {
  defaultState = newIState();

  onMouseEnter = () => {
    this.setState({ mouseOver: true, handle: null });
  };

  onMouseOut = () => {
    this.setState({ mouseOver: false, mouseDown: false });
  };

  onMouseDown = (event: FederatedPointerEvent) => {
    if (this.state.mouseDown) {
      this.setState({ x: this.state.startX, y: this.state.startY });
      return;
    }
    this.setState({
      mouseDown: true,
      downX: event.clientX,
      downY: event.clientY,
      startX: this.state.x,
      startY: this.state.y,
    });
  };

  onMouseUp = () => {
    console.log('onMouseUp');
    this.setState({ mouseDown: false });
  };

  onMouseUpOutside = () => {
    console.log('onMouseUpOutside');

    if (this.state.mouseDown) {
      this.setState({ x: this.state.startX, y: this.state.startY });
    }
  };

  onMouseMove = (event: FederatedPointerEvent) => {
    const xTransform = this.state.downX - event.clientX;
    const yTransform = this.state.downY - event.clientY;

    // if (
    //   xTransform > 10 ||
    //   xTransform < 10 ||
    //   yTransform > 10 ||
    //   yTransform < 10
    // ) {
    if (event && this.state.mouseOver && this.state.mouseDown) {
      this.setState({
        x: this.state.startX - xTransform,
        y: this.state.startY - yTransform,
      });
      // }
    }
  };

  onHandleMouseOver = (handle: EHandle) => {
    this.setState({ handle });
  };

  onHandleMouseOut = () => {
    this.setState({ handle: null });
  };
}
