import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import ControlBar from '@/components/ImageEditor/ControlBar';
import useSize from '@/hooks/UseSize';
import { useRef, useState } from 'react';
import LayoutToolController from '@/components/ImageEditor/LayoutTool/LayoutToolController';
import LayoutTool from '@/components/ImageEditor/LayoutTool';
import { Stage } from '@pixi/react';
import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import Ellipse from '@/components/ImageEditor/LayoutToolPixi/Ellipse';
import LayerList from '@/components/ImageEditor/LayerList';

interface IProps {
  controller: ImageEditorController;
}

export default function ImageEditor({ controller }: IProps) {
  const [layoutToolController] = useState(new LayoutToolController());
  layoutToolController.useController();
  controller.useController();
  const stageRef = useRef(null);
  const size = useSize(stageRef);

  console.log(size);

  const state = controller.state;

  return (
    <div className="flex flex-col">
      <div className="flex grow">
        <div
          ref={stageRef}
          className="w-full h-96 grow"
        >
          <Stage
            width={size?.width}
            height={size?.height}
            options={{ background: 0xffffff }}
            onMouseDown={(e) => layoutToolController.onMouseDown(e)}
            onMouseUp={() => layoutToolController.onMouseUp()}
            onMouseMove={(e) => layoutToolController.onMouseMove(e)}
          >
            <Rectangle
              x={0}
              y={0}
              width={1000}
              height={1000}
              fill="0xffffff"
            />
            <Ellipse
              x={layoutToolController.state.x }
              y={layoutToolController.state.y}
              width={400}
              height={200}
              fill="0x338948"
              borderColor="0x0005FF"
              borderWidth={2}
              // onClick={() => alert('clicked')}
            />
            <LayoutTool controller={layoutToolController} />
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
