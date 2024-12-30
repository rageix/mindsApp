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
    onChange(h, Math.round(value.y * 100), Math.round(value.x * 100));
  }

  function onChangeH(h: number) {
    onChange(Math.round(h * 360), s, l);
  }

  const [r, g, b] = hslToRgb(h / 360, 1, .5);
  const hex = rgbToHex(r, g, b);

  return (
    <div className="flex flex-col gap-y-3 relative">
      <XYSlider
        value={{
          x: l / 100,
          y: s / 100,
        }}
        onChange={onChangeSL}
        className="aspect-video"
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: hex }}
        />
        <div className="absolute top-0 left-0 w-full h-full color-picker-saturation" />
      </XYSlider>
      <Slider
        value={h / 360}
        onChange={onChangeH}
        className="rounded-full h-4 color-picker-hue"
        handleSize={16}
      />
    </div>
  );
}
