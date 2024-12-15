import { Ellipse, Label, Rect, Text } from 'react-konva';
import LayoutToolController from '@/components/ImageEditor/LayoutTool/LayoutToolController';

interface IProps {
  controller: LayoutToolController;
}

export default function LayoutToolPixi({ controller }: IProps) {
  console.log('LayoutToolPixi', 'render');
  controller.useController();
  const state = controller.state;

  console.log('state.active', state.active);
  if (!state.active) {
    return null;
  }

  console.log(state);

  return (
    <>
      <Rect
        x={state.startX}
        y={state.startY}
        width={Math.max(0, state.width)}
        height={Math.max(0, state.height)}
        fill="white"
        stroke="red"
      />
      <Ellipse
        x={state.startX + state.width / 2}
        y={state.startY + state.height / 2}
        radiusX={Math.max(0, state.width / 2)}
        radiusY={Math.max(0, state.height / 2)}
        fill="white"
        stroke="#b5acd8"
        // strokeWidth={1}
      />
      <Label
        x={state.startX}
        y={state.startY}
        width={state.width}
        height={state.height}
      >
        <Text
          fill="black"
          text="Text"
          fontSize={state.height * 1.2}
          lineHeight={1}
          verticalAlign="middle"
          // padding={0}
          fontFamily='"Source Sans Pro", Helvetica, sans-serif'
          // offsetX={0}
          // offsetY={0}
        />
      </Label>
      {/*<Circle*/}
      {/*  radius={Math.min(state.width, state.height) / 2}*/}
      {/*  x={state.startX + state.width / 2}*/}
      {/*  y={state.startY + state.height / 2}*/}
      {/*  // width={state.width / 2}*/}
      {/*  // height={state.height / 2}*/}
      {/*  fill="white"*/}
      {/*  stroke="green"*/}
      {/*  // strokeWidth={5}*/}
      {/*  // strokeEnabled={true}*/}
      {/*/>*/}
    </>
  );
}
