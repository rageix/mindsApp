'use client';
import { PropsWithChildren, useEffect } from 'react';
import {
  extractClosestEdge
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { flushSync } from 'react-dom';
import { IDragNDropSectionItemValue } from '@/types/Resume';
import {
  monitorForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  triggerPostMoveFlash
} from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
import SectionController from '../SectionController';

interface IProps extends PropsWithChildren {
  controller: SectionController;
}

export default function SectionWithDraggables({
                                                controller,
                                                children
                                              }: IProps) {
  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        const sourceData = source.data as IDragNDropSectionItemValue;
        return sourceData.type === controller.state.section.type;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const controllers = controller.state.controllers;
        const sourceData = source.data as IDragNDropSectionItemValue;
        const targetData = target.data as IDragNDropSectionItemValue;

        if (
          sourceData.type !== controller.state.section.type ||
          targetData.type !== controller.state.section.type
        ) {
          return;
        }

        const indexOfSource = controllers.findIndex(
          (v) => v.id === sourceData.id
        );
        const indexOfTarget = controllers.findIndex(
          (v) => v.id === targetData.id
        );

        if (indexOfTarget < 0 || indexOfSource < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        // Using `flushSync` so we can query the DOM straight after this line
        flushSync(() => {
          controller.onDrag({
            startIndex: indexOfSource,
            indexOfTarget,
            closestEdgeOfTarget,
            axis: 'vertical'
          });
        });
        // Being simple and just querying for the task after the drop.
        // We could use react context to register the element in a lookup,
        // and then we could retrieve that element after the drop and use
        // `triggerPostMoveFlash`. But this gets the job done.
        const element = document.querySelector(
          `[data-item-id="${sourceData.id}"]`
        );
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element);
        }
      }
    });
  }, [controller.state.controllers]);

  return <div>{children}</div>;
}
