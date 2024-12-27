import Button from '@/components/Buttton';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ILayer } from '@/types/ImageEditor';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import { cn } from '@/util/Cn';
import { useMemo } from 'react';

interface IProps {
  layer: ILayer;
  index: number;
  controller: ImageEditorController;
}

export default function LayerListItem({ layer, index, controller }: IProps) {
  const isSelected = useMemo(
    () => controller.state.selected.findIndex((v) => v === index) > -1,
    [controller.state.selected],
  );

  return (
    <div className="flex divide-gray-900 divide-x-2">
      <div className="shrink-0">
        <Button
          variant="gray"
          onClick={() => controller.onClickLayerVisibility(index)}
          className={cn(isSelected ? '!bg-gray-500' : null)}
        >
          {layer.isVisible ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>
      <div className="grow flex items-center">
        <Button
          variant="gray"
          className={cn('!justify-start', isSelected ? '!bg-gray-500' : null)}
          onClick={() => controller.onClickLayer(index)}
        >
          {layer.name}
        </Button>
      </div>
    </div>
  );
}
