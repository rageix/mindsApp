import { IVector2 } from '@/types/Vectors';

export function findAngle(origin: IVector2,target: IVector2):number {
  const dx = origin.x - target.x;
  const dy = origin.y - target.y;

  // var theta = Math.atan2(dy, dx);  // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = west
  // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; clockwise; 0° = west
  // if (theta < 0) theta += 360;     // [0, 360]; clockwise; 0° = west

  // var theta = Math.atan2(-dy, dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = west
  // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = west
  // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = west

  // var theta = Math.atan2(dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = east
  // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = east
  // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = east

  let theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
  theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
  if (theta < 0) theta += 360;      // [0, 360]; clockwise; 0° = east

  return theta;
}

// /**
//  * Get the angle between two 2D vectors
//  * @param {IVector2} a The first operand
//  * @param {IVector2} b The second operand
//  * @returns {Number} The angle in radians
//  */
// function angle(a: IVector2, b:IVector2): number {
//     // mag is the product of the magnitudes of a and b
//     const mag = Math.sqrt(a.x * a.x + a.y * a.y) * Math.sqrt(b.x * b.x + b.y * b.y),
//     // mag &&.. short circuits if mag == 0
//     cosine = mag && (a.x * b.x + a.y * b.y) / mag;
//   // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1
//   return Math.acos(Math.min(Math.max(cosine, -1), 1));
// }