import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChatInput } from '../ChatInput';
import { ModelResponse } from '@/components/Chat/ModelResponse';
import SelectionController from '@/components/Chat/SelectionController';
import ChatController from '@/components/Chat/ChatController';
import ModelPicker from '@/components/Chat/ModelPicker';
import { cn } from '@/util/Cn';
import emitter, { emitterMessage } from '@/util/Emitter';
import Button from '@/components/Buttton';
import useSize from '@/hooks/UseSize';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface IProps {
  controller: ChatController;
  isMaximized?: boolean;
  onClickNext?: () => void;
  onClickPrev?: () => void;
}

enum EScrollTo {
  Top,
  Bottom,
}

export function Chat({
  controller,
  isMaximized,
  onClickNext,
  onClickPrev,
}: IProps) {
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
        <div
          ref={responsesRef}
          className="flex flex-col gap-y-6"
        >
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
      </div>
      <div
        className={cn(
          'relative bg-white',
          items.length === 0 && !isNewItemLoading
            ? 'h-full  flex items-center'
            : 'shrink-0',
        )}
      >
        <div className="flex flex-col w-full justify-center">

          <ChatInput
            controller={state.inputController}
            onSubmit={() => {
              setScrollTo(EScrollTo.Bottom);
              controller.onClickSendInput();
            }}
          />
          {isMaximized && (
            <div className="mt-2 flex w-full justify-end">
              <span className="isolate flex rounded-md shadow-sm">
                <button
                  type="button"
                  className={cn("relative inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 grow",
                    !onClickPrev ? '!text-gray-200' : null
                  )}
                  onClick={onClickPrev}
                  disabled={!onClickPrev}
                >
                  <span className="sr-only">Previous Chat</span>
                  <ChevronLeftIcon
                    aria-hidden="true"
                    className="size-5"
                  />
                </button>
                <button
                  type="button"
                  className={cn("relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 grow justify-end",
                    !onClickNext ? '!text-gray-200' : null
                  )}
                  onClick={onClickNext}
                  disabled={!onClickNext}
                >
                  <span className="sr-only">Next Chat</span>
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-5"
                  />
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
