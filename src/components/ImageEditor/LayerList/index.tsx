import LayerListItem from '@/components/ImageEditor/LayerList/LayerListItem';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import Tabs from '@/components/ImageEditor/Tabs';
import LayerTransformForm from '@/components/ImageEditor/LayerTransformForm';

interface IProps {
  controller: ImageEditorController;
}

export default function LayerList({ controller }: IProps) {

  return (
    <div className="w-64 bg-gray-700 h-full flex flex-col">
      <Tabs controller={controller}/>
      <div className="divide-gray-900 divide-y border-t border-b border-gray-900 grow overflow-y-scroll mt-3">
        {controller.state.layers.map((v, i) => (
          <LayerListItem
            key={v.id}
            layer={v}
            index={i}
            controller={controller}
          />
        ))}
      </div>
      <div className="shrink-0 p-3">
        <LayerTransformForm controller={controller}/>
      </div>
    </div>
  );
}
