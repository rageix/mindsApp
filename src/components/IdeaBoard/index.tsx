import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
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
import { IdeaItem } from './IdeaItem';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import IdeaController from '@/components/IdeaBoard/IdeaItem/IdeaController';
import { IdeaDragOverlay } from './IdeaDragOverlay';
import IdeaBoardsModal from '@/components/IdeaBoardsModal';
import Button from '@/components/Buttton';
import Input from '@/components/Input';
import InfoAlert from '@/components/Alert/InfoAlert';

const DROPPABLE_ID = 'snippetsBoard';

interface IProps {
  controller: IdeaBoardController;
}

export function IdeaBoard({ controller }: IProps) {
  const [active, setActive] = useState<IdeaController | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  controller.useController();
  const { state } = controller;
  const { controllers } = controller.state;

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
    <div className="flex flex-col gap-y-3 overflow-y-auto grow">
      <div className="shrink-0 flex gap-x-3">
        <Input
          value={state.name}
          onChange={controller.onChangeName}
        />
        <Button
          variant="green"
          isInline
          onClick={() => controller.onSave()}
        >
          Save
        </Button>
        <Button
          variant="sky"
          isInline
          onClick={() => setShowModal(true)}
        >
          Open
        </Button>
      </div>
      {(controllers?.length || 0) === 0 ? (
        <div className="text text-gray-700 grow">
          <InfoAlert>Select some text to add snippets.</InfoAlert>
        </div>
      ) : (
        <div className="grow">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => {
              setActive(null);
              setIsMoving(false);
              controller.onDragEnd(e);
            }}
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
                  <IdeaItem
                    key={v.id}
                    controller={v}
                    parentController={controller}
                    isActive={isMoving && active?.id === v.id}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {isMoving && active && <IdeaDragOverlay controller={active} />}
            </DragOverlay>
          </DndContext>
        </div>
      )}
      <div className="shrink-0">
        <Button
          variant="sky"
          onClick={() => controller.onAdd('')}
        >
          Add Item
        </Button>
      </div>
      <IdeaBoardsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onOpenId={(_id) => {
          setShowModal(false);
          controller.loadId(_id);
        }}
        onNew={() => {
          setShowModal(false);
          controller.onNew();
        }}
      />
    </div>
  );
}
