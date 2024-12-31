export interface IColor {
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
  hex: string;
  opacity: number;
}

export function newIColor() {
  return {
    r: 0,
    g: 0,
    b: 0,
    h: 0,
    s: 0,
    l: 0,
    hex: '#000000',
    opacity: 1,
  };
}

export interface IColorAlpha {
  color: string,
  alpha: number
}