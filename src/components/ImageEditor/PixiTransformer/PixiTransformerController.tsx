import BasicController from '@/util/BasicController';
import { EHandle } from '@/types/ImageEditor';
import { IVector2 } from '@/types/Vectors';
import { getCanvasVector } from '@/util/GetCanvasVector';
import { MouseEvent } from 'react';
// import * as glm from 'gl-matrix';
import { getMidpoint } from '@/util/GetMidpoint';
import { findAngle } from '@/util/FindAngle';
import { rotate } from '@/util/Rotate';
import { distanceBetween } from '@/util/DistanceBetween';
import { rectangleFromPointsAndAngle } from '@/util/RectangleFromPointsAndAngle';

export interface IBoundingBox {
  width: number;
  height: number;
  angle: number;
  x: number;
  y: number;
}

export interface IState extends IBoundingBox {
  startWidth: number;
  startHeight: number;
  startX: number;
  startY: number;
  mouseOver: boolean;
  downX: number;
  downY: number;
  handle: EHandle | null;
  isVisible: boolean
}

function newIState(): IState {
  return {
    width: 0,
    height: 0,
    angle: 0,
    x: 0,
    y: 0,
    startWidth: 0,
    startHeight: 0,
    startX: 0,
    startY: 0,
    mouseOver: false,
    downX: 0,
    downY: 0,
    handle: null,
    isVisible: false,
  };
}

export default class PixiTransformerController extends BasicController<IState> {
  defaultState = newIState();
  onUpdate: (value: IBoundingBox) => void;

  constructor(onUpdate: (value: IBoundingBox) => void) {
    super();
    this.onUpdate = onUpdate;
  }

  onMouseEnter = () => {
    console.log('onMouseEnter');
    this.setState({ mouseOver: true, handle: null });
  };

  onMouseOut = () => {
    console.log('onMouseOut');
    this.setState({ mouseOver: false});
  };

  transformUpdate = (arg: Partial<IState>) => {
    const newState = {...this.state, ...arg};
    this.onUpdate({
      width: newState.width,
      height: newState.height,
      angle: newState.angle,
      x: newState.x,
      y: newState.y,
    });
    this.setState(arg);

}

  onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    // if (this.state.mouseDown) {
    //   this.setState({ x: this.state.startX, y: this.state.startY });
    //   return;
    // }

    const currentMouseVector: IVector2 = getCanvasVector(e);

