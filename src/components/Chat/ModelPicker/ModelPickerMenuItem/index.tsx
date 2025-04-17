import { MenuItem } from '@headlessui/react';
import { cn } from '@/util/Cn';
import { ISelectOption } from '@/types/SelectOption';
import { EModel } from '@/types/Model';

interface IProps {
  value: ISelectOption<EModel>;
  onClick: () => void;
  isSelected?: boolean;
  className?: string;
}

export default function ModelPickerMenuItem({ value, onClick, isSelected, className }: IProps) {
  return (
    <MenuItem>
      <div
        className={cn(
          'block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white cursor-pointer',
          isSelected ? 'bg-blue-600 text-white' : null,
          className,
        )}
        onClick={onClick}
      >
        {value.label}
      </div>
    </MenuItem>
  );
}
