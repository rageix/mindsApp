'use client';
import { useEffect, useRef, useState } from 'react';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import MultiChatsController from '@/components/MultiChatsView/MultiChatsController';
import ChatWrapper from '../ChatWrapper';
import Button from '@/components/Buttton';
import useSize from '@/hooks/UseSize';
import { ChatInput } from '@/components/ChatInput';
import { cn } from '@/util/Cn';
import emitter, { emitterMessage } from '@/util/Emitter';
import useWindowSizes from '@/hooks/UseWindowSizes';
import { BreakPoints } from '@/common/BreakPoints';
import IdeaBoardWrapper from '@/components/IdeaBoardWrapper';
import SubscriptionRequired from '@/components/SubscriptionRequired';

const calcMaxWidthItems = (width: number, numItems: number): number => {
  let max = 1;

  if (width >= BreakPoints.xl) {
    max = 4;
  } else if (width >= BreakPoints.md) {
    max = 3;
  } else if (width >= BreakPoints.sm) {
    max = 2;
  }

  return Math.min(max, numItems);
};

export default function MultiChatsView() {
  const mainRef = useRef(null);
  const mainSize = useSize(mainRef);
  const itemWrapperRef = useRef(null);
  const itemWrapperSize = useSize(itemWrapperRef);
  const windowSizes = useWindowSizes();
  const [ideaBoardOpen, setIdeaBoardOpen] = useState(
    windowSizes.pageWidth > BreakPoints.md,
  );
  const [ideaBoardController] = useState(new IdeaBoardController());
  const [controller] = useState(new MultiChatsController());
  controller.useController();
  const [maxItemWidth, setMaxItemWidth] = useState(1);

  const { state } = controller;
  const count = state.controllers.length;

  // const maxItemWidth = calcMaxWidthItems(wrapperSize?.width || 0, count);

  useEffect(() => {
    if ((mainSize?.width || 0) > 0) {
      const value = calcMaxWidthItems(mainSize?.width || 0, count);
      setMaxItemWidth(value);
    }
  }, [mainSize?.width, count]);

  const onNewChat = () => {
    controller.onReset();
  };

  const onToggleIdeaBoard = () => {
    setIdeaBoardOpen(!ideaBoardOpen);
  };

  useEffect(() => {
    emitter.on(emitterMessage.newChat, onNewChat);
    emitter.on(emitterMessage.toggleIdeaBoard, onToggleIdeaBoard);
    return () => {
      emitter.off(emitterMessage.newChat, onNewChat);
      emitter.on(emitterMessage.toggleIdeaBoard, onToggleIdeaBoard);
    };
  }, [ideaBoardOpen]);

  return (
    <div
      ref={mainRef}
      className={cn(
        'absolute h-[calc(100%)] pt-[4.5rem] lg:pt-0 lg:pl-72 w-full top-0 left-0 right-0 z-0',
        ideaBoardOpen && windowSizes.pageWidth > BreakPoints.md
          ? 'pr-[448px]'
          : null,
      )}
    >
      <div className="h-full">
        <div className="flex h-full">
          <div className="grow">
            <div className="grow h-full flex flex-col">
              <div
                className={cn(
                  'p-3 pb-0 flex items-center gap-x-3',
                  !state.isGlobalSearchVisible ? 'hidden' : null,
                )}
              >
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
              {state.maximizeIndex === null ? (
                <div
                  ref={itemWrapperRef}
                  className={cn(
                    'grid gap-x-3 gap-y-3 h-full overflow-y-auto p-3',
                    maxItemWidth === 1 ? 'grid-cols-1' : null,
                    maxItemWidth === 2 ? 'grid-cols-2' : null,
                    maxItemWidth === 3 ? 'grid-cols-3' : null,
                    maxItemWidth === 4 ? 'grid-cols-4' : null,
                  )}
                >
                  {state.controllers.map((v, i) => (
                    <div
                      key={v.id}
                      className="h-full overflow-hidden"
                      style={{
                        height:
                          count > maxItemWidth
                            ? itemWrapperSize?.height
                              ? (itemWrapperSize.height - 24) / 2 // 24 is height of card header
                              : '100%'
                            : '100%',
                      }}
                    >
                      <ChatWrapper
                        controller={v}
                        ideaBoardController={ideaBoardController}
                        onClickRemove={() => controller.onClickRemove(i)}
                        onClickMaximize={() => controller.onClickMaximize(i)}
                        canRemove={state.controllers.length > 1}
                        isGlobalSearchVisible={state.isGlobalSearchVisible}
                        isMaximized={false}
                        onClickGlobalSearchVisible={() =>
                          controller.onChangeIsGlobalSearchVisible(
                            !state.isGlobalSearchVisible,
                          )
                        }
                        onClickNext={controller.onClickNext}
                        onClickPrev={controller.onClickPrev}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 h-full">
                  <ChatWrapper
                    key={String(state.maximizeIndex)}
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
                    canRemove={state.controllers.length > 1}
                    isGlobalSearchVisible={state.isGlobalSearchVisible}
                    onClickGlobalSearchVisible={() =>
                      controller.onChangeIsGlobalSearchVisible(
                        !state.isGlobalSearchVisible,
                      )
                    }
                    onClickNext={controller.onClickNext}
                    onClickPrev={controller.onClickPrev}
                  />
                </div>
              )}
            </div>
          </div>
          <IdeaBoardWrapper
            controller={ideaBoardController}
            isOpen={ideaBoardOpen}
            onHide={() => setIdeaBoardOpen(false)}
          />
        </div>
      </div>
      <SubscriptionRequired />
    </div>
  );
}
