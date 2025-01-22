import SliderItem from '@/components/Color/SliderItem';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

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
  console.log(r,g,b);
  return (
    <div className="flex flex-col gap-y-3">
      <SliderItem
        label="Red"
        value={String(Math.round(r * 255))}
        scaled={r}
        onChangeSlider={(v) => onChangeR(v)}
        onChangeInput={(v) =>
          onChangeR(limitNumberWithinRange((parseInt(v) / 255) || 0, 0, 1))
        }
      />
      <SliderItem
        label="Green"
        value={String(Math.round(g * 255))}
        scaled={g}
        onChangeSlider={(v) => onChangeG(v)}
        onChangeInput={(v) => {
          console.log('onchangeg');
          console.log(limitNumberWithinRange(parseInt(v) / 255 || 0, 0, 1));
          onChangeG(limitNumberWithinRange(parseInt(v) / 255 || 0, 0, 1));
        }
        }
      />
      <SliderItem
        label="Blue"
        value={String(Math.round(b * 255))}
        scaled={b}
        onChangeSlider={(v) => onChangeB(v)}
        onChangeInput={(v) =>
          onChangeB(limitNumberWithinRange((parseInt(v) / 255 || 0), 0, 1))
        }
      />
    </div>
  );
}
