import React, { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface IProps extends PropsWithChildren {
  id: string,
}

export default function Droppable({ id, children }: IProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-y-3 h-full"
    >
      {children}
    </div>
  );
}
