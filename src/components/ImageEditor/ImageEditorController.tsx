import BasicController from '@/util/BasicController';
import {
  ELayerType,
  ICircleLayer,
  IImageEditor,
  IImageLayer,
  ILayer,
  ITextLayer,
  TLayerControllers,
} from '@/types/ImageEditor';
import BaseLayerController from '@/components/ImageEditor/Layer/BaseLayerController';
import ImageLayerController from '@/components/ImageEditor/Layer/Image/ImageController';
import TextLayerController from '@/components/ImageEditor/Layer/Text/TextController';
import { nanoid } from 'nanoid';
import CircleLayerController from '@/components/ImageEditor/Layer/Circle/CircleController';

export interface IState {
  width: number;
  height: number;
  layers: TLayerControllers[];
  selectedLayers: TLayerControllers[];
}

export default class ImageEditorController extends BasicController<IState> {
  layers: TLayerControllers[] = [];
  name: string;

  constructor(data: IImageEditor) {
    super();

    this.name = data.name;

    this.defaultState = {
      width: data.width,
      height: data.height,
      layers: data.layers.map((v) => {
        switch (v.type) {
          case ELayerType.Image:
            return new ImageLayerController(v as IImageLayer);
          case ELayerType.Text:
            return new TextLayerController(v as ITextLayer);
          default:
            return new BaseLayerController(v);
        }
      }),
      selectedLayers: [],
    };
  }

  newLayerId = () => {
    while (true) {
      const id = nanoid();
      if (this.layers.findIndex((v) => v.defaultState.id === id) === -1) {
        return id;
      }
    }
  };

  newLayerData = (): ILayer => {
    return {
      id: this.newLayerId(),
      parentId: null,
      name: 'Layer',
      type: ELayerType.Container,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      visible: true,
      opacity: 100,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      locked: false,
      dragging: false,
    };
  };

  newImageLayer = (data?: Partial<IImageLayer>): IImageLayer => {
    return {
      ...this.newLayerData(),
      name: 'Image Layer',
      type: ELayerType.Image,
      imageId: null,
      ...data,
    };
  };

  newTextLayer = (data?: Partial<ITextLayer>): ITextLayer => {
    return {
      ...this.newLayerData(),
      type: ELayerType.Text,
      name: 'Text Layer',
      fontFamily: 'Arial',
      fontSize: 12,
      fontStyle: 'regular',
      textDecoration: '',
      text: '',
      align: 'left',
      fill: '#000',
      ...data,
    };
  };

  newCircleLayer = (data?: Partial<ICircleLayer>): ICircleLayer => {
    return {
      ...this.newLayerData(),
      type: ELayerType.Circle,
      width: 20,
      height: 20,
      fill: '#000',
      ...data,
    };
  };

  onClickNewTextLayer = () => {
    const data = this.newTextLayer();
    const controller = new TextLayerController(data);
    const layers = [...this.state.layers, controller];
    this.setState({ layers });
  };

  onClickNewImageLayer = () => {
    const controller = new TextLayerController(this.newTextLayer());
    const layers = [...this.state.layers, controller];
    this.setState({ layers });
  };

  onClickNewCircleLayer = () => {
    const controller = new CircleLayerController(this.newCircleLayer());
    const layers = [...this.state.layers, controller];
    this.setState({ layers });
  };

  save = () => {
    const state: IImageEditor = {
      name: this.name,
      width: this.state.width,
      height: this.state.height,
      layers: this.layers.map((v) => v.state),
    };

    return state;
  };
}
