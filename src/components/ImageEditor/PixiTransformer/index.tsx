import { Container } from '@pixi/react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import PixiTransformerController, {
  EHandle
} from '@/components/ImageEditor/PixiTransformer/PixiTransformerController';
import { Container as TContainer, DisplayObject } from 'pixi.js';
import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';

interface IProps extends PropsWithChildren {
  controller: PixiTransformerController;
}

interface IBoundingBox {
  width: number;
  height: number;
}

const BORDER_WIDTH = 1;

export default function PixiTransformer({ controller, children }: IProps) {
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
  const HANDLE_SIZE = 10;
  const WIDTH_TRANSFORM = bounds.width / 2;
  const HEIGHT_TRANSFORM = HANDLE_SIZE / 2;

  return (
    <>
      <Container
        ref={ref}
        // position={[200, 150]}
        // width={200}
        // height={200}
        x={state.x}
        y={state.y}
        onmouseleave={controller.onMouseOut}
        onmouseenter={controller.onMouseEnter}
        // onmouseout={() => console.log('onmouseout')}
        onmousedown={controller.onMouseDown}
        onmouseup={controller.onMouseUp}
        onmousemove={controller.onMouseMove}
        onmouseupoutside={controller.onMouseUpOutside}
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
      {/* Top Left */}
      <Rectangle
        x={state.x - WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        y={state.y - WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={state.handle === EHandle.TopLeft ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => controller.onHandleMouseOver(EHandle.TopLeft)}
        onMouseOut={() => controller.onHandleMouseOut()}
      />
      {/* Top */}
      <Rectangle
        x={state.x}
        y={state.y - WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={state.handle === EHandle.Top ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => controller.onHandleMouseOver(EHandle.Top)}
        onMouseOut={() => controller.onHandleMouseOut()}
      />
      {/* Top Right */}
      <Rectangle
        x={state.x + WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        y={state.y - WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={state.handle === EHandle.TopRight ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => controller.onHandleMouseOver(EHandle.TopRight)}
        onMouseOut={() => controller.onHandleMouseOut()}
      />
      {/* Right */}
      <Rectangle
        x={state.x + WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        y={state.y}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={state.handle === EHandle.Right ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => {
         controller.onHandleMouseOver(EHandle.Right);
        }}
        onMouseOut={() => {
          controller.onHandleMouseOut();
        }}
      />
      {/* Bottom Left */}
      <Rectangle
        x={state.x - WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        y={state.y + WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={state.handle === EHandle.BottomRight ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => controller.onHandleMouseOver(EHandle.BottomRight)}
        onMouseOut={() => controller.onHandleMouseOut()}
      />
      {/* Bottom Left */}
      <Rectangle
        x={state.x}
        y={state.y + WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={state.handle === EHandle.Bottom ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => controller.onHandleMouseOver(EHandle.Bottom)}
        onMouseOut={() => controller.onHandleMouseOut()}
      />
      {/* Bottom Right */}
      <Rectangle
        x={state.x + WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        y={state.y + WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={state.handle === EHandle.BottomLeft ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => controller.onHandleMouseOver(EHandle.BottomLeft)}
        onMouseOut={() => controller.onHandleMouseOut()}
      />
      {/* Left */}
      <Rectangle
        x={state.x - WIDTH_TRANSFORM - HEIGHT_TRANSFORM}
        y={state.y - HEIGHT_TRANSFORM}
        width={HANDLE_SIZE}
        height={HANDLE_SIZE}
        fill={state.handle === EHandle.Left ? '0x000000' : '0xFFFFFF'}
        borderColor="0x000000"
        borderWidth={BORDER_WIDTH}
        interactive
        onMouseOver={() => controller.onHandleMouseOver(EHandle.Left)}
        onMouseOut={() => controller.onHandleMouseOut()}
      />
    </>
  );
}
