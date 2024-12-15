import BaseLayerController from '@/components/ImageEditor/Layer/BaseLayerController';
import Button from '@/components/Buttton';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface IProps {
  controller: BaseLayerController<any>;
}

export default function LayerListItem({ controller }: IProps) {
  controller.useController();
  const state = controller.state;

  return (
    <div className="flex">
      <div className="shrink-0">
        <Button
          variant="text"
          onClick={controller.onClickVisible}
        >
          {state.visible ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>
      <div className="grow flex px-3 items-center">{state.name}</div>
    </div>
  );
}
