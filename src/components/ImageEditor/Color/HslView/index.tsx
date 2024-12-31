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
        value={String(Math.round(h * 360))}
        scaled={h}
        onChangeSlider={(v) => onChangeH(v)}
        onChangeInput={(v) => onChangeH(parseInt(v) / 360)}
      />
      <SliderItem
        label="Saturation"
        value={String(Math.round(s * 100))}
        scaled={s}
        onChangeSlider={(v) => onChangeS(v)}
        onChangeInput={(v) => onChangeS(parseInt(v) / 100)}
      />
      <SliderItem
        label="Lightness"
        value={String(Math.round(l * 100))}
        scaled={l}
        onChangeSlider={(v) => onChangeL(v)}
        onChangeInput={(v) => onChangeL(parseInt(v) / 100)}
      />
    </div>
  );
}
