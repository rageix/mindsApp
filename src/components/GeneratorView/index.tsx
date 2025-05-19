'use client';
import { useEffect, useRef, useState } from 'react';
import IdeaBoardController from '@/components/IdeaBoard/IdeaBoardController';
import { cn } from '@/util/Cn';
import emitter, { emitterMessage } from '@/util/Emitter';
import useWindowSizes from '@/hooks/UseWindowSizes';
import { BreakPoints } from '@/common/BreakPoints';
import IdeaBoardWrapper from '@/components/IdeaBoardWrapper';
import SubscriptionRequired from '@/components/SubscriptionRequired';
import GeneratorViewController from '@/components/GeneratorView/GeneratorViewController';
import Loading from '@/components/Loading';
import GeneratorForm from '@/components/GeneratorView/GeneratorForm';
import Generator from '@/components/GeneratorView/Generator';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import SelectionPopover from '@/components/Chat/SelectionPopover';
import SelectionController from '@/components/Chat/SelectionController';

export default function GeneratorView() {
  const windowSizes = useWindowSizes();
  const ref = useRef<HTMLDivElement>(null);
  const [selectionController] = useState(new SelectionController(ref));
  const [ideaBoardOpen, setIdeaBoardOpen] = useState(
    windowSizes.pageWidth > BreakPoints.md,
  );
  const [ideaBoardController] = useState(new IdeaBoardController());
  const [controller] = useState(new GeneratorViewController());
  controller.useController();
  const { state } = controller;

  const onToggleIdeaBoard = () => {
    setIdeaBoardOpen(!ideaBoardOpen);
  };

  useEffect(() => {
    emitter.on(emitterMessage.toggleIdeaBoard, onToggleIdeaBoard);
    return () => {
      emitter.on(emitterMessage.toggleIdeaBoard, onToggleIdeaBoard);
    };
  }, [ideaBoardOpen]);

  return (
    <div
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
            <div className="grow h-full flex flex-col gap-y-3 p-3 overflow-y-auto">
                <Card>
                  <CardBody>
                    <GeneratorForm
                      controller={state.inputController}
                      onSubmit={controller.onSubmit}
                    />
                  </CardBody>
                </Card>
                <div
                  ref={ref}
                >
                  {state.isLoading ? (
                    <Loading />
                  ) : (
                    <div className="flex flex-col gap-y-3">
                      <Generator value={state.data} />
                    </div>
                  )}
                </div>
            </div>
          </div>
          <IdeaBoardWrapper
            controller={ideaBoardController}
            isOpen={ideaBoardOpen}
            onHide={() => setIdeaBoardOpen(false)}
          />
        </div>
      </div>
      <SelectionPopover
        controller={selectionController}
        onClickClip={ideaBoardController.onAdd}
      />
      <SubscriptionRequired />
    </div>
  );
}
