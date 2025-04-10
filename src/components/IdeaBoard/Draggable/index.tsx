import React, { PropsWithChildren } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface IProps extends PropsWithChildren {
  id: string,
  disabled?: boolean,
}

export default function Draggable({ id, disabled, children }: IProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}
