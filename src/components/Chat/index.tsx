import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChatInput } from '../ChatInput';
import { ModelResponse } from '@/components/Chat/ModelResponse';
import SelectionController from '@/components/Chat/SelectionController';
import SelectionPopover from '@/components/Chat/SelectionPopover';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import ChatController from '@/components/Chat/ChatController';
import ModelPicker from '@/components/Chat/ModelPicker';
import { cn } from '@/util/Cn';
import emitter, { emitterMessage } from '@/util/Emitter';
import Button from '@/components/Buttton';
import useSize from '@/hooks/UseSize';

interface IProps {
  ideaBoardController: IdeaBoardController;
  controller: ChatController;
}

enum EScrollTo {
  Top,
  Bottom,
}

export function Chat({ ideaBoardController, controller }: IProps) {
  // controller.useController();
  const { state } = controller;
  state.itemsController.useController();
  state.inputController.useController();
  const ref = useRef<HTMLDivElement>(null);
  const responsesRef = useRef<HTMLDivElement>(null);
  const responsesSize = useSize(responsesRef);
  const [selectionController] = useState(new SelectionController(ref));
  const [scrollTo, setScrollTo] = useState(EScrollTo.Bottom);

  const onNewChat = () => {
    controller.onNew();
  };

  const onGlobalChatInput = () => {
    setScrollTo(EScrollTo.Bottom);
  };

  useEffect(() => {
    emitter.on(emitterMessage.newChat, onNewChat);
    emitter.on(emitterMessage.globalChatInput, onGlobalChatInput);

    return () => {
      emitter.off(emitterMessage.newChat, onNewChat);
      emitter.off(emitterMessage.globalChatInput, onGlobalChatInput);
    };
  }, []);

  const { items, isNewItemLoading, loadingItemText } =
    state.itemsController.state;

  useLayoutEffect(() => {
    if (ref.current) {
      if (scrollTo === EScrollTo.Bottom) {
        ref.current.scrollTop = ref.current.scrollHeight;
        return;
      }
      ref.current.scrollTop = 0;
      setScrollTo(EScrollTo.Bottom);
    }
  }, [responsesSize?.height]);

  return (
    <div className="h-full flex flex-col gap-y-3 px-3 pb-3">
      <div className="mt-3 flex gap-x-3 shrink-0">
        <ModelPicker
          value={state.model}
          onChange={controller.onChangeModel}
        />
      </div>
      <div
        ref={ref}
        className={cn(
          'overflow-auto flex flex-col gap-y-3',
          items.length > 0 || isNewItemLoading ? 'grow h-full' : 'hidden',
        )}
        onScroll={selectionController.onUpdate}
      >
        {items.length > 0 && (
          <Button
            variant="link"
            onClick={() => {
              setScrollTo(EScrollTo.Top);
              state.itemsController.onClickLoadMore();
            }}
          >
            Load more...
          </Button>
        )}
        <div ref={responsesRef}>
          {items.length > 0 &&
            items.map((v) => (
              <ModelResponse
                key={String(v._id)}
                modelResponse={v}
                onClickRepeat={() => {
                  setScrollTo(EScrollTo.Bottom);
                  controller.onRepeat(v);
                }}
              />
            ))}
          {isNewItemLoading && (
            <ModelResponse
              inputText={loadingItemText}
              isLoading={isNewItemLoading}
            />
          )}
        </div>
        <SelectionPopover
          controller={selectionController}
          onClickMessage={state.inputController.setText}
          onClickClip={ideaBoardController.onAdd}
        />
      </div>
      <div
        className={cn(
          'relative bg-white',
          items.length === 0 && !isNewItemLoading
            ? 'h-full flex items-center'
            : 'shrink-0',
        )}
      >
        <ChatInput
          controller={state.inputController}
          onSubmit={() => {
            setScrollTo(EScrollTo.Bottom);
            controller.onClickSendInput();
          }}
        />
      </div>
    </div>
  );
}
