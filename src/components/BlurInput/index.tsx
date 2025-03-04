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
  onChangeInputValue?: (value: string) => void;
  type?: HTMLInputTypeAttribute | undefined;
  isAcceptable?: boolean;
}

export default function BlurInput({
  value,
  onChange,
  onChangeInputValue,
  type,
  isAcceptable,
}: IProps) {
  const [inputValue, setInputValue] = useState('');

  function onChangeValue(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);
    if (onChangeInputValue) {
      onChangeInputValue(value);
    }
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
      isAcceptable={isAcceptable}
    />
  );
}
