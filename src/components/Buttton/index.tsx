import { cn } from '@/util/Cn';
import { TButtonVariant } from '@/types/Variant';
import { MutableRefObject, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  ref?: MutableRefObject<any>;
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  disabled?: boolean;
  variant: TButtonVariant;
  isInline?: boolean;
  onClick?: () => void;
  submit?: boolean;
}

const colors: Record<TButtonVariant, string> = {
  indigo:
    'bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 focus-visible:outline-indigo-700',
  blue: 'bg-blue-700 hover:bg-blue-600 active:bg-blue-800 focus-visible:outline-blue-700',
  red: 'bg-red-700 hover:bg-red-600 active:bg-red-800 focus-visible:outline-red-700',
  purple:
    'bg-purple-700 hover:bg-purple-600 active:bg-purple-800 focus-visible:outline-purple-700',
  green:
    'bg-green-700 hover:bg-green-600 active:bg-green-800 focus-visible:outline-green-700',
  yellow:
    'bg-yellow-700 hover:bg-yellow-600 active:bg-yellow-800 focus-visible:outline-yellow-700',
  white: 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
  link: 'text-blue-400 hover:text-blue-600 focus-visible:outline-blue-500',
  text: 'text-gray-400 hover:text-white focus-visible:outline-gray-400',
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
  link: 'text-gray-100',
  text: 'text-gray-500',
  custom: '',
};

export default function Button({
  ref,
  type = 'button',
  className,
  disabled,
  variant,
  isInline,
  onClick,
  children,
}: Props) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        `flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 `,
        disabled ? '!cursor-auto' : colors[variant],
        className ? className : null,
        disabled ? colorsDisabled[variant] : null,
        isInline ? 'inline' : 'w-full',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
