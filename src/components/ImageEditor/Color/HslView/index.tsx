import SliderItem from '@/components/ImageEditor/Color/SliderItem';

interface IProps {
  h: number;
  s: number;
  l: number;
  onChangeH: (value: number) => void;
  onChangeS: (value: number) => void;
  onChangeL: (value: number) => void;
}

export default function HslView({
  h,
  s,
  l,
  onChangeH,
  onChangeS,
  onChangeL,
}: IProps) {
  return (
    <div className="flex flex-col gap-y-3">
      <SliderItem
        label="Hue"
        value={h}
        scaled={h / 360}
        min={0}
        max={360}
        onChange={(v) => onChangeH(Math.round(v * 360))}
      />
      <SliderItem
        label="Saturation"
        value={s}
        scaled={s / 100}
        min={0}
        max={100}
        onChange={(v) => onChangeS(Math.round(v * 100))}
      />
      <SliderItem
        label="Lightness"
        value={l}
        scaled={l / 100}
        min={0}
        max={100}
        onChange={(v) => onChangeL(Math.round(v * 100))}
      />
    </div>
  );
}
