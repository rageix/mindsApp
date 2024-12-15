import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import { CircleIcon, ImageIcon, TextIcon } from 'lucide-react';
import ControlBarIcon from '@/components/ImageEditor/ControlBar/Icon';

interface IProps {
  controller: ImageEditorController;
}

export default function ControlBar({ controller }: IProps) {
  return (
    <div className="shrink-0 flex space-x-3 overflow-hidden overscroll-x-auto p-3 bg-gray-600">
      <ControlBarIcon
        title="Text"
        icon={<TextIcon className="w-full h-full" />}
        onClick={controller.onClickNewTextLayer}
      />
      <ControlBarIcon
        title="Image"
        icon={<ImageIcon className="w-full h-full" />}
        onClick={controller.onClickNewImageLayer}
      />
      <ControlBarIcon
        title="Circle"
        icon={<CircleIcon className="w-full h-full" />}
        onClick={controller.onClickNewCircleLayer}
      />
    </div>
  );
}
