import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

export interface IOnDrag {
  closestEdgeOfTarget: Edge | null;
  startIndex: number;
  indexOfTarget: number;
  axis: 'vertical' | 'horizontal';
}

export interface ISectionDragNDrop extends Record<string | symbol, unknown> {
  id: string;
}

export interface ISectionDragNDropSelf {
  self: { data: ISectionDragNDrop };
}
