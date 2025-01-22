import SliderItem from '@/components/Color/SliderItem';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

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
        onChangeInput={(v) =>
          onChangeH(limitNumberWithinRange((parseInt(v) / 360) || 0, 0, 1))
        }
      />
      <SliderItem
        label="Saturation"
        value={String(Math.round(s * 100))}
        scaled={s}
        onChangeSlider={(v) => onChangeS(v)}
        onChangeInput={(v) =>
          onChangeS(limitNumberWithinRange((parseInt(v) / 100) || 0, 0, 1))
        }
      />
      <SliderItem
        label="Lightness"
        value={String(Math.round(l * 100))}
        scaled={l}
        onChangeSlider={(v) => onChangeL(v)}
        onChangeInput={(v) =>
          onChangeL(limitNumberWithinRange((parseInt(v) / 100) || 0, 0, 1))
        }
      />
    </div>
  );
}
