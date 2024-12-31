import SliderItem from '@/components/ImageEditor/Color/SliderItem';

interface IProps {
  r: number;
  g: number;
  b: number;
  onChangeR: (value: number) => void;
  onChangeG: (value: number) => void;
  onChangeB: (value: number) => void;
}

export default function RgbView({
  r,
  g,
  b,
  onChangeR,
  onChangeG,
  onChangeB,
}: IProps) {
  return (
    <div className="flex flex-col gap-y-3">
      <SliderItem
        label="Red"
        value={String(Math.round(r * 255))}
        scaled={r}
        onChangeSlider={(v) => onChangeR(v)}
        onChangeInput={(v) => onChangeR(parseInt(v) / 255)}
      />
      <SliderItem
        label="Green"
        value={String(Math.round(g * 255))}
        scaled={g}
        onChangeSlider={(v) => onChangeG(v)}
        onChangeInput={(v) => onChangeG(parseInt(v) / 255)}
      />
      <SliderItem
        label="Blue"
        value={String(Math.round(b * 255))}
        scaled={b}
        onChangeSlider={(v) => onChangeB(v)}
        onChangeInput={(v) => onChangeB(parseInt(v) / 255)}
      />
    </div>
  );
}
