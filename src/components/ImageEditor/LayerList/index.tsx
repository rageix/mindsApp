import LayerListItem from '@/components/ImageEditor/LayerList/LayerListItem';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import Tabs from '@/components/ImageEditor/Tabs';
import LayerTransformForm from '@/components/ImageEditor/LayerTransformForm';
import { useMemo, useRef } from 'react';
import Button from '@/components/Buttton';
import { Trash } from 'lucide-react';
import useSize from '@/hooks/UseSize';

interface IProps {
  controller: ImageEditorController;
}

export default function LayerList({ controller }: IProps) {
  const layers = useMemo(
    () => controller.state.layers.toReversed(),
    [controller.state.layers],
  );

  const layersListRef = useRef<HTMLDivElement>(null);
  const size = useSize(layersListRef);

  return (
    <div className="w-64 bg-gray-700 h-full flex flex-col">
      <div className="shrink-0">
        <Tabs controller={controller} />
      </div>
      <div
        ref={layersListRef}
        className="relative divide-gray-900 divide-y border-t border-b border-gray-900 grow mt-3"
      >
        <div
          className="max-h-full overflow-auto"
          style={{ maxHeight: size?.height || 0 }}
        >
          {layers.map((v, i) => (
            <LayerListItem
              key={v.id}
              layer={v}
              index={layers.length - 1 - i}
              controller={controller}
            />
          ))}
        </div>
      </div>
      <div className="shrink-0 flex justify-end gap-x-3">
        <Button
          variant="blue"
          isInline
          onClick={controller.onDeleteSelected}
        >
          <Trash />
        </Button>
      </div>
      <div className="shrink-0 p-3">
        <LayerTransformForm controller={controller} />
      </div>
    </div>
  );
}
