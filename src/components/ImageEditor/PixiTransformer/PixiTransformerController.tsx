import BasicController from '@/util/BasicController';
import { EHandle } from '@/types/ImageEditor';
import { IVector2 } from '@/types/Vectors';
import { getCanvasVector } from '@/util/getCanvasVector';
import { MouseEvent } from 'react';
// import * as glm from 'gl-matrix';
import { getMidpoint } from '@/util/GetMidpoint';
import { findAngle } from '@/util/FindAngle';
import { rotate } from '@/util/Rotate';
import { distanceBetween } from '@/util/DistanceBetween';
import { rectangleFromPointsAndAngle } from '@/util/RectangleFromPointsAndAngle';

export interface IState {
  width: number;
  height: number;
  angle: number;
  x: number;
  y: number;
  startWidth: number;
  startHeight: number;
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
    width: 150,
    height: 100,
    angle: 0,
    x: 200,
    y: 150,
    startWidth: 0,
    startHeight: 0,
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
    if (this.state.mouseDown) {
      return;
    }
    this.setState({ mouseOver: false, mouseDown: false });
  };

  onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    // if (this.state.mouseDown) {
    //   this.setState({ x: this.state.startX, y: this.state.startY });
    //   return;
    // }

    const currentMouseVector: IVector2 = getCanvasVector(e);

    this.setState({
      mouseDown: true,
      downX: currentMouseVector.x,
      downY: currentMouseVector.y,
      startWidth: this.state.width,
      startHeight: this.state.height,
      startX: this.state.x,
      startY: this.state.y,
    });
  };

  onMouseUp = () => {
    this.setState({ mouseDown: false });
  };

  onMouseUpOutside = () => {
    console.log('onMouseUpOutside');

    if (this.state.mouseDown) {
      this.setState({ x: this.state.startX, y: this.state.startY });
    }
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

      this.setState({
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

      this.setState({
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

      this.setState({
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

      this.setState({
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

      this.setState({
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

      this.setState({
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

      this.setState({
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

      this.setState({
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

      this.setState({
        angle: angle - 270,
      });

      return;
    }

    if (this.state.mouseOver) {
      const xTransform = mousePoint.x - this.state.downX;
      const yTransform = mousePoint.y - this.state.downY;

      this.setState({
        x: this.state.startX + xTransform,
        y: this.state.startY + yTransform,
      });
    }
  };
}
