import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import ControlBar from '@/components/ImageEditor/ControlBar';
import useSize from '@/hooks/UseSize';
import { useEffect, useRef, useState } from 'react'; // import LayoutToolController from '@/components/ImageEditor/LayoutTool/LayoutToolController';
// import LayoutTool from '@/components/ImageEditor/LayoutTool';
import { Container, Stage } from '@pixi/react'; // import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import Ellipse from '@/components/ImageEditor/LayoutToolPixi/Ellipse';
import LayerList from '@/components/ImageEditor/LayerList';
import PixiTransformer from '@/components/ImageEditor/PixiTransformer';
import { EHandle, ELayerType } from '@/types/ImageEditor';
import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle'; // import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';

// import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';

interface IProps {
  controller: ImageEditorController;
}

export default function ImageEditor({ controller }: IProps) {
  // const [layoutToolController] = useState(new LayoutToolController());
  // const [transformerController] = useState(new PixiTransformerController());
  const [mouseDown, setMouseDown] = useState(false);
  const [middleMouseDown, setMiddleMouseDown] = useState(false);
  const [handle, setHandle] = useState<EHandle | null>(null);
  // layoutToolController.useController();
  controller.useController();
  const { state, transformController, documentController } = controller;

  transformController.useController();
  documentController.useController();
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const size = useSize(stageWrapperRef);

  function onMouseDown() {
    setMouseDown(true);
  }

  function onMouseUp() {
    setMouseDown(false);
    setHandle(null);
  }

  function onHandleMouseOver(handle: EHandle) {
    if (!mouseDown) {
      setHandle(handle);
    }
  }

  function onHandleMouseOut() {
    if (!mouseDown) {
      setHandle(null);
    }
  }

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      console.log('onMouseUp', e.button);
      if (e.button === 1) {
        setMiddleMouseDown(false);
        return;
      }
      onMouseUp();
    }

    window.addEventListener('mouseup',fn);

    return () => window.removeEventListener('mouseup', fn);
  }, []);

  return (
    <div className="">
      <div className="flex">
        <div
          ref={stageWrapperRef}
          className="grow"
        >
          <Stage
            // width={size?.width}
            // height={size?.height}
            className="max-w-full"
            options={{ background: 0xcbd5e1 }}
            onMouseDown={(e) => {
              if (e.button === 1) {
                console.log('middle down');
                setMiddleMouseDown(true);
                documentController.onMouseDown(e);
                return;
              }
              onMouseDown();
              transformController.onMouseDown(e);
            }}
            // onMouseUp={(e) => {
            //   if (e.button === 1) {
            //     setMiddleMouseDown(false);
            //     return;
            //   }
            //   onMouseUp();
            //
            //   // transformerController.onMouseUp();
            // }}
            onMouseMove={(e) => {
              if (middleMouseDown) {
                documentController.onMouseMove(e);
                return;
              }
              if (mouseDown) {
                transformController.onMouseMove(e, handle);
              }
            }}
            // onMouseOut={() => {
            //   setMiddleMouseDown(false);
            //   setMouseDown(false);
            // }}

            // onMouseMoveUp={transformerController.onMouseUpOutside}

            // onMouseDown={(e) => layoutToolController.onMouseDown(e)}
            // onMouseUp={() => layoutToolController.onMouseUp()}
            // onMouseMove={(e) => layoutToolController.onMouseMove(e)}
          >
            <Container
              x={documentController.state.x}
              y={documentController.state.y}
            >
              <Rectangle
                x={documentController.state.width / 2}
                y={documentController.state.height / 2}
                width={documentController.state.width}
                height={documentController.state.height}
                fill="0xffffff"
              />
              {state.layers.map((v, i) => {
                switch (v.state?.type) {
                  case ELayerType.Ellipse:
                    return (
                      <Container
                        key={v.state.id}
                        angle={v.state.angle}
                        // width={bounds.width}
                        // height={bounds.height}
                        x={v.state.x}
                        y={v.state.y}
                        interactive
                      >
                        <Ellipse
                          key={v.state.id}
                          x={0}
                          y={0}
                          width={v.state.width}
                          height={v.state.height}
                          fillColor={v.state.fillColor}
                          fillAlpha={v.state.fillAlpha}
                          borderColor={v.state.borderColor}
                          borderWidth={v.state.borderWidth}
                          // angle={v.state.angle}
                          interactive={!v.state.locked}
                          onClick={() => controller.onClickLayer(i)}
                        />
                      </Container>
                    );
                }
              })}
              {transformController.state?.isVisible && (
                <PixiTransformer
                  controller={transformController}
                  onHandleMouseOver={onHandleMouseOver}
                  onHandleMouseOut={onHandleMouseOut}
                  currentHandle={handle}
                />
              )}
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
            </Container>
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
