import BaseLayerController from '@/components/ImageEditor/Layer/BaseLayerController';
import { ITextLayer } from '@/types/ImageEditor';

export default class TextLayerController extends BaseLayerController<ITextLayer> {
  onChangeFontFamily = (value: string) => {
    this.setState({ fontFamily: value });
  };

  onChangeFontsize = (value: number) => {
    this.setState({ fontSize: value });
  };

  onChangeFontStyle = (value: string) => {
    this.setState({ fontStyle: value });
  };

  onChangeTextDecoration = (value: string) => {
    this.setState({ textDecoration: value });
  };

  onChangeText = (value: string) => {
    this.setState({ text: value });
  };

  onChangeAlign = (value: string) => {
    this.setState({ align: value });
  };

  onChangeFill = (value: string) => {
    this.setState({ fill: value });
  };
}
