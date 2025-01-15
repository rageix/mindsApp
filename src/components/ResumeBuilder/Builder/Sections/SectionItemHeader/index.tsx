'use client';
import { MouseEvent, PropsWithChildren } from 'react';
import MenuItemButton from '@/components/MenuItemButton';
import TableOptionsMenu from '@/components/TableOptionsMenu';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Button from '@/components/Buttton';

interface IProps extends PropsWithChildren {
  isExpanded: boolean;
  onClickHeader: () => void;
  onClickDuplicate?: (e?: MouseEvent) => void;
  onClickDelete?: (e?: MouseEvent) => void;
}

export default function SectionItemHeader({
  isExpanded,
  onClickHeader,
  onClickDuplicate,
  onClickDelete,
  children,
}: IProps) {

  return (
    <div className="flex items-center">
      <Button
        variant="custom"
        className="truncate w-full flex-grow cursor-pointer hover:bg-blue-100 rounded-md px-4 py-2 focus:ring-blue-600 focus-visible:outline-blue-600"
        onClick={onClickHeader}
      >
        <div className="flex w-full items-center">
          <div className="grow text-left">{children}</div>
          <div className="shrink-0 text-gray-500">
            {isExpanded ? <ChevronDown /> : <ChevronUp />}
          </div>
        </div>
      </Button>
      <div className="shrink-0">
        {(onClickDelete || onClickDuplicate) && (
          <TableOptionsMenu>
            {onClickDuplicate && (
              <MenuItemButton onClick={onClickDuplicate}>
                Duplicate
              </MenuItemButton>
            )}
            {onClickDelete && (
              <MenuItemButton onClick={onClickDelete}>Delete</MenuItemButton>
            )}
          </TableOptionsMenu>
        )}
      </div>
    </div>
  );
}
