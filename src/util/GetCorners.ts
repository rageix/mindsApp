import { IVector2 } from '@/types/Vectors';
import { degreesToRadians } from '@/util/DegreesToRadians';
import { rotate } from '@/util/Rotate';
import { ICorners } from '@/types/Corners';

// Gets the corners of a rotated rectangle
export function getCorners(
  x: number, // center origin
  y: number, // center origin
  width: number,
  height: number,
  angle: number,
  isDegees = true,
): ICorners {
  if (isDegees) {
    angle = degreesToRadians(angle);
  }

  const origin: IVector2 = {
    x,
    y
  }

  const startingBottomLeft: IVector2 = {
    x: x - width / 2,
    y: y - height / 2,
  }

  const bottomLeft = rotate(startingBottomLeft, origin, angle, false);
  const sinAng = Math.sin(angle);
  const cosAng = Math.cos(angle);

  let upDiff = sinAng * width;
  let sideDiff = cosAng * width;
  const topLeft = {
    x: bottomLeft.x + sideDiff,
    y: bottomLeft.y + upDiff
  };

  upDiff = cosAng * height;
  sideDiff = sinAng * height;
  const topRight = {
    x: bottomLeft.x + sideDiff,
    y: bottomLeft.y - upDiff
  };
  const bottomRight = {
    x: topLeft.x + sideDiff,
    y: topLeft.y - upDiff
  };

  return {
    bottomLeft,
    topLeft,
    topRight,
    bottomRight,
  };
}
