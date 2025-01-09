import { Switch as HeadlessUiSwitch } from '@headlessui/react';
import { cn } from '@/util/Cn';
import { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  checked: boolean;
  onChange: () => void;
  className?: string;
  label?: string;
}

export default function Switch({
  checked,
  onChange,
  className,
  label,
  children,
}: IProps) {
  return (
    <div className="flex items-center">
      <HeadlessUiSwitch
        checked={checked}
        onChange={onChange}
        className={cn(
          'group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 data-[checked]:bg-blue-600',
          className,
        )}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </HeadlessUiSwitch>
      {children && (
        <div
          className="cursor-pointer ms-2"
          onClick={onChange}
        >
          {children}
        </div>
      )}
    </div>
  );
}
