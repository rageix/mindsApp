'use client';
import { MouseEvent, MutableRefObject, PropsWithChildren } from 'react';
import MenuItemButton from '@/components/MenuItemButton';
import TableOptionsMenu from '@/components/TableOptionsMenu';
import { ChevronDown, ChevronUp, GripVerticalIcon } from 'lucide-react';
import Button from '@/components/Buttton';

interface IProps extends PropsWithChildren {
  dragHandleRef?: MutableRefObject<any>;

  isExpanded: boolean;
  onClickHeader: () => void;
  onClickDuplicate?: (e?: MouseEvent) => void;
  onClickDelete?: (e?: MouseEvent) => void;
}

export default function SectionItemHeader({
  dragHandleRef,
  isExpanded,
  onClickHeader,
  onClickDuplicate,
  onClickDelete,
  children,
}: IProps) {
  return (
    <div className="flex items-center">
      {dragHandleRef && (
        <div className="shrink-0">
          <Button
            variant="link"
            elRef={dragHandleRef}
            isInline
            className="text-gray-500 hover:text-gray-400 h-10"
            aria-label="Reorder"
          >
            <GripVerticalIcon className="" />
          </Button>

          {/*<DragHandleButton*/}
          {/*  ref={dragHandleRef}*/}
          {/*  label={`Reorder`}*/}
          {/*>*/}
          {/*  <span>Drag Here</span>*/}
          {/*</DragHandleButton>*/}
        </div>
      )}
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
          <TableOptionsMenu buttonClassName="h-10">
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
