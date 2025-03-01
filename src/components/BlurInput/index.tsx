import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from 'react';
import Input from '@/components/Input';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute | undefined;
}

export default function BlurInput({ value, onChange, type }: IProps) {
  const [inputValue, setInputValue] = useState('');

  function onChangeValue(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function onBlur() {
    onChange(inputValue);
  }

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <Input
      type={type}
      value={inputValue}
      onChange={onChangeValue}
      onBlur={onBlur}
    />
  );
}
