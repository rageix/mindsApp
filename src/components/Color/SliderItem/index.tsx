import { ChangeEvent, useEffect, useState } from 'react';
import Slider from '@/components/Slider';
import Input from '@/components/Input';

interface IProps {
  label: string;
  value: string;
  scaled: number;
  onChangeSlider: (value: number) => void;
  onChangeInput: (value: string) => void;
}

export default function SliderItem({
  label,
  value,
  scaled,
  onChangeSlider,
  onChangeInput,
}: IProps) {
  const [inputValue, setInputValue] = useState('0');
  const [isFocused, setIsFocused] = useState(false);

  function onChangeInputValue(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function onBlurInput() {
    onChangeInput(inputValue);
    setIsFocused(false);
  }

  useEffect(() => {
    const newInputValue = String(value);
    if (newInputValue !== inputValue && !isFocused) {
      setInputValue(newInputValue);
    }
  }, [value, inputValue, isFocused]);

  return (
    <div>
      <div className="flex items-end gap-x-3">
        <div className="grow">
          <div className="text-sm">{label}</div>
          <Slider
            value={scaled}
            onChange={onChangeSlider}
            className="rounded-full h-4 bg-blue-500"
            handleSize={16}
          />
        </div>
        <div className="shrink-0 w-24">
          <Input
            type="number"
            value={inputValue}
            onChange={onChangeInputValue}
            onBlur={onBlurInput}
            onFocus={() => setIsFocused(true)}
          />
        </div>
      </div>
    </div>
  );
}
