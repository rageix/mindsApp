import { ChangeEvent, useEffect, useState } from 'react';
import Slider from '@/components/Slider';
import Input from '@/components/Input';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

interface IProps {
  label: string;
  value: number;
  scaled: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export default function SliderItem({
  label,
  value,
  scaled,
  min,
  max,
  onChange,
}: IProps) {
  const [inputValue, setInputValue] = useState('0');

  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function onBlurInput() {
    const value = limitNumberWithinRange(
      Math.round(parseInt(inputValue) || 0),
      min,
      max,
    );
    onChange(value);
  }

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  return (
    <div>
      <div className="flex items-end gap-x-3">
        <div className="grow">
          <div className="text-sm">{label}</div>
          <Slider
            value={scaled}
            onChange={onChange}
            className="rounded-full h-4 bg-blue-500"
            handleSize={16}
          />
        </div>
        <div className="shrink-0 w-20">
          <Input
            type="number"
            value={inputValue}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
        </div>
      </div>
    </div>
  );
}
