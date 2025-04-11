import { cn } from '@/util/Cn';
import { TButtonVariant } from '@/types/Variant';
import { PropsWithChildren } from 'react';
import Button from '@/components/Buttton';
import { XIcon } from 'lucide-react';

interface Props extends PropsWithChildren {
  className?: string;
  variant: TButtonVariant;
  onClick?: () => void;
}

const colors: Record<TButtonVariant, string> = {
  indigo: 'bg-indigo-50 text-indigo-800 border-indigo-400',
  sky: 'bg-sky-50 text-sky-800 border-sky-400',
  blue: 'bg-blue-50 text-blue-800 border-blue-400',
  red: 'bg-red-50 text-red-800 border-red-400',
  purple: 'bg-purple-50 text-purple-800 border-purple-400',
  green: 'bg-green-50 text-green-800 border-green-400',
  yellow: 'bg-yellow-50 text-yellow-800 border-yellow-400',
  white: 'bg-white-50 text-gray-800 border-gray-400',
  link: 'text-gray-50',
  linkRed: 'text-gray-50',
  text: 'text-gray-500',
  gray: '',
  custom: '',
  menu: '',
};

export default function Alert({
  className,
  variant,
  onClick,
  children,
}: Props) {
  return (
    <div
      className={cn(
        ' rounded-md p-4',
        colors[variant],
        className ? className : null,
      )}
    >
      <div className="flex">
        <div className="grow">{children}</div>
        {onClick && (
          <div>
            <Button
              variant={variant}
              onClick={onClick}
            >
              <XIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
