import Rectangle from '../Rectangle';
import { Container } from '@pixi/react';
import { ETool } from '@/types/ImageEditor';
import Ellipse from '../Ellipse';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';

const BORDER_COLOR = "0x3b82f6";

interface IProps {
  controller: ImageEditorController;
}

export default function Layout({ controller }: IProps) {
  const { layout, style, tool } = controller.state;
  const ratio = controller.documentController.state.ratio;

  if (!layout) {
    return null;
  }

  return (
    <>
      <Container
        x={layout.x}
        y={layout.y}
      >
        {/* Selection outline */}
        <Rectangle
          x={0}
          y={0}
          width={layout.width}
          height={layout.height}
          fillColor="0xFFFFFF"
          fillAlpha={0.00000001}
          borderColor={BORDER_COLOR}
          borderWidth={ratio}
        />
        {tool === ETool.Ellipse && (
          <Ellipse
            x={0}
            y={0}
            width={layout.width}
            height={layout.height}
            {...style}
          />
        )}
        {tool === ETool.Box && (
          <Rectangle
            x={0}
            y={0}
            width={layout.width}
            height={layout.height}
            {...style}
          />
        )}
      </Container>
    </>
  );
}
