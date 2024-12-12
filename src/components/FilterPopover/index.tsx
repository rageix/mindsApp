import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import Button from '@/components/Buttton';
import { Filter } from 'lucide-react';
import { cn } from '@/util/Cn';

interface IProps extends PropsWithChildren {
  show: boolean;
  onClickButton: () => void;
}

export default function FilterPopover({
  children,
  show,
  onClickButton,
}: IProps) {
  return (
    <Popover className="relative">
      <PopoverButton as="div" >
        <Button
          variant="gray"
          className="flex"
          onClick={onClickButton}
          isInline
        >
          <Filter className="shrink-0" />
          <div className="grow ms-2">Filters</div>
        </Button>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom start"
        className={cn(
          'flex flex-col rounded-md bg-white p-3 shadow-sm border-2 border-gray-900 mt-3',
          !show ? 'hidden' : null,
        )}
        unmount={false}
        static={true}
      >
        {children}
      </PopoverPanel>
    </Popover>
  );
}
