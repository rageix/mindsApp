'use client';
import { MutableRefObject, PropsWithChildren, useContext } from 'react';
import MenuItemButton from '@/components/MenuItemButton';
import EllipsisMenu from '../../../../EllipsisMenu';
import { ChevronDown, ChevronUp, GripVerticalIcon } from 'lucide-react';
import Button from '@/components/Buttton';
import SectionContext from '@/components/ResumeBuilder/Builder/Sections/SectionContext';

interface IProps extends PropsWithChildren {
  dragHandleRef?: MutableRefObject<any>;
  isExpanded: boolean;
  onClickHeader: () => void;
  menu: boolean;
  id: string;
  // onClickDuplicate?: (e?: MouseEvent) => void;
  // onClickDelete?: (e?: MouseEvent) => void;
  // onClickMoveUp?: (e?: MouseEvent) => void;
  // onClickMoveDown?: (e?: MouseEvent) => void;
}

export default function SectionItemHeader({
  dragHandleRef,
  isExpanded,
  onClickHeader,
  menu,
  id,
  children,
}: IProps) {
  const sectionController = useContext(SectionContext);

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
      {menu && (
        <div className="shrink-0">
          <EllipsisMenu buttonClassName="h-10">
            <MenuItemButton onClick={() => sectionController.onMoveUp(id)}>
              Move Up
            </MenuItemButton>
            <MenuItemButton onClick={() => sectionController.onMoveDown(id)}>
              Move Down
            </MenuItemButton>
            <MenuItemButton
              onClick={() => sectionController.onDuplicateIndex(id)}
            >
              Duplicate
            </MenuItemButton>
            <MenuItemButton
              onClick={() => sectionController.onDeleteIndex(id)}
            >
              Delete
            </MenuItemButton>
          </EllipsisMenu>
        </div>
      )}
    </div>
  );
}
