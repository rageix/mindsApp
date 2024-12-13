import { ReactElement } from 'react';
import useTheme from '@/hooks/UseTheme';
import { ETheme } from '@/common/Theme';
import { cn } from '@/util/Cn';

interface IProps {
  label: string;
  value: string | ReactElement;
}

export default function SessionListItem({ label, value }: IProps) {
  const theme = useTheme();

  return (
    <div className="text-sm">
      <label
        className={cn(
          'font-medium',
          theme === ETheme.light ? 'text-gray-500' : null,
          theme === ETheme.dark ? 'text-gray-200' : null,
        )}
      >
        {label}
      </label>
      <p
        className={cn(
          'mt-1',
          theme === ETheme.light ? 'text-gray-900' : null,
          theme === ETheme.dark ? 'text-white' : null,
        )}
      >
        {value}
      </p>
    </div>
  );
}
