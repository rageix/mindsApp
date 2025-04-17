import { useEffect, useRef, useState } from 'react';
import { ChatInput } from '@/components/Chat/ChatInput';
import { ModelResponse } from '@/components/Chat/ModelResponse';
import { useParams } from 'next/navigation';
import SelectionController from '@/components/Chat/SelectionController';
import SelectionPopover from '@/components/Chat/SelectionPopover';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import ChatController from '@/components/Chat/ChatController';
import InfoAlert from '@/components/Alert/InfoAlert';
import ModelPicker from '@/components/Chat/ModelPicker';
import { cn } from '@/util/Cn';
import emitter, { emitterMessage } from '@/util/Emitter';
import { MongoId } from '@/types/MongoDocument';

interface IProps {
  ideaBoardController: IdeaBoardController;
}

export function Chat({ ideaBoardController }: IProps) {
  const { chatId } = useParams<{ chatId?: string }>();
  const [controller] = useState(new ChatController(chatId));
  controller.useController();
  const { state } = controller;
  state.itemsController.useController();
  state.inputController.useController();
  const ref = useRef<HTMLDivElement>(null);
  const [selectionController] = useState(new SelectionController(ref));
  // const [showModal, setShowModal] = useState(false);

  const onLoadId = (_id: MongoId) => {
    controller.loadId(_id);
  };

  const onNewChat = () => {
    controller.onNew();
  };

  useEffect(() => {
    emitter.on(emitterMessage.loadChatId, onLoadId);
    emitter.on(emitterMessage.newChat, onNewChat);

    return () => {
      emitter.on(emitterMessage.loadChatId, onLoadId);
      emitter.off(emitterMessage.newChat, onNewChat);
    };
  }, []);

  const { items, isItemLoading, loadingItemText } = state.itemsController.state;

  return (
    <div className="h-full flex flex-col gap-y-3 px-3">
      <div className="mt-3 flex gap-x-3">
        <div>
          <ModelPicker
            value={state.model}
            onChange={controller.onChangeModel}
          />
        </div>
      </div>
      {/*<div className="shrink-0 flex gap-x-3">*/}
      {/*  <Input*/}
      {/*    value={state.name}*/}
      {/*    onChange={controller.onChangeName}*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    variant="green"*/}
      {/*    isInline*/}
      {/*    onClick={() => controller.onSave()}*/}
      {/*  >*/}
      {/*    Save*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    variant="blue"*/}
      {/*    isInline*/}
      {/*    onClick={() => setShowModal(true)}*/}
      {/*  >*/}
      {/*    Open*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <div
        ref={ref}
        className={cn(
          'overflow-auto flex flex-col gap-y-6',
          items.length > 0 ? 'grow' : 'hidden',
        )}
        onScroll={selectionController.onUpdate}
      >
        {items.length === 0 && (
          <InfoAlert>There are no messages in this chat.</InfoAlert>
        )}
        {items.length > 0 &&
          items.map((v) => (
            <ModelResponse
              key={String(v._id)}
              modelResponse={v}
            />
          ))}
        {isItemLoading && (
          <ModelResponse
            inputText={loadingItemText}
            isLoading={isItemLoading}
          />
        )}
        <SelectionPopover
          controller={selectionController}
          onClickMessage={state.inputController.setText}
          onClickClip={ideaBoardController.onAdd}
        />
      </div>
      <div
        className={cn(
          'py-3 relative z-20 bg-white',
          items.length === 0 ? 'h-full flex items-center' : 'shrink-0',
        )}
      >
        <ChatInput
          controller={state.inputController}
          onSubmit={controller.sendInput}
        />
      </div>
    </div>
  );
}
