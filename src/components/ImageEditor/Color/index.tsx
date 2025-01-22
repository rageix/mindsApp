import { useState } from 'react';
import { ISelectOption } from '@/types/SelectOption';
import Select from '@/components/Select';
import RgbView from '@/components/Color/RgbView';
import HslView from '@/components/Color/HslView';
import SliderItem from '@/components/Color/SliderItem';
import HexView from '@/components/Color/HexView';
import { IColor } from '@/types/Color';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import PickerView from '@/components/Color/PickerView';
import SwatchView from '@/components/Color/SwatchView';

enum EView {
  Hsl = 'hsl',
  Rgb = 'rgb',
  Hex = 'hex',
  Picker = 'picker',
  Swatches = 'swatches',
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
  {
    key: EView.Hex,
    value: EView.Hex,
    label: 'Hex',
  },
  {
    key: EView.Picker,
    value: EView.Picker,
    label: 'Picker',
  },
  {
    key: EView.Swatches,
    value: EView.Swatches,
    label: 'Swatches',
  },
];

interface IProps {
  controller: ImageEditorController;
  color: IColor;
}

export default function Color({ controller, color }: IProps) {
  // const [color, setColor] = useState<IColor>(newIColor());
  // const colorRef = useRef<IColor>(newIColor());
  const [view, setView] = useState<ISelectOption<EView>>(VIEW_OPTIONS[0]);

  // function onChangeColor() {
  //   if(colorRef.current) {
  //     onChange({
  //       color: '0x' + colorRef.current.hex.substring(1),
  //       alpha: colorRef.current.opacity / 100,
  //     });
  //   }
  // }
  //
  // function onChangeHSL(h: number, s: number, l: number) {
  //   const [r, g, b] = hslToRgb(h / 360, s / 100, l / 100);
  //   if (r === undefined || g === undefined || b === undefined) {
  //     setColor(newIColor());
  //     return;
  //   }
  //   const hex = rgbToHex(r, g, b);
  //
  //   setColor({
  //     ...(colorRef.current || {}),
  //     h,
  //     s,
  //     l,
  //     r: Math.round(r),
  //     g: Math.round(g),
  //     b: Math.round(b),
  //     hex,
  //   });
  //
  //   onChangeColor();
  // }
  //
  // function onChangeH(h: number) {
  //   onChangeHSL(h, colorRef.current.s, colorRef.current.l);
  // }
  //
  // function onChangeS(s: number) {
  //   onChangeHSL(colorRef.current.h, s, colorRef.current.l);
  // }
  //
  // function onChangeL(l: number) {
  //   onChangeHSL(colorRef.current.h, colorRef.current.s, l);
  // }
  //
  // function onChangeRgb(r: number, g: number, b: number) {
  //   const [h, s, l] = rgbToHsl(r, g, b);
  //   if (h === undefined || s === undefined || l === undefined) {
  //     setColor(newIColor());
  //     return;
  //   }
  //   const hex = rgbToHex(r, g, b);
  //
  //   const out: IColor = {
  //   ...(colorRef.current || {}),
  //     h: Math.round(h * 360),
  //     s: Math.round(s * 100),
  //     l: Math.round(l * 100),
  //     r,
  //     g,
  //     b,
  //     hex,
  //   }
  //
  //   colorRef.current = out;
  //
  //   onChangeColor();
  // }
  //
  // function onChangeR(r: number) {
  //   onChangeRgb(r, colorRef.current.g, colorRef.current.b);
  // }
  //
  // function onChangeG(g: number) {
  //   onChangeRgb(colorRef.current.r, g, colorRef.current.b);
  // }
  //
  // function onChangeB(b: number) {
  //   onChangeRgb(colorRef.current.r, colorRef.current.g, b);
  // }
  //
  // function onChangeOpacity(opacity: number) {
  //   setColor({ ...color, opacity });
  //   onChangeColor();
  // }
  //
  // function onChangeHex(hex: string, opacity?: number) {
  //   hex = hex.trim();
  //   // add # sign if missing
  //   if (hex.substring(0, 1) !== '#') {
  //     hex = '#' + hex;
  //   }
  //   // if using shortened format like #fff,
  //   // make it long format like #ffffff
  //   if (hex.substring(1).length === 3) {
  //     hex += hex.substring(1);
  //   }
  //   const [r, g, b] = hexStrToRgb(hex);
  //   if (r === undefined || g === undefined || b === undefined) {
  //     setColor(newIColor());
  //     return;
  //   }
  //   const [h, s, l] = rgbToHsl(r, g, b);
  //   hex = rgbToHex(r, g, b);
  //
  //   const out: IColor = {
  //     opacity: opacity ? opacity : color.opacity,
  //     h: Math.round(h * 360),
  //     s: Math.round(s * 100),
  //     l: Math.round(l * 100),
  //     r,
  //     g,
  //     b,
  //     hex,
  //   };
  //
  //   colorRef.current = out;
  //   // onChangeColor();
  // }
  //
  // useEffect(() => {
  //   onChangeHex(value.color.substring(2), Math.round(value.alpha * 100));
  // }, [value]);

  // useEffect(() => {
  //   console.log('Color', 'onMount');
  //   return () => console.log('Color', 'onUnmount');
  // }, []);

  // const rgb = hsl2rgb(h,s / 100,l / 100);
  // console.log(rgb.map(v => v*256));
  // const currentHex = rgb2hex(rgb[0], rgb[1], rgb[2]);
  // console.log(currentHex);

  // const currentHex = hslToHex(h, s, l);
  // console.log(color);

  // const colors = colorRef.current;

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
            className="w-[8rem]"
          />
        </div>
      </div>
      {view.value === EView.Hsl && (
        <HslView
          h={color.h}
          s={color.s}
          l={color.l}
          onChangeH={controller.onChangeH}
          onChangeS={controller.onChangeS}
          onChangeL={controller.onChangeL}
        />
      )}
      {view.value === EView.Rgb && (
        <RgbView
          r={color.r}
          g={color.g}
          b={color.b}
          onChangeR={controller.onChangeR}
          onChangeG={controller.onChangeG}
          onChangeB={controller.onChangeB}
        />
      )}
      {view.value === EView.Hex && (
        <HexView
          hex={color.hex}
          onChange={controller.onChangeHex}
        />
      )}
      {view.value === EView.Picker && (
        <PickerView
          h={color.h}
          s={color.s}
          l={color.l}
          onChange={controller.onChangeHSL}
        />
      )}
      {view.value === EView.Swatches && (
        <SwatchView
          onChange={(hex) => controller.onChangeHex(hex, color.opacity)}
        />
      )}
      <SliderItem
        label="Opacity"
        value={String(Math.round(color.opacity * 100))}
        scaled={color.opacity}
        onChangeSlider={(v) => controller.onChangeOpacity(v)}
        onChangeInput={(v) => controller.onChangeOpacity(parseInt(v) / 100)}
      />
    </div>
  );
}
