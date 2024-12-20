import { useCallback } from 'react';
import { Graphics } from '@pixi/react';
import { Draw } from '@/types/Pixi';
import { FederatedPointerEvent } from 'pixi.js';

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  fillAlpha?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e?: FederatedPointerEvent) => void;
  onMouseOver?: (e?: FederatedPointerEvent) => void;
  onMouseOut?: (e?: FederatedPointerEvent) => void;
  onMouseLeave?: (e?: FederatedPointerEvent) => void;
  onMouseEnter?: (e?: FederatedPointerEvent) => void;
  onMouseMove?: (e?: FederatedPointerEvent) => void;
  onMouseUp?: (e?: FederatedPointerEvent) => void;
  onMouseUpOutside?: (e?: FederatedPointerEvent) => void;
  interactive?: boolean;
}

export default function Rectangle(props: IProps) {
  const draw = useCallback<Draw>(
    (g) => {
      g.clear();
      g.beginFill(props.fill, props.fillAlpha);
      if (props.borderWidth) {
        g.lineStyle(props.borderWidth, props.borderColor, 1);
      }
      g.drawRoundedRect(
        props.x - props.width / 2,
        props.y - props.height / 2,
        props.width,
        props.height,
        props.borderRadius || 0,
      );
      // g.scale.set(1.25,2)
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
      interactive={props.interactive || false}
    />
  );
}
