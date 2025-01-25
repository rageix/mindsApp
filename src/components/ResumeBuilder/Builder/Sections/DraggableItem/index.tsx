'use client';
import {
  HTMLAttributes,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import invariant from 'tiny-invariant';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { DropIndicator } from '@/components/DropIndicator';
import { createPortal } from 'react-dom';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import { cn } from '@/util/Cn';
import { IDragNDropSectionItemValue } from '@/types/Resume';

type ItemState =
  | {
      type: 'idle';
    }
  | {
      type: 'preview';
      container: HTMLElement;
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-over';
      closestEdge: Edge | null;
    };

const stateStyles: {
  [Key in ItemState['type']]?: HTMLAttributes<HTMLDivElement>['className'];
} = {
  'is-dragging': 'opacity-40',
};

const idle: ItemState = { type: 'idle' };

interface IProps extends PropsWithChildren {
  dragRef: MutableRefObject<any>;
  dragHandleRef: MutableRefObject<any>;
  getValue: () => IDragNDropSectionItemValue;
  controller: SectionItemController<any>;
  dragPreview?: ReactElement;
}

export default function DraggableItem({
  dragRef,
  dragHandleRef,
  getValue,
  controller,
  dragPreview,
  children,
}: IProps) {
  const [dragState, setDragState] = useState<ItemState>(idle);

  useEffect(() => {
    const element = dragRef.current;
    const dragHandle = dragHandleRef.current;

    try {
      invariant(element);
      invariant(dragHandle);
    } catch (_err) {
      return;
    }

    return combine(
      draggable({
        element: dragHandle,
        getInitialData() {
          // return getTaskData(task);
          return getValue();
        },
        onGenerateDragPreview({ nativeSetDragImage }: any) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: '16px',
              y: '8px',
            }),
            render({ container }: { container: HTMLElement }) {
              setDragState({ type: 'preview', container });
            },
          });
        },
        onDragStart() {
          setDragState({ type: 'is-dragging' });
        },
        onDrop() {
          setDragState(idle);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }: any) {
          const value = getValue();
          const sourceData = source.data as IDragNDropSectionItemValue;

          if(sourceData.type !== value.type || sourceData.id === value.id) {
            return false;
          }
          // not allowing dropping on yourself
          if (source.element === element) {
            return false;
          }
          // only allowing tasks to be dropped on me
          // return isTaskData(source.data);
          return true;
        },
        getData({ input }: any) {
          // const data = getTaskData(task);
          // const data = {id: controller.id};
          const data = getValue();
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setDragState({ type: 'is-dragging-over', closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);

          // Only need to update react state if nothing has changed.
          // Prevents re-rendering.
          setDragState((current) => {
            if (
              current.type === 'is-dragging-over' &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: 'is-dragging-over', closestEdge };
          });
        },
        onDragLeave() {
          setDragState(idle);
        },
        onDrop() {
          setDragState(idle);
        },
      }),
    );
  }, [controller, dragRef.current, dragHandleRef.current]);

  return (
    <div className={cn('relative', stateStyles[dragState.type] ?? '')}>
      {children}
      {dragState.type === 'is-dragging-over' && dragState.closestEdge ? (
        <DropIndicator
          edge={dragState.closestEdge}
          gap={'8px'}
        />
      ) : null}
      {dragState.type === 'preview'
        ? createPortal(dragPreview, dragState.container)
        : null}
    </div>
  );
}
