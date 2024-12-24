import LayerListItem from '@/components/ImageEditor/LayerList/LayerListItem';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import Tabs from '@/components/ImageEditor/Tabs';

interface IProps {
  controller: ImageEditorController;
}

export default function LayerList({ controller }: IProps) {

  return (
    <div className="w-64 bg-gray-700 h-full flex flex-col gap-y-3">
      <Tabs controller={controller}/>
      <div className="divide-gray-900 divide-y border-t border-b border-gray-900">
        {controller.state.layers.map((v, i) => (
          <LayerListItem
            key={v.id}
            layer={v}
            index={i}
            controller={controller}
          />
        ))}
      </div>
    </div>
  );
}