    this.setState({
      downX: currentMouseVector.x,
      downY: currentMouseVector.y,
      startWidth: this.state.width,
      startHeight: this.state.height,
      startX: this.state.x,
      startY: this.state.y,
    });
  };

  onMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement>,
    handle: EHandle | null,
  ) => {
    const mousePoint: IVector2 = getCanvasVector(e);

    const transformOrigin: IVector2 = {
      x: this.state.startX,
      y: this.state.startY,
    };

    if (handle === EHandle.Right) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX - this.state.startWidth / 2,
        y: this.state.startY,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );
      const distance = distanceBetween(anchorPoint, mousePoint);

      const endingOrigin: IVector2 = {
        x: anchorPoint.x + distance,
        y: anchorPoint.y,
      };

      const endPoint = rotate(endingOrigin, anchorPoint, this.state.angle);
      const midPoint = getMidpoint(anchorPoint, endPoint);

      // this.setState({
      //   height: this.state.startHeight,
      //   width: distance,
      //   y: midPoint.y,
      //   x: midPoint.x,
      // });
      this.transformUpdate({
        height: this.state.startHeight,
        width: distance,
        y: midPoint.y,
        x: midPoint.x,
      });
      return;
    } else if (handle === EHandle.Left) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX + this.state.startWidth / 2,
        y: this.state.startY,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );
      const distance = distanceBetween(anchorPoint, mousePoint);

      const endingOrigin: IVector2 = {
        x: anchorPoint.x - distance,
        y: anchorPoint.y,
      };

      const endPoint = rotate(endingOrigin, anchorPoint, this.state.angle);
      const midPoint = getMidpoint(anchorPoint, endPoint);

      this.transformUpdate({
        height: this.state.startHeight,
        width: distance,
        y: midPoint.y,
        x: midPoint.x,
      });
      return;
    } else if (handle === EHandle.Top) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX,
        y: this.state.startY + this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );
      const distance = distanceBetween(anchorPoint, mousePoint);

      const endingOrigin: IVector2 = {
        x: anchorPoint.x,
        y: anchorPoint.y - distance,
      };

      const endPoint = rotate(endingOrigin, anchorPoint, this.state.angle);
      const midPoint = getMidpoint(anchorPoint, endPoint);

      this.transformUpdate({
        height: distance,
        width: this.state.startWidth,
        y: midPoint.y,
        x: midPoint.x,
      });
      return;
    } else if (handle === EHandle.Bottom) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX,
        y: this.state.startY - this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );
      const distance = distanceBetween(anchorPoint, mousePoint);

      const endingOrigin: IVector2 = {
        x: anchorPoint.x,
        y: anchorPoint.y + distance,
      };

      const endPoint = rotate(endingOrigin, anchorPoint, this.state.angle);
      const midPoint = getMidpoint(anchorPoint, endPoint);

      this.transformUpdate({
        height: distance,
        width: this.state.startWidth,
        y: midPoint.y,
        x: midPoint.x,
      });
      return;
    } else if (handle === EHandle.TopRight) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX - this.state.startWidth / 2,
        y: this.state.startY + this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );

      const midPoint = getMidpoint(anchorPoint, mousePoint);

      const [width, height] = rectangleFromPointsAndAngle(
        anchorPoint,
        mousePoint,
        this.state.angle,
      );

      this.transformUpdate({
        height,
        width,
        y: midPoint.y,
        x: midPoint.x,
      });
      return;
    } else if (handle === EHandle.BottomRight) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX - this.state.startWidth / 2,
        y: this.state.startY - this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );

      const midPoint = getMidpoint(anchorPoint, mousePoint);

      const [width, height] = rectangleFromPointsAndAngle(
        anchorPoint,
        mousePoint,
        this.state.angle,
      );

      this.transformUpdate({
        height,
        width,
        y: midPoint.y,
        x: midPoint.x,
      });
      return;
    } else if (handle === EHandle.BottomLeft) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX + this.state.startWidth / 2,
        y: this.state.startY - this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );

      const midPoint = getMidpoint(anchorPoint, mousePoint);

      const [width, height] = rectangleFromPointsAndAngle(
        anchorPoint,
        mousePoint,
        this.state.angle,
      );

      this.transformUpdate({
        height,
        width,
        y: midPoint.y,
        x: midPoint.x,
      });
      return;
    } else if (handle === EHandle.TopLeft) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX + this.state.startWidth / 2,
        y: this.state.startY + this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );

      const midPoint = getMidpoint(anchorPoint, mousePoint);

      const [width, height] = rectangleFromPointsAndAngle(
        anchorPoint,
        mousePoint,
        this.state.angle,
      );

      this.transformUpdate({
        height,
        width,
        y: midPoint.y,
        x: midPoint.x,
      });
      return;
    } else if (handle === EHandle.Rotate) {
      const anchorPoint: IVector2 = {
        x: this.state.startX,
        y: this.state.startY,
      };

      const angle = findAngle(anchorPoint, mousePoint);

      this.transformUpdate({
        angle: angle - 270,
      });

      return;
    }

    if (this.state.mouseOver) {
      const xTransform = mousePoint.x - this.state.downX;
      const yTransform = mousePoint.y - this.state.downY;

      this.transformUpdate({
        x: this.state.startX + xTransform,
        y: this.state.startY + yTransform,
      });
    }
  };
}
