import { IImageLayer } from '@/types/ImageEditor';
import BaseLayerController from '@/components/ImageEditor/Layer/BaseLayerController';

export default class ImageLayerController extends BaseLayerController<IImageLayer> {
  constructor(state: IImageLayer) {
    super(state);
  }

  onChangeImageId = (value: string) => {
    this.setState({ imageId: value });
  };
}
