import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import ControlBar from '@/components/ImageEditor/ControlBar';
import useSize from '@/hooks/UseSize';
import { useEffect, useRef, useState } from 'react'; // import LayoutToolController from '@/components/ImageEditor/LayoutTool/LayoutToolController';
import { Container, Stage } from '@pixi/react'; // import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import Ellipse from '@/components/ImageEditor/LayoutToolPixi/Ellipse';
import LayerList from '@/components/ImageEditor/LayerList';
import PixiTransformer from '@/components/ImageEditor/PixiTransformer';
import { EHandle, ELayerType } from '@/types/ImageEditor';
import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import { MOUSE_LEFT, MOUSE_MIDDLE } from '@/common/Mouse';
import { FederatedPointerEvent } from 'pixi.js';
import ZoomControl from '@/components/ImageEditor/ZoomControl';

interface IProps {
  controller: ImageEditorController;
}

export default function ImageEditor({ controller }: IProps) {
  // const [layoutToolController] = useState(new LayoutToolController());
  // const [transformerController] = useState(new PixiTransformerController());
  // const [mouseDown, setMouseDown] = useState(false);
  const [middleMouseDown, setMiddleMouseDown] = useState(false);
  const [handle, setHandle] = useState<EHandle | null>(null);
  const [transformMove, setTransformMove] = useState(false);
  const [action, setAction] = useState<EHandle | null>(null);
  // layoutToolController.useController();
  controller.useController();
  const { state, transformController, documentController } = controller;

  transformController.useController();
  documentController.useController();
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage>(null);
  const size = useSize(stageWrapperRef);

  function onMouseDown() {
    // setMouseDown(true);
    if (handle) {
      setAction(handle);
    } else if (transformMove) {
      setAction(EHandle.Move);
    } else {
      setAction(null);
    }
  }

  function onMouseUp() {
    // setMouseDown(false);
    setHandle(null);
    setAction(null);
  }

  useEffect(() => {
    if (stageWrapperRef.current) {
      // react uses passive listeners for mouse wheel so
      // in order to preventDefault() the mouse wheel events
      // we have to go through this extra step of setting up
      // our own eventListener that is not passive
      stageWrapperRef?.current?.addEventListener(
        'wheel',
        documentController.onWheel,
        { passive: false },
      );

      return () =>
        stageWrapperRef?.current?.removeEventListener(
          'wheel',
          documentController.onWheel,
        );
    }
  }, [stageWrapperRef.current]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (e.button === MOUSE_MIDDLE) {
        setMiddleMouseDown(false);
      } else if (e.button === MOUSE_LEFT) {
        onMouseUp();
      }
    };

    window.addEventListener('mouseup', fn);
    return () => window.removeEventListener('mouseup', fn);
  }, []);

  console.log(transformController.state);

  return (
    <div className="">
      <div className="flex">
        <div>
          <div
            ref={stageWrapperRef}
            className="grow"
          >
            <Stage
              ref={stageRef}
              width={size?.width}
              height={size?.height}
              className="max-w-full"
              options={{
                background: 0xcbd5e1,
                antialias: true,
                powerPreference: 'high-performance',
              }}
              onMouseDown={(e) => {
                if (e.button === MOUSE_LEFT) {
                  onMouseDown();
                  transformController.onMouseDown(e);
                } else if (e.button === MOUSE_MIDDLE) {
                  setMiddleMouseDown(true);
                  documentController.onMouseDown(e);
                }
              }}
              // onMouseUp={(e) => {
              //   if (e.button === MOUSE_LEFT) {
              //     onMouseUp();
              //   } else if (e.button === MOUSE_MIDDLE) {
              //     setMiddleMouseDown(false);
              //     return;
              //   }
              //   // transformerController.onMouseUp();
              // }}
              onMouseMove={(e) => {
                // const mousePoint: IVector2 = getCanvasVector(e);
                // console.log(mousePoint);
                // console.log('onMouseMove', e.buttons);
                // if (e.buttons === 1 && action) {
                if (e.buttons === 1 && action) {
                  transformController.onMouseMove(
                    e,
                    action,
                    documentController.state,
                  );
                } else if (middleMouseDown) {
                  documentController.onMouseMove(e);
                }
              }}
              // onWheel={(e) => {
              //   e.preventDefault();
              //   documentController.onWheel(e);
              // }}
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
                scale={documentController.state.scale}
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
                          eventMode={!v.state.locked ? 'dynamic' : 'auto'}
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
                            eventMode={!v.state.locked ? 'dynamic' : 'auto'}
                            // onClick={(e: MouseEvent) => {
                            //   if (e.button === MOUSE_LEFT) {
                            //     controller.onClickLayer(i);
                            //   }
                            // }}
                            onMouseDown={(
                              e: FederatedPointerEvent | undefined,
                            ) => {
                              console.log('onMouseDown');
                              if (e?.button === MOUSE_LEFT) {
                                controller.onClickLayer(i);
                              }
                              // console.log(e);
                            }}
                          />
                        </Container>
                      );
                  }
                })}
                {transformController.state?.isVisible && (
                  <PixiTransformer
                    controller={transformController}
                    onHandleMouseOver={(handle) => setHandle(handle)}
                    onHandleMouseOut={() => setHandle(null)}
                    currentHandle={handle}
                    documentState={documentController.state}
                    onMouseOver={() => setTransformMove(true)}
                    onMouseOut={() => setTransformMove(false)}
                  />
                )}
                {/*<Rectangle*/}
                {/*  x={transformController.state.mousePointOffset.x}*/}
                {/*  y={transformController.state.mousePointOffset.y}*/}
                {/*  width={10}*/}
                {/*  height={10}*/}
                {/*  fill={'0x0060FF'}*/}
                {/*  borderColor="0x000000"*/}
                {/*  borderWidth={1}*/}
                {/*/><Rectangle*/}
                {/*  x={transformController.state.downX}*/}
                {/*  y={transformController.state.downY}*/}
                {/*  width={10}*/}
                {/*  height={10}*/}
                {/*  fill={'0x03F300'}*/}
                {/*  borderColor="0x000000"*/}
                {/*  borderWidth={1}*/}
                {/*/>*/}
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
            {/* info bar */}
          </div>
          <div className="w-full p-3">
            <ZoomControl
              scale={documentController.state.scale}
              onChange={documentController.onChangeScale}
              onClickZoomIn={documentController.onZoomIn}
              onClickZoomOut={documentController.onZoomOut}
            />
          </div>
        </div>
        <div className="shrink-0">
          <LayerList controllers={state.layers} />
        </div>
      </div>
      <ControlBar controller={controller} />
    </div>
  );
}
