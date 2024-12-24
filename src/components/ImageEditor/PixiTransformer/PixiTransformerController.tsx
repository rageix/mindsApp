import BasicController from '@/util/BasicController';
import { EHandle } from '@/types/ImageEditor';
import { IVector2 } from '@/types/Vectors';
import { getCanvasVector } from '@/util/GetCanvasVector';
import { MouseEvent } from 'react';
import { getMidpoint } from '@/util/GetMidpoint';
import { findAngle } from '@/util/FindAngle';
import { rotate } from '@/util/Rotate';
import { rectangleFromPointsAndAngle } from '@/util/RectangleFromPointsAndAngle';
import { IState as IDocumentState } from '@/components/ImageEditor/DocumentController';
import { roundTo1Place } from '@/util/RoundTo1Place';
import { isPointPositive } from '@/util/IsPointPositive';
import { threePointDistance } from '@/util/ThreePointDistance';
import { getDiff } from '@/util/GetDiff';

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
  isVisible: boolean;
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

  transformUpdate = (arg: Partial<IState>) => {
    const newState = { ...this.state, ...arg };
    // console.log('angle', graphicsRound(newState.angle));
    const update: IBoundingBox = {
      width: roundTo1Place(newState.width),
      height: roundTo1Place(newState.height),
      angle: roundTo1Place(newState.angle),
      x: roundTo1Place(newState.x),
      y: roundTo1Place(newState.y),
    };
    this.onUpdate(update);
    this.setState(update);
  };

  onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
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
    e: MouseEvent<HTMLCanvasElement>,
    handle: EHandle | null,
    docState: IDocumentState,
  ) => {
    const mousePoint: IVector2 = getCanvasVector(e);

    if (handle === EHandle.Move) {
      const xTransform = (mousePoint.x - this.state.downX) * docState.ratio;
      const yTransform = (mousePoint.y - this.state.downY) * docState.ratio;

      this.transformUpdate({
        x: this.state.startX + xTransform,
        y: this.state.startY + yTransform,
      });
      return;
    }

    // convert mouse pointer from view space to scaled space
    const mousePointTranslated: IVector2 = {
      x: (mousePoint.x - docState.x) * docState.scaleX,
      y: (mousePoint.y - docState.y) * docState.scaleY,
    };

    const transformOrigin: IVector2 = {
      x: this.state.startX,
      y: this.state.startY,
    };

    if (handle === EHandle.Right) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX - this.state.startWidth / 2,
        y: this.state.startY,
      };

      const bottomLeftOrigin: IVector2 = {
        x: this.state.startX - this.state.startWidth / 2,
        y: this.state.startY + this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );

      const rotatedBottomLeft = rotate(
        bottomLeftOrigin,
        transformOrigin,
        this.state.angle,
      );

      const isPositive = isPointPositive(
        rotatedBottomLeft,
        anchorPoint,
        mousePointTranslated,
      );
      let distance = threePointDistance(
        rotatedBottomLeft,
        anchorPoint,
        mousePointTranslated,
      );
      if (distance === Infinity) {
        distance = getDiff(anchorPoint.x, mousePointTranslated.x);
      }

      const endingOrigin: IVector2 = {
        x: isPositive ? anchorPoint.x + distance : anchorPoint.x - distance,
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
    } else if (handle === EHandle.Left) {
      const anchorOrigin: IVector2 = {
        x: this.state.startX + this.state.startWidth / 2,
        y: this.state.startY,
      };

      const topRight: IVector2 = {
        x: this.state.startX + this.state.startWidth / 2,
        y: this.state.startY - this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );

      const rotatedTopRight = rotate(
        topRight,
        transformOrigin,
        this.state.angle,
      );

      const isPositive = isPointPositive(
        rotatedTopRight,
        anchorPoint,
        mousePointTranslated,
      );
      let distance = threePointDistance(
        rotatedTopRight,
        anchorPoint,
        mousePointTranslated,
      );
      if (distance === Infinity) {
        distance = getDiff(anchorPoint.x, mousePointTranslated.x);
      }

      const endingOrigin: IVector2 = {
        x: isPositive ? anchorPoint.x - distance : anchorPoint.x + distance,
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

      const bottomRightOrigin: IVector2 = {
        x: this.state.startX + this.state.startWidth / 2,
        y: this.state.startY + this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );

      const rotatedBottomRight = rotate(
        bottomRightOrigin,
        transformOrigin,
        this.state.angle,
      );

      const isPositive = isPointPositive(
        rotatedBottomRight,
        anchorPoint,
        mousePointTranslated,
      );
      let distance = threePointDistance(
        rotatedBottomRight,
        anchorPoint,
        mousePointTranslated,
      );
      if (distance === Infinity) {
        distance = getDiff(anchorPoint.y, mousePointTranslated.y);
      }

      const endingOrigin: IVector2 = {
        x: anchorPoint.x,
        y: isPositive ? anchorPoint.y - distance : anchorPoint.y + distance,
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

      const topRightOrigin: IVector2 = {
        x: this.state.startX + this.state.startWidth / 2,
        y: this.state.startY - this.state.startHeight / 2,
      };

      const anchorPoint = rotate(
        anchorOrigin,
        transformOrigin,
        this.state.angle,
      );

      const rotatedTopRight = rotate(
        topRightOrigin,
        transformOrigin,
        this.state.angle,
      );

      const isPositive = isPointPositive(
        rotatedTopRight,
        anchorPoint,
        mousePointTranslated,
      );
      let distance = threePointDistance(
        rotatedTopRight,
        anchorPoint,
        mousePointTranslated,
      );
      if (distance === Infinity) {
        distance = getDiff(anchorPoint.y, mousePointTranslated.y);
      }

      const endingOrigin: IVector2 = {
        x: anchorPoint.x,
        y: isPositive ? anchorPoint.y - distance : anchorPoint.y + distance,
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

      const midPoint = getMidpoint(anchorPoint, mousePointTranslated);

      const [width, height] = rectangleFromPointsAndAngle(
        anchorPoint,
        mousePointTranslated,
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

      const midPoint = getMidpoint(anchorPoint, mousePointTranslated);

      const [width, height] = rectangleFromPointsAndAngle(
        anchorPoint,
        mousePointTranslated,
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

      const midPoint = getMidpoint(anchorPoint, mousePointTranslated);

      const [width, height] = rectangleFromPointsAndAngle(
        anchorPoint,
        mousePointTranslated,
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

      const midPoint = getMidpoint(anchorPoint, mousePointTranslated);

      const [width, height] = rectangleFromPointsAndAngle(
        anchorPoint,
        mousePointTranslated,
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

      const angle = findAngle(anchorPoint, mousePointTranslated);

      this.transformUpdate({
        angle: angle - 270,
      });

      return;
    }
  };

  onDisable = () => {
    this.setState({ isVisible: false });
  };
}
