import BasicController from '@/util/BasicController';
import { IColor, newIColor } from '@/types/Color';
import hslToRgb from '@/util/HslToRgb';
import rgbToHex from '@/util/RgbToHex';
import rgbToHsl from '@/util/RgbToHsl';
import hexStrToRgb from '@/util/HexStringToRgb';

export interface IState extends IColor {}

export function newIState(): IState {
  return newIColor();
}

export default class ColorController extends BasicController<IState> {
  defaultState = newIState();

  onChangeHSL = (h: number, s: number, l: number) => {
    const [r, g, b] = hslToRgb(h, s, l);
    if (r === undefined || g === undefined || b === undefined) {
      this.setState(newIColor());
      return;
    }
    const hex = rgbToHex(r, g, b);

    const color: IColor = {
      ...this.state,
      h,
      s,
      l,
      r: r,
      g: g,
      b: b,
      hex,
    };

    this.setState(color);
  };

  onChangeH = (h: number) => {
    const color = this.state;
    this.onChangeHSL(h, color.s, color.l);
  };

  onChangeS = (s: number) => {
    const color = this.state;
    this.onChangeHSL(color.h, s, color.l);
  };

  onChangeL = (l: number) => {
    const color = this.state;
    this.onChangeHSL(color.h, color.s, l);
  };

  onChangeRgb = (r: number, g: number, b: number) => {
    const [h, s, l] = rgbToHsl(r, g, b);
    if (h === undefined || s === undefined || l === undefined) {
      this.setState(newIColor());
      return;
    }
    const hex = rgbToHex(r, g, b);

    const out: IColor = {
      ...this.state,
      h: h,
      s: s,
      l: l,
      r,
      g,
      b,
      hex,
    };

    this.setState(out);
  };

  onChangeR = (r: number) => {
    const color = this.state;
    this.onChangeRgb(r, color.g, color.b);
  };

  onChangeG = (g: number) => {
    const color = this.state;
    this.onChangeRgb(color.r, g, color.b);
  };

  onChangeB = (b: number) => {
    const color = this.state;
    this.onChangeRgb(color.r, color.g, b);
  };

  onChangeOpacity = (opacity: number) => {
    const out: IColor = {
      ...this.state,
      opacity,
    };

    this.setState(out);
  };

  hexToColor = (hex: string, opacity?: number) => {
    hex = hex.trim();
    // add # sign if missing
    if (hex.substring(0, 1) !== '#') {
      hex = '#' + hex;
    }
    // if using shortened format like #fff,
    // make it long format like #ffffff
    if (hex.substring(1).length === 3) {
      hex += hex.substring(1);
    }
    const [r, g, b] = hexStrToRgb(hex);

    if (r === undefined || g === undefined || b === undefined) {
      return newIColor();
    }
    const [h, s, l] = rgbToHsl(r, g, b);
    hex = rgbToHex(r, g, b);

    const out: IColor = {
      opacity: opacity ? opacity : 1,
      h: h,
      s: s,
      l: l,
      r,
      g,
      b,
      hex,
    };

    return out;
  };

  onChangeHex = (hex: string, opacity?: number) => {
    const out = this.hexToColor(hex, opacity);

    this.setState(out);
  };
}
