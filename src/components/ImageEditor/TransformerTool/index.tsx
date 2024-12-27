import { Container } from '@pixi/react';
import { PropsWithChildren } from 'react';
import TransformerToolController from '@/components/ImageEditor/TransformerTool/TransformerToolController';
import Rectangle from '../Rectangle';
import { EHandle } from '@/types/ImageEditor';
import { IDocumentControllerState } from '@/components/ImageEditor/DocumentController';
import { ILayerTransform } from '@/types/LayerTransform';


const BORDER_COLOR = "0x3b82f6";

interface IProps extends PropsWithChildren {
  controller: TransformerToolController;
  transform: ILayerTransform;
  onHandleMouseOver: (handle: EHandle) => void;
  onHandleMouseOut: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
  currentHandle: EHandle | null;
  documentState: IDocumentControllerState;
}

export default function PixiTransformer({
  transform,
  onHandleMouseOver,
  onHandleMouseOut,
  currentHandle,
  documentState,
  onMouseOver,
  onMouseOut,
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

  const WIDTH_TRANSFORM = transform.width / 2;
  const HEIGHT_TRANSFORM = transform.height / 2;
  const BORDER_WIDTH = documentState.ratio;
  const HANDLE_SIZE = 10 * documentState.ratio;

  return (
    <>
      <Container
        angle={transform.angle}
        x={transform.x}
        y={transform.y}
      >
        {/* Selection outline */}
        <Rectangle
          x={0}
          y={0}
          width={transform?.width || 0}
          height={transform?.height || 0}
          fillColor="0xFFFFFF"
          fillAlpha={0.00000001}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          eventMode="dynamic"
        />
        {/* Rotation point */}
        <Rectangle
          x={0}
          y={0}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={'0xFF0000'}
          borderColor="0x000000"
          borderWidth={BORDER_WIDTH}
        />
        {/* Top Left */}
        <Rectangle
          x={0 - WIDTH_TRANSFORM}
          y={0 - HEIGHT_TRANSFORM}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={currentHandle === EHandle.TopLeft ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
          onMouseOver={() => onHandleMouseOver(EHandle.TopLeft)}
          onMouseOut={() => onHandleMouseOut()}
        />
        <Rectangle
          x={0}
          y={0 - HEIGHT_TRANSFORM - HANDLE_SIZE * 3}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={currentHandle === EHandle.Rotate ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
          onMouseOver={() => onHandleMouseOver(EHandle.Rotate)}
          onMouseOut={() => onHandleMouseOut()}
        />
        {/* Top */}
        <Rectangle
          x={0}
          y={0 - HEIGHT_TRANSFORM}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={currentHandle === EHandle.Top ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
          onMouseOver={() => onHandleMouseOver(EHandle.Top)}
          onMouseOut={() => onHandleMouseOut()}
        />
        {/* Top Right */}
        <Rectangle
          x={0 + WIDTH_TRANSFORM}
          y={0 - HEIGHT_TRANSFORM}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={currentHandle === EHandle.TopRight ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
          onMouseOver={() => onHandleMouseOver(EHandle.TopRight)}
          onMouseOut={() => onHandleMouseOut()}
        />
        {/* Right */}
        <Rectangle
          x={0 + WIDTH_TRANSFORM}
          y={0}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={currentHandle === EHandle.Right ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
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
          fillColor={currentHandle === EHandle.BottomRight ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
          onMouseOver={() => onHandleMouseOver(EHandle.BottomRight)}
          onMouseOut={() => onHandleMouseOut()}
        />
        {/* Bottom */}
        <Rectangle
          x={0}
          y={0 + HEIGHT_TRANSFORM}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={currentHandle === EHandle.Bottom ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
          onMouseOver={() => onHandleMouseOver(EHandle.Bottom)}
          onMouseOut={() => onHandleMouseOut()}
        />
        {/* Bottom Left */}
        <Rectangle
          x={0 - WIDTH_TRANSFORM}
          y={0 + HEIGHT_TRANSFORM}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={currentHandle === EHandle.BottomLeft ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
          onMouseOver={() => onHandleMouseOver(EHandle.BottomLeft)}
          onMouseOut={() => onHandleMouseOut()}
        />
        {/* Left */}
        <Rectangle
          x={0 - WIDTH_TRANSFORM}
          y={0}
          width={HANDLE_SIZE}
          height={HANDLE_SIZE}
          fillColor={currentHandle === EHandle.Left ? '0x000000' : '0xFFFFFF'}
          borderColor={BORDER_COLOR}
          borderWidth={BORDER_WIDTH}
          eventMode="dynamic"
          onMouseOver={() => onHandleMouseOver(EHandle.Left)}
          onMouseOut={() => onHandleMouseOut()}
        />
      </Container>
    </>
  );
}
