import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import ControlBar from '@/components/ImageEditor/ControlBar';
import useSize from '@/hooks/UseSize';
import { MouseEvent, useEffect, useRef, useState } from 'react'; // import LayoutToolController from '@/components/ImageEditor/LayoutTool/LayoutToolController';
import { Container, Stage } from '@pixi/react'; // import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import Ellipse from '@/components/ImageEditor/LayoutToolPixi/Ellipse';
import LayerList from '@/components/ImageEditor/LayerList';
import PixiTransformer from '@/components/ImageEditor/PixiTransformer';
import { EHandle, ELayerType, ETool } from '@/types/ImageEditor';
import Rectangle from '@/components/ImageEditor/LayoutToolPixi/Rectangle';
import { MOUSE_LEFT, MOUSE_MIDDLE } from '@/common/Mouse';
import { FederatedPointerEvent } from 'pixi.js';
import ZoomControl from '@/components/ImageEditor/ZoomControl';
import { MoveHorizontal } from 'lucide-react';
import Button from '@/components/Buttton';

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
  const [tool, setTool] = useState<ETool>(ETool.Pointer);
  // layoutToolController.useController();
  controller.useController();
  const { state, transformController, documentController } = controller;

  transformController.useController();
  documentController.useController();
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage>(null);
  const size = useSize(stageWrapperRef);

  function onCanvasMouseDown(e: MouseEvent<HTMLCanvasElement>) {
    if (e.button === MOUSE_LEFT) {
      if (handle) {
        setAction(handle);
        transformController.onMouseDown(e, controller.state.transform);
      } else if (transformMove) {
        setAction(EHandle.Move);
        transformController.onMouseDown(e, controller.state.transform);
      } else {
        setAction(null);
        controller.onDeselect();
      }
    } else if (e.button === MOUSE_MIDDLE) {
      setMiddleMouseDown(true);
      documentController.onMouseDown(e);
    }
  }

  function onClickFitToView() {
    if (stageWrapperRef.current) {
      const rect = stageWrapperRef.current.getBoundingClientRect();

      documentController.onFitToView(rect.width, rect.height);
    }
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

      onClickFitToView();

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
        setAction(null);
      }
    };

    // @ts-ignore
    // defs have to be wrong
    window.addEventListener('mouseup', fn);
    // @ts-ignore
    return () => window.removeEventListener('mouseup', fn);
  }, []);

  return (
    <div className="">
      <div className="flex">
        <div className="grow">
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
              onMouseDown={onCanvasMouseDown}
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
                if (e.buttons === 1 && action) {
                  transformController.onMouseMove(
                    e,
                    action,
                    documentController.state,
                    controller.state.transform
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
                  if (!v.isVisible) {
                    return null;
                  }

                  switch (v.type) {
                    case ELayerType.Ellipse:
                      return (
                        <Container
                          key={v.id}
                          angle={v.angle}
                          x={v.x}
                          y={v.y}
                          eventMode={!v.locked ? 'dynamic' : 'auto'}
                        >
                          <Ellipse
                            key={v.id}
                            x={0}
                            y={0}
                            width={v.width}
                            height={v.height}
                            fillColor={v.fillColor}
                            fillAlpha={v.fillAlpha}
                            borderColor={v.borderColor}
                            borderWidth={v.borderWidth}
                            eventMode={!v.locked ? 'dynamic' : 'auto'}
                            onMouseDown={(
                              e: FederatedPointerEvent | undefined,
                            ) => {
                              console.log('onMouseDown');
                              e?.preventDefault();
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
                {controller.state.selectedLayers.length > 0 && (
                  <PixiTransformer
                    controller={transformController}
                    transform={controller.state.transform}
                    onHandleMouseOver={(handle) => setHandle(handle)}
                    onHandleMouseOut={() => setHandle(null)}
                    currentHandle={handle}
                    documentState={documentController.state}
                    onMouseOver={() => setTransformMove(true)}
                    onMouseOut={() => setTransformMove(false)}
                  />
                )}
              </Container>
            </Stage>
          </div>
          {/* info bar*/}
          <div className="w-full p-3 flex gap-x-3">
            <ZoomControl
              scale={documentController.state.scaleInt}
              onChange={documentController.onChangeScale}
              onClickZoomIn={documentController.onZoomIn}
              onClickZoomOut={documentController.onZoomOut}
            />
            <Button
              variant="blue"
              onClick={onClickFitToView}
              isInline
            >
              <MoveHorizontal />
              <span className="ms-1">Fit To View</span>
            </Button>
          </div>
        </div>
        {/* layers */}
        <div className="shrink-0">
          <LayerList controller={controller} />
        </div>
      </div>
      {/* bottom controls */}
      <ControlBar
        activeTool={tool}
        onChangeTool={setTool}
      />
    </div>
  );
}
