import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import ControlBar from '@/components/ImageEditor/ControlBar';
import useSize from '@/hooks/UseSize';
import { useRef, useState } from 'react'; // import LayoutToolController from '@/components/ImageEditor/LayoutTool/LayoutToolController';
// import LayoutTool from '@/components/ImageEditor/LayoutTool';
import { Stage } from '@pixi/react'; // import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import Ellipse from '@/components/ImageEditor/LayoutToolPixi/Ellipse';
import LayerList from '@/components/ImageEditor/LayerList';
import PixiTransformerController from '@/components/ImageEditor/PixiTransformer/PixiTransformerController';
import PixiTransformer from '@/components/ImageEditor/PixiTransformer';
import { EHandle } from '@/types/ImageEditor';
// import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';


interface IProps {
  controller: ImageEditorController;
}

export default function ImageEditor({ controller }: IProps) {
  // const [layoutToolController] = useState(new LayoutToolController());
  const [transformerController] = useState(new PixiTransformerController());
  const [mouseDown, setMouseDown] = useState(false);
  const [handle, setHandle] = useState<EHandle | null>(null);
  transformerController.useController();
  // layoutToolController.useController();
  controller.useController();
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage>(null);
  const size = useSize(stageWrapperRef);

  function onMouseDown() {
    setMouseDown(true);
  }

  function onMouseUp() {
    setMouseDown(false);
    setHandle(null);
  }

  function onHandleMouseOver(handle: EHandle) {
    if(!mouseDown) {
      setHandle(handle);
    }
  }

  function onHandleMouseOut() {
    if (!mouseDown) {
      setHandle(null);
    }
  }

  // console.log(size);

  const state = controller.state;

  return (
    <div className="flex flex-col">
      <div className="flex grow">
        <div
          ref={stageWrapperRef}
          className="w-full h-96 grow"
        >
          <Stage
            ref={stageRef}
            width={size?.width}
            height={size?.height}
            options={{ background: 0xffffff }}
            onMouseDown={(e) => {
              onMouseDown();
              transformerController.onMouseDown(e);
            }}
            onMouseUp={() => {
              onMouseUp();
              // transformerController.onMouseUp();
            }}
            onMouseMove={(e) => {
              if (mouseDown) {
                transformerController.onMouseMove(e, handle);
              }
            }}
            // onMouseMoveUp={transformerController.onMouseUpOutside}

            // onMouseDown={(e) => layoutToolController.onMouseDown(e)}
            // onMouseUp={() => layoutToolController.onMouseUp()}
            // onMouseMove={(e) => layoutToolController.onMouseMove(e)}
          >
            {/*<Rectangle*/}
            {/*  x={0}*/}
            {/*  y={0}*/}
            {/*  width={1000}*/}
            {/*  height={1000}*/}
            {/*  fill="0xffffff"*/}
            {/*/>*/}
            <PixiTransformer
              controller={transformerController}
              onHandleMouseOver={onHandleMouseOver}
              onHandleMouseOut={onHandleMouseOut}
              currentHandle={handle}
            >
              <Ellipse
                x={0}
                y={0}
                width={transformerController.state.width}
                height={transformerController.state.height}
                fill="0x338948"
                borderColor="0x0005FF"
                borderWidth={2}
                // onClick={() => alert('clicked')}
                interactive
              />
              {/*<Rectangle*/}
              {/*  x={transformerController.state.x}*/}
              {/*  y={transformerController.state.y}*/}
              {/*  width={transformerController.state.width}*/}
              {/*  height={transformerController.state.height}*/}
              {/*  fill="0x338948"*/}
              {/*  borderColor="0x0005FF"*/}
              {/*  borderWidth={2}*/}
              {/*  // onClick={() => alert('clicked')}*/}
              {/*interactive*/}
              {/*/>*/}
            </PixiTransformer>
            {/*<LayoutTool controller={layoutToolController} />*/}
            {/*<Layer*/}
            {/*  onMouseDown={(e) => layoutToolController.onMouseDown(e)}*/}
            {/*  onMouseUp={() => layoutToolController.onMouseUp()}*/}
            {/*  onMouseMove={(e) => layoutToolController.onMouseMove(e)}*/}
            {/*>*/}
            {/*  <Rect*/}
            {/*    x={0}*/}
            {/*    y={0}*/}
            {/*    width={1000}*/}
            {/*    height={1000}*/}
            {/*    fill="white"*/}
            {/*  />*/}
            {/*  <LayoutTool controller={layoutToolController} />*/}

            {/*{controller.state.layers.map((v) => {*/}
            {/*  switch (v.defaultState.type) {*/}
            {/*    case ELayerType.Circle:*/}
            {/*      return (*/}
            {/*        <CircleElement controller={v as CircleLayerController} />*/}
            {/*      );*/}
            {/*  }*/}
            {/*})}*/}

            {/*<Circle*/}
            {/*  x={10}*/}
            {/*  y={10}*/}
            {/*  width={10}*/}
            {/*  height={10}*/}
            {/*  fill="red"*/}
            {/*/>*/}
            {/*<Text*/}
            {/*  text="Some text on canvas"*/}
            {/*  fontSize={15}*/}
            {/*  fill="#000"*/}
            {/*/>*/}
            {/*</Layer>*/}
          </Stage>
        </div>
        <div className="shrink-0">
          <LayerList controllers={state.layers} />
        </div>
      </div>
      <ControlBar controller={controller} />
    </div>
  );
}
