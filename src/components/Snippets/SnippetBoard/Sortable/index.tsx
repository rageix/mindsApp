import React, { PropsWithChildren } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface IProps extends PropsWithChildren {
  id: string;
  disabled?: boolean;
}

export default function Sortable({ id, disabled, children }: IProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
