import { useCallback } from 'react';
import { Graphics } from '@pixi/react';
import { Draw } from '@/types/Pixi';

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  onMouseDown?: () => void;
}

export default function Rectangle(props: IProps) {
  const draw = useCallback<Draw>(
    (g) => {
      g.clear();
      g.beginFill(props.fill);
      if (props.borderWidth) {
        g.lineStyle(props.borderWidth, props.borderColor, 1);
      }
      g.drawRoundedRect(
        props.x,
        props.y,
        props.width,
        props.height,
        props.borderRadius || 0,
      );
      g.endFill();
    },
    [props],
  );

  return <Graphics draw={draw} />;
}
