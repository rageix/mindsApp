import Button from '@/components/Buttton';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ILayer } from '@/types/ImageEditor';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import { cn } from '@/util/Cn';

interface IProps {
  layer: ILayer;
  index: number;
  controller: ImageEditorController;
}

export default function LayerListItem({ layer, index, controller }: IProps) {
  return (
    <div className="flex divide-gray-900 divide-x-2">
      <div className="shrink-0">
        <Button
          variant="gray"
          onClick={() => controller.onClickLayerVisibility(index)}
          className={cn(layer.isSelected ? '!bg-gray-500' : null)}
        >
          {layer.isVisible ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>
      <div className="grow flex items-center">
        <Button
          variant="gray"
          className={cn(
            '!justify-start',
            layer.isSelected ? '!bg-gray-500' : null,
          )}
          onClick={() => controller.onClickLayer(index)}
        >
          {layer.name}
        </Button>
      </div>
    </div>
  );
}
