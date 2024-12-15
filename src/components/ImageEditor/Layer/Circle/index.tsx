import CircleLayerController from '@/components/ImageEditor/Layer/Circle/CircleController';
import { Circle } from 'react-konva';

interface IProps {
  controller: CircleLayerController;
}

export default function CircleElement({ controller }: IProps) {
  controller.useController();
  const state = controller.state;

  return (
    <Circle
      x={state.x}
      y={state.y}
      width={state.width}
      height={state.height}
      fill={state.fill}
      draggable={!state.locked}
      onDragStart={controller.onDragStart}
      onDragEnd={controller.onDragEnd}
    />
  );
}
