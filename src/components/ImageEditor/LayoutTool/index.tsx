import LayoutToolController from '@/components/ImageEditor/LayoutTool/LayoutToolController';
import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import Ellipse from '@/components/ImageEditor/LayoutToolPixi/Ellipse';
import { Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

interface IProps {
  controller: LayoutToolController;
}

export default function LayoutTool({ controller }: IProps) {
  console.log('LayoutTool', 'render');
  // controller.useController();
  const state = controller.state;

  console.log('state.active', state.active);
  if (!state.active) {
    return null;
  }

  console.log(state);

  return (
    <>
      <Rectangle
        x={state.startX}
        y={state.startY}
        width={Math.max(0, state.width)}
        height={Math.max(0, state.height)}
        fill="0xffffff"
        borderColor="0xff0000"
        borderWidth={1}
      />
      <Ellipse
        x={state.startX + Math.max(0, state.width) / 2}
        y={state.startY + Math.max(0, state.height) / 2}
        width={Math.max(0, state.width) / 2}
        height={Math.max(0, state.height) / 2}
        fillColor="0xffffff"
        borderColor="0x0005FF"
        borderWidth={2}
      />
      <Text
        text="A"
        anchor={0.5}
        x={state.startX}
        y={state.startY + Math.max(0, state.height) / 2}
        style={
          new TextStyle({
            align: 'left',
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: Math.max(0, state.height) * 1.5,
            fontWeight: '400',
            fill: ['#2D2D2D'], // gradient
            lineHeight: 1,
            padding: 0,
            // stroke: '#01d27e',
            // strokeThickness: 5,
            // letterSpacing: 20,
            // dropShadow: true,
            // dropShadowColor: '#ccced2',
            // dropShadowBlur: 4,
            // dropShadowAngle: Math.PI / 6,
            // dropShadowDistance: 6,
            // wordWrap: true,
            // wordWrapWidth: 440,
          })
        }
      />

      {/*<Rect*/}
      {/*  x={state.startX}*/}
      {/*  y={state.startY}*/}
      {/*  width={Math.max(0, state.width)}*/}
      {/*  height={Math.max(0, state.height)}*/}
      {/*  fill="white"*/}
      {/*  stroke="red"*/}
      {/*/>*/}
      {/*<Ellipse*/}
      {/*  x={state.startX + state.width / 2}*/}
      {/*  y={state.startY + state.height / 2}*/}
      {/*  radiusX={Math.max(0, state.width / 2)}*/}
      {/*  radiusY={Math.max(0, state.height / 2)}*/}
      {/*  fill="white"*/}
      {/*  stroke="#b5acd8"*/}
      {/*  // strokeWidth={1}*/}
      {/*/>*/}
      {/*<Label*/}
      {/*  x={state.startX}*/}
      {/*  y={state.startY}*/}
      {/*  width={state.width}*/}
      {/*  height={state.height}*/}
      {/*>*/}
      {/*  <Text*/}
      {/*    fill="black"*/}
      {/*    text="Text"*/}
      {/*    fontSize={state.height * 1.2}*/}
      {/*    lineHeight={1}*/}
      {/*    verticalAlign="middle"*/}
      {/*    // padding={0}*/}
      {/*    fontFamily='"Source Sans Pro", Helvetica, sans-serif'*/}
      {/*    // offsetX={0}*/}
      {/*    // offsetY={0}*/}
      {/*  />*/}
      {/*</Label>*/}
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
