import { Container } from '@pixi/react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import PixiTransformerController from '@/components/ImageEditor/PixiTransformer/PixiTransformerController';
import { Container as TContainer, DisplayObject } from 'pixi.js';
import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import { EHandle } from '@/types/ImageEditor';

interface IProps extends PropsWithChildren {
  controller: PixiTransformerController;
  onHandleMouseOver: (handle: EHandle) => void;
  onHandleMouseOut: () => void;
  currentHandle: EHandle | null
}

interface IBoundingBox {
  width: number;
  height: number;
}

const BORDER_WIDTH = 1;
const HANDLE_SIZE = 10;
const HANDLE_TRANSFORM = HANDLE_SIZE / 2;

export default function PixiTransformer({ controller, onHandleMouseOver, onHandleMouseOut, currentHandle, children }: IProps) {
  const ref = useRef<TContainer<DisplayObject>>(null);
  const [bounds, setBounds] = useState<IBoundingBox>({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      const localBounds = ref.current.getLocalBounds();

      setBounds({
        width: localBounds.width,
        height: localBounds.height,
      });
    }
  }, [children, ref.current]);

  const { state } = controller;
  const WIDTH_TRANSFORM = bounds.width / 2;
  const HEIGHT_TRANSFORM = bounds.height / 2;

  return (
    <>
      <Container
        ref={ref}
        // position={[200, 150]}
        // width={200}
        // height={200}
        // x={state.x}
        // y={state.y}
        // scale={1.5}
        onmouseleave={controller.onMouseOut}
        onmouseenter={controller.onMouseEnter}
        // onmouseout={() => console.log('onmouseout')}
        // onmousedown={controller.onMouseDown}
        // onmouseup={controller.onMouseUp}
        // onmousemove={controller.onMouseMove}
        // onmouseupoutside={controller.onMouseUpOutside}
        // calculateBounds={onCalculateBounds}
        interactive
      >
        {children}
      </Container>
      <Rectangle
        x={state.x - bounds.width / 2}
        y={state.y - bounds.height / 2}
        width={bounds.width}
        height={bounds.height}
        fill="0xFFFFFF"
        fillAlpha={0}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
      />
      {/* Rotation point */}
      <Rectangle
        x={state.x - HANDLE_TRANSFORM}
        y={state.y - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={'0xFF0000'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
      />
      {/* Top Left */}
      <Rectangle
        x={state.x - WIDTH_TRANSFORM - HANDLE_TRANSFORM}
        y={state.y - HEIGHT_TRANSFORM - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={currentHandle === EHandle.TopLeft ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => onHandleMouseOver(EHandle.TopLeft)}
        onMouseOut={() => onHandleMouseOut()}
      />
      {/* Top */}
      <Rectangle
        x={state.x - HANDLE_TRANSFORM}
        y={state.y - HEIGHT_TRANSFORM - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={currentHandle === EHandle.Top ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => onHandleMouseOver(EHandle.Top)}
        onMouseOut={() => onHandleMouseOut()}
      />
      {/* Top Right */}
      <Rectangle
        x={state.x + WIDTH_TRANSFORM - HANDLE_TRANSFORM}
        y={state.y - HEIGHT_TRANSFORM - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={currentHandle === EHandle.TopRight ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => onHandleMouseOver(EHandle.TopRight)}
        onMouseOut={() => onHandleMouseOut()}
      />
      {/* Right */}
      <Rectangle
        x={state.x + WIDTH_TRANSFORM - HANDLE_TRANSFORM}
        y={state.y - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={currentHandle === EHandle.Right ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => {
         onHandleMouseOver(EHandle.Right);
        }}
        onMouseOut={() => {
          onHandleMouseOut();
        }}
      />
      {/* Bottom Right */}
      <Rectangle
        x={state.x + WIDTH_TRANSFORM - HANDLE_TRANSFORM}
        y={state.y + HEIGHT_TRANSFORM - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={currentHandle === EHandle.BottomRight ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => onHandleMouseOver(EHandle.BottomRight)}
        onMouseOut={() => onHandleMouseOut()}
      />
      {/* Bottom */}
      <Rectangle
        x={state.x - HANDLE_TRANSFORM}
        y={state.y + HEIGHT_TRANSFORM - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={currentHandle === EHandle.Bottom ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => onHandleMouseOver(EHandle.Bottom)}
        onMouseOut={() => onHandleMouseOut()}
      />
      {/* Bottom Left */}
      <Rectangle
        x={state.x - WIDTH_TRANSFORM - HANDLE_TRANSFORM}
        y={state.y + HEIGHT_TRANSFORM - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={currentHandle === EHandle.BottomLeft ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => onHandleMouseOver(EHandle.BottomLeft)}
        onMouseOut={() => onHandleMouseOut()}
      />
      {/* Left */}
      <Rectangle
        x={state.x - WIDTH_TRANSFORM - HANDLE_TRANSFORM}
        y={state.y - HANDLE_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={currentHandle === EHandle.Left ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => onHandleMouseOver(EHandle.Left)}
        onMouseOut={() => onHandleMouseOut()}
      />
    </>
  );
}
