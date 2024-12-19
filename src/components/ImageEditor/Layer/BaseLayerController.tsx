import BasicController from '@/util/BasicController';
import { ILayer } from '@/types/ImageEditor';
import Konva from 'konva';

export default class BaseLayerController<
  T extends ILayer,
> extends BasicController<T> {
  constructor(state: T) {
    super();
    this.defaultState = state;
  }

  onChangeName = (value: string) => {
    this.setState({ name: value } as Partial<T>);
  };

  onChangeX = (value: number) => {
    this.setState({ x: value } as Partial<T>);
  };

  onChangeY = (value: number) => {
    this.setState({ y: value } as Partial<T>);
  };

  onDragStart = () => {
    this.setState({ dragging: true } as Partial<T>);
  };

  onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    console.log(e.target.x(), e.target.y());

    this.setState({
      x: e.target.x(),
      y: e.target.y(),
      dragging: false,
    } as Partial<T>);
  };

  onChangeWidth = (value: number) => {
    this.setState({ width: value } as Partial<T>);
  };

  onChangeHeight = (value: number) => {
    this.setState({ height: value } as Partial<T>);
  };

  onChangeVisible = (value: boolean) => {
    this.setState({ visible: value } as Partial<T>);
  };

  onClickVisible = () => {
    this.onChangeVisible(!this.state.visible);
  };

  onChangeRotation = (value: number) => {
    this.setState({ angle: value } as Partial<T>);
  };

  onChangeLocked = (value: boolean) => {
    this.setState({ locked: value } as Partial<T>);
  };
}
