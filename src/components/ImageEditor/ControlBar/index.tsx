import {
  CircleIcon,
  ImageIcon,
  MousePointer,
  Square,
  TextIcon,
} from 'lucide-react';
import ControlBarIcon from '@/components/ImageEditor/ControlBar/Icon';
import { ETool } from '@/types/ImageEditor';

interface IProps {
  activeTool: ETool;
  onChangeTool: (value: ETool) => void;
}

export default function ControlBar({ activeTool, onChangeTool }: IProps) {
  return (
    <div className="shrink-0 flex space-x-3 overflow-hidden overscroll-x-auto p-3 bg-gray-600">
      <ControlBarIcon
        title="Pointer"
        icon={<MousePointer className="w-full h-full" />}
        onClick={() => onChangeTool(ETool.Pointer)}
        isActive={activeTool === ETool.Pointer}
      />
      <ControlBarIcon
        title="Text"
        icon={<TextIcon className="w-full h-full" />}
        onClick={() => onChangeTool(ETool.Text)}
        isActive={activeTool === ETool.Text}
      />
      <ControlBarIcon
        title="Image"
        icon={<ImageIcon className="w-full h-full" />}
        onClick={() => onChangeTool(ETool.Image)}
        isActive={activeTool === ETool.Image}
      />
      <ControlBarIcon
        title="Ellipse"
        icon={<CircleIcon className="w-full h-full" />}
        onClick={() => onChangeTool(ETool.Ellipse)}
        isActive={activeTool === ETool.Ellipse}
      />
      <ControlBarIcon
        title="Box"
        icon={<Square className="w-full h-full" />}
        onClick={() => onChangeTool(ETool.Box)}
        isActive={activeTool === ETool.Box}
      />
    </div>
  );
}
