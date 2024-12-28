import { ChangeEvent, useEffect, useState } from 'react';
import Slider from '@/components/Slider';
import Input from '@/components/Input';
import { limitNumberWithinRange } from '@/util/LimitNumberWithinRange';

interface IProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export default function SliderItem({
  label,
  value,
  min,
  max,
  onChange,
}: IProps) {
  // const [sliderValue, setSliderValue] = useState(0);
  const [inputValue, setInputValue] = useState('0');
  // const [s, setS] = useState(0);
  // const [l, setL] = useState(0);

  function onChangeHSlider(value: number) {
    const newValue = Math.round(value);
    // setSliderValue(newValue);
    // setInputValue(String(newValue));
    onChange(newValue);
  }

  function onChangeHInputValue(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function onBlurHInput() {
    const value = limitNumberWithinRange(
      Math.round(parseInt(inputValue) || 0),
      min,
      max,
    );
    // setSliderValue(value);
    // setInputValue(String(value));
    onChange(value);
  }

  useEffect(() => {
    // setSliderValue(value);
    setInputValue(String(value));
  }, [value]);

  return (
    <div className="flex items-center gap-x-3">
      <div className="shrink-0 select-none">{label}</div>
      <div className="grow">
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={(value) => onChangeHSlider(value)}
          className="rounded-full h-5 bg-blue-500"
          handleSize={20}
        />
      </div>
      <div className="shrink-0 w-20">
        <Input
          type="number"
          value={inputValue}
          onChange={onChangeHInputValue}
          onBlur={onBlurHInput}
        />
      </div>
    </div>
  );
}
