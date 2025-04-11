import IdeaController from '@/components/IdeaBoard/IdeaItem/IdeaController';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import { cn } from '@/util/Cn';
import EllipsisMenu from '@/components/EllipsisMenu';
import MenuItemButton from '@/components/MenuItemButton';
import { GripVerticalIcon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TextareaAutosize from 'react-textarea-autosize';

interface IProps {
  controller: IdeaController;
  parentController: IdeaBoardController;
  isActive: boolean;
}

export function IdeaItem({
  controller,
  parentController,
  isActive,
}: IProps) {
  controller.useController();

  const { form } = controller;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: controller.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'rounded-md border border-gray-200 overflow-hidden relative flex',
        isActive ? 'bg-gray-200' : null,
      )}
      style={style}
    >
      {/*{!isActive && (*/}
      {/*  <div*/}
      {/*    className="isolate absolute top-2 right-2 z-50"*/}
      {/*    onClick={() => console.log('clicked')}*/}
      {/*  >*/}
      {/*    <EllipsisMenu className="!w-36">*/}
      {/*      <MenuItemButton*/}
      {/*        onClick={() => parentController.onRemove(controller.id)}*/}
      {/*      >*/}
      {/*        Delete*/}
      {/*      </MenuItemButton>*/}
      {/*    </EllipsisMenu>*/}
      {/*  </div>*/}
      {/*)}*/}
      {isActive && <div className="h-16"></div>}
      {!isActive && (
        <>
          <div
            className="shrink-0 bg-gray-200 text-gray-400 hover:text-gray-500 flex justify-center items-center px-3"
            {...attributes}
            {...listeners}
          >
            <GripVerticalIcon className="size-5" />
          </div>
          <div className="grow flex items-center border-r-1 border-r-gray-200">
            <TextareaAutosize
              className="w-full focus:border-2 focus:border-sky-400 focus-visible:outline-0 h-full p-3"
              value={form.text}
              onChange={controller.onChangeText}
              placeholder="Add some text"
            />
          </div>
          <div className="shrink-0 p-3">
            <EllipsisMenu className="!w-36">
              <MenuItemButton
                onClick={() => parentController.onRemove(controller.id)}
              >
                Delete
              </MenuItemButton>
            </EllipsisMenu>
          </div>
        </>
      )}
    </div>
  );
}
