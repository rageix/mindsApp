import { ICircleLayer } from '@/types/ImageEditor';
import BaseLayerController from '@/components/ImageEditor/Layer/BaseLayerController';

export default class CircleLayerController extends BaseLayerController<ICircleLayer> {
  constructor(state: ICircleLayer) {
    super(state);
  }

  onChangeFill = (value: string) => {
    this.setState({ fill: value });
  };
}
