'use client';
import { useEffect, useRef, useState } from 'react';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import { IdeaBoard } from '../IdeaBoard';
import MultiChatsController from '@/components/MultiChatsView/MultiChatsController';
import ChatWrapper from '../ChatWrapper';
import Button from '@/components/Buttton';
import useSize from '@/hooks/UseSize';
import { ChatInput } from '@/components/ChatInput';
import { cn } from '@/util/Cn';
import emitter, { emitterMessage } from '@/util/Emitter';

const calcMaxWidthItems = (width: number, numItems: number): number => {
  let max = 1;

  if (width > 896) {
    max = 3;
  } else if (width > 576) {
    max = 2;
  }

  return Math.min(max, numItems);
};

export default function MultiChatsView() {
  const wrapperRef = useRef(null);
  const wrapperSize = useSize(wrapperRef);
  const [ideaBoardController] = useState(new IdeaBoardController());
  const [controller] = useState(new MultiChatsController());
  controller.useController();

  const { state } = controller;
  const count = state.controllers.length;

  const maxItemWidth = calcMaxWidthItems(wrapperSize?.width || 0, count);

  const onNewChat = () => {
    controller.onReset();
  };

  useEffect(() => {
    emitter.on(emitterMessage.newChat, onNewChat);
    return () => {
      emitter.off(emitterMessage.newChat, onNewChat);
    }
  }, []);

  return (
    <div className="absolute h-[calc(100%)] pt-[4.5rem] lg:pt-0 lg:pl-72 w-full top-0 left-0 right-0 z-0">
      <div className="h-full">
        <div className="flex h-full">
          <div className="grow">
            {state.maximizeIndex !== null ? (
              <div className="p-3 h-full">
                <ChatWrapper
                  controller={state.controllers[state.maximizeIndex]}
                  ideaBoardController={ideaBoardController}
                  onClickRemove={() => {
                    if (state.maximizeIndex !== null) {
                      controller.onClickRemove(state.maximizeIndex);
                    }
                  }}
                  onClickMaximize={() => {
                    if (state.maximizeIndex !== null) {
                      controller.onClickMaximize(state.maximizeIndex);
                    }
                  }}
                  isMaximized
                />
              </div>
            ) : (
              <div className="grow h-full flex flex-col gap-y-3">
                <div className="p-3 pb-0 flex items-center gap-x-3">
                  <div className="grow">
                    <ChatInput
                      controller={state.inputController}
                      onSubmit={controller.onSendInput}
                    />
                  </div>
                  <div className="shrink-0">
                    <Button
                      variant="blue"
                      onClick={controller.onClickNew}
                      isInline
                    >
                      Add Chat
                    </Button>
                  </div>
                </div>
                <div
                  ref={wrapperRef}
                  className={cn(
                    'grid gap-x-3 gap-y-3 h-full overflow-y-auto p-3 pt-0',
                    maxItemWidth === 1 ? 'grid-cols-1' : null,
                    maxItemWidth === 2 ? 'grid-cols-2' : null,
                    maxItemWidth === 3 ? 'grid-cols-3' : null,
                  )}
                >
                  {state.controllers.map((v, i) => (
                    <div
                      key={v.id}
                      className="h-full"
                      style={{
                        height:
                          count > maxItemWidth
                            ? wrapperSize?.height
                              ? (wrapperSize.height - 24) / 2
                              : '100%'
                            : '100%',
                      }}
                    >
                      <ChatWrapper
                        controller={v}
                        ideaBoardController={ideaBoardController}
                        onClickRemove={() => controller.onClickRemove(i)}
                        onClickMaximize={() => controller.onClickMaximize(i)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="shrink-0 w-88 flex flex-col gap-y-3 p-3 border-l border-gray-200 bg-white">
            <IdeaBoard controller={ideaBoardController} />
          </div>
        </div>
      </div>
    </div>
  );
}
