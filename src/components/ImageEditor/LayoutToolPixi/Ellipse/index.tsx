import { useCallback } from 'react';
import { Graphics } from '@pixi/react';
import { Draw } from '@/types/Pixi';
import '@pixi/events';

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
  onClick?: () => void;
  onMouseOver?: () => void;
  interactive?: boolean
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
      interactive={props.interactive || false}
      onclick={props.onClick || null}
    />
  );
}
