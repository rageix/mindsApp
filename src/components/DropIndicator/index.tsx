import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import type { CSSProperties, HTMLAttributes } from 'react';

type Orientation = 'horizontal' | 'vertical';

const edgeToOrientationMap: Record<Edge, Orientation> = {
  top: 'horizontal',
  bottom: 'horizontal',
  left: 'vertical',
  right: 'vertical',
};

const orientationStyles: Record<Orientation, HTMLAttributes<HTMLElement>['className']> = {
  horizontal:
    'h-(--line-thickness) w-full',
  vertical:
    'w-(--line-thickness) h-full',
};

const edgeStyles: Record<Edge, HTMLAttributes<HTMLElement>['className']> = {
  top: 'top-(--line-offset)',
  right: 'right-(--line-offset)',
  bottom: 'bottom-(--line-offset)',
  left: 'left-(--line-offset)',
};

const strokeSize = 2;
const terminalSize = 8;
const offsetToAlignTerminalWithLine = (strokeSize - terminalSize) / 2;

interface IProps {
  edge: Edge,
  gap: string,
}

/**
 * This is a tailwind port of `@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box`
 */
export function DropIndicator({ edge, gap }: IProps) {
  const lineOffset = `calc(-0.5 * (${gap} + ${strokeSize}px))`;

  const orientation = edgeToOrientationMap[edge];

  return (
    <div
      style={
        {
          '--line-thickness': `${strokeSize}px`,
          '--line-offset': `${lineOffset}`,
          '--terminal-size': `${terminalSize}px`,
          '--terminal-radius': `${terminalSize / 2}px`,
          '--negative-terminal-size': `-${terminalSize}px`,
          '--offset-terminal': `${offsetToAlignTerminalWithLine}px`,
        } as CSSProperties
      }
      className={`absolute z-10 bg-blue-600 pointer-events-none before:content-('') before:w-(--terminal-size) before:h-(--terminal-size) box-border before:absolute before:height-(length:--line-thickness) before:border-solid before:border-blue-600 before:rounded-full ${orientationStyles[orientation]} ${[edgeStyles[edge]]}`} />
  );
}