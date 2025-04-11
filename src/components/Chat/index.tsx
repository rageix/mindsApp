import { useEffect, useRef, useState } from 'react';
import { ChatInput } from '@/components/Chat/ChatInput';
import { ModelResponse } from '@/components/Chat/ModelResponse';
import { EModel } from '@/types/Model';
import { useParams } from 'next/navigation';
import SelectionController from '@/components/Chat/SelectionController';
import SelectionPopover from '@/components/Chat/SelectionPopover';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import Input from '@/components/Input';
import Button from '@/components/Buttton';
import ChatController from '@/components/Chat/ChatController';
import ChatsModal from '@/components/ChatsModal';
import InfoAlert from '@/components/Alert/InfoAlert';

interface IProps {
  model: EModel;
  ideaBoardController: IdeaBoardController;
}

export function Chat({ model, ideaBoardController }: IProps) {
  const { chatId } = useParams<{ chatId?: string }>();
  const [controller] = useState(new ChatController(chatId));
  controller.useController();
  const { state } = controller;
  state.itemsController.useController();
  state.inputController.useController();
  const ref = useRef<HTMLDivElement>(null);
  const [selectionController] = useState(new SelectionController(ref));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    controller.onChangeModel(model);
  }, [model]);

  const items = state.itemsController.state.items || [];

  return (
    <div className="h-full flex flex-col gap-y-3">
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
      <div
        ref={ref}
        className="grow overflow-auto flex flex-col gap-y-6"
        onScroll={selectionController.onUpdate}
      >
        {items.length === 0 &&
        <InfoAlert>There are no messages in this chat.</InfoAlert>
        }
        {items.length > 0 && items.map((v) => (
          <ModelResponse
            key={String(v._id)}
            modelResponse={v}
          />
        ))}
        <SelectionPopover
          controller={selectionController}
          onClickMessage={state.inputController.setText}
          onClickClip={ideaBoardController.onAdd}
        />
      </div>
      <div className="shrink-0 py-4 relative z-20 bg-white">
        <ChatInput
          controller={state.inputController}
          onSubmit={controller.sendInput}
        />
      </div>
      <ChatsModal
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
