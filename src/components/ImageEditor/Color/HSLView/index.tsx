import SliderItem from '@/components/ImageEditor/Color/SliderItem';
import { ISelectOption } from '@/types/SelectOption';

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

interface IProps {
  h: number;
  s: number;
  l: number;
  onChangeH: (value: number) => void;
  onChangeS: (value: number) => void;
  onChangeL: (value: number) => void;
}

export default function HSLView({
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
        label="H:"
        value={h}
        min={0}
        max={360}
        onChange={onChangeH}
      />
      <SliderItem
        label="S:"
        value={s}
        min={0}
        max={100}
        onChange={onChangeS}
      />
      <SliderItem
        label="L:"
        value={l}
        min={0}
        max={100}
        onChange={onChangeL}
      />
    </div>
  );
}
