import { useEffect, useState } from 'react';
import { ISelectOption } from '@/types/SelectOption';
import Select from '@/components/Select';
import HSLView from '@/components/ImageEditor/Color/HSLView';
import hslToRgb from '@/util/HslToRgb';
import rgbToHsl from '@/util/RgbToHsl';
import rgbToHex from '@/util/RgbToHex';

enum EView {
  Hsl = 'hsl',
  Rgb = 'rgb',
}

export const VIEW_OPTIONS: ISelectOption<EView>[] = [
  {
    key: EView.Hsl,
    value: EView.Hsl,
    label: 'HSL',
  },
  {
    key: EView.Rgb,
    value: EView.Rgb,
    label: 'RGB',
  },
];

interface IColor {
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
  hex: string;
}

export function newIColor() {
  console.log('newIColor()');
  return {
    r: 0,
    g: 0,
    b: 0,
    h: 0,
    s: 0,
    l: 0,
    hex: '#000000',
  };
}

// interface IProps {
//   // style: IStyle;
// }

export default function Color() {
  const [color, setColor] = useState<IColor>(newIColor());
  const [view, setView] = useState<ISelectOption<EView>>(VIEW_OPTIONS[0]);

  function onChangeHSL(h: number, s: number, l: number) {
    const [r, g, b] = hslToRgb(h / 360, s / 100, l / 100);
    const hex = rgbToHex(r,g,b);

    setColor({
      ...color,
      h,
      s,
      l,
      r,
      g,
      b,
      hex,
    });
  }

  function onChangeH(h: number) {
    onChangeHSL(h, color.s, color.l);
  }

  function onChangeS(s: number) {
    onChangeHSL(color.h, s, color.l);
  }

  function onChangeL(l: number) {
    onChangeHSL(color.h, color.s, l);
  }

  function onChangeRgb(r: number, g: number, b: number) {
    const [h, s, l] = rgbToHsl(r, g, b);
    const hex = rgbToHex(r, g, b);
    setColor({
      h,
      s,
      l,
      r,
      g,
      b,
      hex,
    });
  }

  useEffect(() => {
    console.log('Color', 'onMount');
    return () => console.log('Color', 'onUnmount');
  }, [])

  // const rgb = hsl2rgb(h,s / 100,l / 100);
  // console.log(rgb.map(v => v*256));
  // const currentHex = rgb2hex(rgb[0], rgb[1], rgb[2]);
  // console.log(currentHex);

  // const currentHex = hslToHex(h, s, l);
  console.log(color);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex">
        <div className="grow">
          <div
            className="size-10 rounded-full"
            style={{ backgroundColor: color.hex }}
          />
        </div>
        <div>
          <Select
            options={VIEW_OPTIONS}
            value={view}
            onChange={setView}
          />
        </div>
      </div>
      {view.value === EView.Hsl && (
        <HSLView
          h={color.h}
          s={color.s}
          l={color.l}
          onChangeH={onChangeH}
          onChangeS={onChangeS}
          onChangeL={onChangeL}
        />
      )}
    </div>
  );
}
