import { useCallback } from 'react';
import { Graphics } from '@pixi/react';
import { Draw } from '@/types/Pixi';
import '@pixi/events';
import { FederatedPointerEvent } from 'pixi.js';
import { EventMode } from '@pixi/events';

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
  fillAlpha?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderAlpha?: number;
  angle?: number;
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e?: FederatedPointerEvent) => void;
  onMouseOver?: (e?: FederatedPointerEvent) => void;
  onMouseOut?: (e?: FederatedPointerEvent) => void;
  onMouseLeave?: (e?: FederatedPointerEvent) => void;
  onMouseEnter?: (e?: FederatedPointerEvent) => void;
  onMouseMove?: (e?: FederatedPointerEvent) => void;
  onMouseUp?: (e?: FederatedPointerEvent) => void;
  onMouseUpOutside?: (e?: FederatedPointerEvent) => void;
  eventMode?: EventMode
}

export default function Ellipse(props: IProps) {
  const draw = useCallback<Draw>(
    (g) => {
      g.clear();
      g.beginFill(props.fillColor, props.fillAlpha || 1);
      if (props.borderWidth) {
        g.lineStyle(props.borderWidth, props.borderColor, props.borderAlpha || 1);
      }
      g.drawEllipse(props.x, props.y, props.width / 2, props.height /2);
      g.angle = props.angle || 0;
      g.endFill();
    },
    [props],
  );

  return (
    <Graphics
      draw={draw}
      onclick={props.onClick || null}
      onmouseout={props.onMouseOut || null}
      onmouseover={props.onMouseOver || null}
      onmousedown={props.onMouseDown || null}
      onmouseleave={props.onMouseLeave || null}
      onmouseenter={props.onMouseEnter || null}
      onmousemove={props.onMouseMove || null}
      onmouseup={props.onMouseUp || null}
      onmouseupoutside={props.onMouseUpOutside || null}
      eventMode={props.eventMode || 'auto'}
    />
  );
}
