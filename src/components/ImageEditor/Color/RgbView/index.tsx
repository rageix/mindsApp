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
        value={r}
        scaled={r / 255}
        min={0}
        max={255}
        onChange={(v) => onChangeR(Math.round(v * 255))}
      />
      <SliderItem
        label="Green"
        value={g}
        scaled={g / 255}
        min={0}
        max={255}
        onChange={(v) => onChangeG(Math.round(v * 255))}
      />
      <SliderItem
        label="Blue"
        value={b}
        scaled={b / 255}
        min={0}
        max={255}
        onChange={(v) => onChangeB(Math.round(v * 255))}
      />
    </div>
  );
}
