import SnippetsController from '@/components/Snippets/SnippetsController';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SnippetItem } from '@/components/Snippets/SnippetItem';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Sortable from '@/components/Snippets/SnippetBoard/Sortable';
import { useState } from 'react';
import SnippetInputController from '@/components/Snippets/SnippetItem/SnippetInputController';
import { SnippetDragOverlay } from '@/components/Snippets/SnippetDragOverlay';

const DROPPABLE_ID = 'snippetsBoard';

interface IProps {
  controller: SnippetsController;
}

export function SnippetBoard({ controller }: IProps) {
  const { state } = controller;
  const [active, setActive] = useState<SnippetInputController | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const items = state.controllers.map((v) => v.id);

  function onDragStart(event: DragStartEvent) {
    const { active } = event;

    const inputController = state.controllers.find((v) => v.id === active.id);

    if (!inputController) {
      setActive(null);
      return;
    }

    setActive(inputController);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e) => {
        setActive(null);
        setIsMoving(false);
        controller.onDragEnd(e);
      }
    }
      onDragStart={onDragStart}
      onDragMove={() => setIsMoving(true)}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        id={DROPPABLE_ID}
      >
        <div className="flex flex-col gap-y-3">
          {state.controllers.map((v) => (
            <Sortable
              key={v.id}
              id={v.id}
            >
              <SnippetItem
                controller={v}
                parentController={controller}
                isActive={isMoving && active?.id === v.id}
              />
            </Sortable>
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {isMoving && active && <SnippetDragOverlay controller={active} />}
      </DragOverlay>
    </DndContext>
  );
}
