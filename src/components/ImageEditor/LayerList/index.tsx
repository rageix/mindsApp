import LayerListItem from '@/components/ImageEditor/LayerList/LayerListItem';
import { TLayerControllers } from '@/types/ImageEditor';

interface IProps {
  controllers: TLayerControllers[];
}

export default function LayerList({ controllers }: IProps) {
  // controllers.forEach((v) => console.log(v));

  return (
    <div className="w-64 bg-gray-700 h-full">
      <div>layer controls</div>
      <div>
        {controllers.map((v) => (
          <LayerListItem
            key={v.state?.id || v.defaultState?.id}
            controller={v}
          />
        ))}
      </div>
    </div>
  );
}
