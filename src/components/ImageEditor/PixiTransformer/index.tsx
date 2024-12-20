import { Container } from '@pixi/react';
import { PropsWithChildren } from 'react';
import PixiTransformerController from '@/components/ImageEditor/PixiTransformer/PixiTransformerController';
import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import { EHandle } from '@/types/ImageEditor';
import {
  IDocumentControllerState
} from '@/components/ImageEditor/DocumentController';

interface IProps extends PropsWithChildren {
  controller: PixiTransformerController;
  onHandleMouseOver: (handle: EHandle) => void;
  onHandleMouseOut: () => void;
  currentHandle: EHandle | null;
  documentState: IDocumentControllerState
}

// interface IBoundingBox {
//   width: number;
//   height: number;
//   x: number;
//   y: number;
// }

// const BORDER_WIDTH = 1;
// const HANDLE_SIZE = 10;
// const HANDLE_TRANSFORM = HANDLE_SIZE / 2;

export default function PixiTransformer({
  controller,
  onHandleMouseOver,
  onHandleMouseOut,
  currentHandle,
                                          documentState
  // children,
}: IProps) {
  // const ref = useRef<TContainer<DisplayObject>>(null);
  // const [bounds, setBounds] = useState<IBoundingBox>({
  //   height: 0,
  //   width: 0,
  //   x: 0,
  //   y: 0,
  // });
  //
  // useEffect(() => {
  //   if (ref.current) {
  //     const { x, y, width, height } = ref.current.getLocalBounds();
  //
  //     setBounds({
  //       x,
  //       y,
  //       width,
  //       height,
  //     });
  //   }
  // }, [children, ref.current]);

  const { state } = controller;
  const WIDTH_TRANSFORM = state.width / 2;
  const HEIGHT_TRANSFORM = state.height / 2;
  const BORDER_WIDTH = documentState.ratio;
  const HANDLE_SIZE = 10 * documentState.ratio;

  return (
    <>
      <Container
        angle={state.angle}
        x={state.x}
        y={state.y}
      >
        <Rectangle
          x={0}
          y={0}
          width={state?.width || 0}
          height={state?.height || 0}
          fill="0xFFFFFF"
          fillAlpha={.00000001}
          borderColor="0x000000"
          borderWidth={BORDER_WIDTH}
          onMouseEnter={controller.onMouseEnter}
          onMouseOut={controller.onMouseOut}
          interactive
        />
        {/* Rotation point */}
        <Rectangle
          x={0}
          y={0}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fill={'0xFF0000'}
          borderColor="0x000000"
          borderWidth={BORDER_WIDTH}
        />
        {/* Top Left */}
        <Rectangle
          x={0 - WIDTH_TRANSFORM}
          y={0 - HEIGHT_TRANSFORM}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fill={currentHandle === EHandle.TopLeft ? '0x000000' : '0xFFFFFF'}
          borderColor="0x000000"
          borderWidth={BORDER_WIDTH}
          interactive
          onMouseOver={() => onHandleMouseOver(EHandle.TopLeft)}
          onMouseOut={() => onHandleMouseOut()}
        />
        <Rectangle
          x={0}
          y={0 - HEIGHT_TRANSFORM - HANDLE_SIZE * 3}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fill={currentHandle === EHandle.Rotate ? '0x000000' : '0xFFFFFF'}
          borderColor="0x000000"
          borderWidth={BORDER_WIDTH}
          interactive
          onMouseOver={() => onHandleMouseOver(EHandle.Rotate)}
          onMouseOut={() => onHandleMouseOut()}
        />
        {/* Top */}
        <Rectangle
          x={0}
          y={0 - HEIGHT_TRANSFORM}
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
          x={0 + WIDTH_TRANSFORM}
          y={0 - HEIGHT_TRANSFORM}
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
          x={0 + WIDTH_TRANSFORM}
          y={0}
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
          x={0 + WIDTH_TRANSFORM}
          y={0 + HEIGHT_TRANSFORM}
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
          x={0}
          y={0 + HEIGHT_TRANSFORM}
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
          x={0 - WIDTH_TRANSFORM}
          y={0 + HEIGHT_TRANSFORM}
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
          x={0 - WIDTH_TRANSFORM}
          y={0}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fill={currentHandle === EHandle.Left ? '0x000000' : '0xFFFFFF'}
          borderColor="0x000000"
          borderWidth={BORDER_WIDTH}
          interactive
          onMouseOver={() => onHandleMouseOver(EHandle.Left)}
          onMouseOut={() => onHandleMouseOut()}
        />
      </Container>
    </>
  );
}
