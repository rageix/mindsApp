import XYSlider from '@/components/XYSlider';
import { IVector2 } from '@/types/Vectors';
import Slider from '@/components/Slider';
import hslToRgb from '@/util/HslToRgb';
import rgbToHex from '@/util/RgbToHex';

interface IProps {
  h: number;
  s: number;
  l: number;
  onChange: (h: number, s: number, l: number) => void;
}

export default function PickerView({ h, s, l, onChange }: IProps) {
  function onChangeSL(value: IVector2) {
    onChange(h, value.x, 1 - value.y);
  }

  function onChangeH(h: number) {
    onChange(h, s, l);
  }

  const [r, g, b] = hslToRgb(h, 1, 0.5);
  const hex = rgbToHex(r, g, b);

  return (
    <div className="flex flex-col gap-y-3 relative">
      <XYSlider
        value={{
          x: s,
          y: 1 - l,
        }}
        onChange={onChangeSL}
        className="aspect-square"
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: hex }}
        />
        <div className="absolute top-0 left-0 w-full h-full color-picker-saturation" />
      </XYSlider>
      <Slider
        value={h}
        onChange={onChangeH}
        className="rounded-full h-4 bg-[#f00]"
        handleSize={16}
        innerClassName="color-picker-hue"
      />
    </div>
  );
}
