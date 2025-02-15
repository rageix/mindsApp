import { cn } from '@/util/Cn';
import { TButtonVariant } from '@/types/Variant';
import {
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  PropsWithChildren,
} from 'react';

interface Props extends PropsWithChildren {
  elRef?: MutableRefObject<any>;
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  disabled?: boolean;
  variant: TButtonVariant;
  isInline?: boolean;
  onClick?: (e?: MouseEvent) => void;
  onKeyDown?: (e?: KeyboardEvent) => void;
  submit?: boolean;
  isActive?: boolean;
  label?: string;
}

const colors: Record<TButtonVariant, string> = {
  indigo:
    'bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 focus-visible:outline-indigo-700 text-white',
  blue: 'bg-blue-700 hover:bg-blue-600 active:bg-blue-800 focus-visible:outline-blue-700 text-white',
  red: 'bg-red-700 hover:bg-red-600 active:bg-red-800 focus-visible:outline-red-700 text-white',
  purple:
    'bg-purple-700 hover:bg-purple-600 active:bg-purple-800 focus-visible:outline-purple-700 text-white',
  green:
    'bg-green-700 hover:bg-green-600 active:bg-green-800 focus-visible:outline-green-700 text-white',
  yellow:
    'bg-yellow-700 hover:bg-yellow-600 active:bg-yellow-800 focus-visible:outline-yellow-700 text-white',
  white: 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
  gray: 'bg-gray-700 hover:bg-gray-600 active:bg-gray-800 focus-visible:outline-gray-700 text-white',
  link: 'text-blue-600 hover:bg-blue-100 focus-visible:outline-blue-600 !shadow-none',
  linkRed:
    'text-red-600 hover:bg-red-100 focus-visible:outline-red-600 !shadow-none',
  text: 'text-gray-400 hover:text-gray-300 focus-visible:outline-gray-400 !shadow-none',
  custom: '',
};

const active: Record<TButtonVariant, string> = {
  indigo: '!bg-indigo-800',
  blue: '!bg-blue-800',
  red: 'bg-red-700 hover:bg-red-600 active:bg-red-800 focus-visible:outline-red-700 text-white',
  purple: '!bg-purple-800',
  green: '!bg-green-800',
  yellow: '!bg-yellow-800',
  white: '',
  gray: '!bg-gray-800',
  link: '!bg-blue-100',
  linkRed: '!bg-red-100',
  text: '',
  custom: '',
};

const colorsDisabled: Record<TButtonVariant, string> = {
  indigo: 'bg-indigo-100 text-indigo-400',
  blue: 'bg-blue-100 text-blue-400',
  red: 'bg-red-100 text-red-400',
  purple: 'bg-purple-100 text-purple-400',
  green: 'bg-green-100 text-green-400',
  yellow: 'bg-yellow-100 text-yellow-400',
  white: 'bg-gray-100 text-gray-400',
  gray: 'bg-gray-100 text-gray-400',
  link: 'text-gray-400',
  linkRed: 'text-gray-400',
  text: 'text-gray-500',
  custom: '',
};

export default function Button({
  elRef,
  type = 'button',
  className,
  disabled,
  variant,
  isInline,
  onClick,
  onKeyDown,
  isActive,
  label,
  children,
}: Props) {
  return (
    <button
      ref={elRef}
      type={type}
      className={cn(
        `justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6`,
        disabled ? '!cursor-auto' : colors[variant],
        disabled ? colorsDisabled[variant] : null,
        isInline ? 'inline-flex' : 'flex w-full',
        isActive ? active[variant] : null,
        className ? className : null,
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={label}
    >
      {children}
    </button>
  );
}
