export interface ILayerTransform {
  width: number;
  height: number;
  angle: number;
  x: number;
  y: number;
}

export function newILayerTransform() {

  return {
    width: 0,
    height: 0,
    angle: 0,
    x: 0,
    y: 0,
  }

}