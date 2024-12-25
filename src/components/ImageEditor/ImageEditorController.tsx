import BasicController from '@/util/BasicController';
import {
  ELayerType,
  ETab,
  ICircleLayer,
  IImageEditor,
  IImageLayer,
  ILayer,
  ITextLayer,
  TLayerControllers,
} from '@/types/ImageEditor';
import { nanoid } from 'nanoid';
import PixiTransformerController from '@/components/ImageEditor/PixiTransformer/PixiTransformerController';
import DocumentController from '@/components/ImageEditor/DocumentController';
import { ILayerTransform, newILayerTransform } from '@/types/LayerTransform';

export interface IState {
  width: number;
  height: number;
  layers: ILayer[];
  selectedLayers: number[];
  tab: ETab;
  transform: ILayerTransform;
}

export default class ImageEditorController extends BasicController<IState> {
  layers: TLayerControllers[] = [];
  name: string;
  transformController: PixiTransformerController;
  documentController: DocumentController;

  constructor(data: IImageEditor) {
    super();

    this.name = data.name;
    this.transformController = new PixiTransformerController(
      this.onTransformSelection,
    );
    this.documentController = new DocumentController();

    const layers: ILayer[] = [
      {
        id: nanoid(),
        parentId: null,
        name: 'Circle 1',
        type: ELayerType.Ellipse,
        x: 1920 / 2 - 50,
        y: 1080 / 2 - 50,
        width: 100,
        height: 50,
        angle: 0,
        isVisible: true,
        isSelected: false,
        locked: false,
        dragging: false,
        fillColor: '0x1800FF',
      },
      {
        id: nanoid(),
        parentId: null,
        name: 'Circle 2',
        type: ELayerType.Ellipse,
        x: 1920 / 2,
        y: 1080 / 2,
        width: 150,
        height: 75,
        angle: 0,
        isVisible: true,
        isSelected: false,
        locked: false,
        dragging: false,
        fillColor: '0xFF0000',
      },
    ];

    this.defaultState = {
      width: data.width,
      height: data.height,
      // layers: data.layers.map((v) => {
      //   switch (v.type) {
      //     case ELayerType.Circle:
      //       return new CircleLayerController(v as ICircleLayer);
      //     case ELayerType.Image:
      //       return new ImageLayerController(v as IImageLayer);
      //     case ELayerType.Text:
      //       return new TextLayerController(v as ITextLayer);
      //     default:
      //       return new BaseLayerController(v);
      //   }
      // }),
      // layers: data.layers.map((v) => new BaseLayerController(v)),
      // layers: layers.map((v) => new BaseLayerController(v)),
      layers: layers,
      selectedLayers: [],
      tab: ETab.Layers,
      transform: newILayerTransform(),
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
      isVisible: true,
      isSelected: true,
      angle: 0,
      locked: false,
      dragging: false,
      fillColor: '0xFFFFFF',
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

  // onClickNewTextLayer = () => {
  //   const data = this.newTextLayer();
  //   const controller = new TextLayerController(data);
  //   const layers = [...this.state.layers, controller];
  //   this.setState({ layers });
  // };
  //
  // onClickNewImageLayer = () => {
  //   const controller = new TextLayerController(this.newTextLayer());
  //   const layers = [...this.state.layers, controller];
  //   this.setState({ layers });
  // };
  //
  // onClickNewCircleLayer = () => {
  //   const controller = new CircleLayerController(this.newCircleLayer());
  //   const layers = [...this.state.layers, controller];
  //   this.setState({ layers });
  // };

  save = () => {
    const state: IImageEditor = {
      name: this.name,
      width: this.state.width,
      height: this.state.height,
      layers: this.state.layers,
    };

    return state;
  };

  onClickCanvas = () => {
    this.setState({
      selectedLayers: [],
    });
    this.transformController.setState({ isVisible: false });
  };

  onTransformSelection = (value: ILayerTransform) => {
    // console.log('onTransformSelection');
    const layers = [...this.state.layers];

    for (const layerIndex of this.state.selectedLayers) {
      layers[layerIndex] = { ...layers[layerIndex], ...value };
    }

    this.setState({ layers, transform: value });
  };

  onDeselect = () => {
    this.setState({ selectedLayers: [] });
    this.transformController.onDisable();
  };

  onClickLayer = (index: number) => {
    // console.log('onClickLayer', index);
    let layers = [...this.state.layers];

    // console.log('onClickLayer', index);
    // const selectedIndexes = toggleInArray(this.state.selectedLayers, index);
    const selectedLayers = [index];

    layers = layers.map((v, i) => {
      v.isSelected = selectedLayers.findIndex((x) => x === i) > -1;
      return v;
    });
    //
    // if (selectedIndexes.length === 0) {
    //   this.state.transformController.setState({
    //     isVisible: false,
    //   });
    //
    //   this.setState({ selectedLayers: [] });
    //   return;
    // }
    //
    let transform: ILayerTransform = newILayerTransform();

    if (selectedLayers.length === 1) {
      //   const { state } = this.state.layers[selectedIndexes[0]];
      const layer = layers[selectedLayers[0]];
      // const corners = getCorners(state.x, state.y, state.width, state.height, state.angle);
      transform = {
        x: layer.x,
        y: layer.y,
        width: layer.width,
        height: layer.height,
        angle: layer.angle,
      };

      this.transformController.onShow();
    }

    this.setState({ selectedLayers, layers, transform });

    // const corners: ICorners[] = [];
    //
    // for(const selectedIndex of selectedIndexes) {
    //
    // }
  };

  onClickLayerVisibility = (index: number) => {
    const layers = [...this.state.layers];

    layers[index].isVisible = !layers[index].isVisible;

    this.setState({ layers });
  };

  onClickTab = (tab: ETab) => {
    this.setState({ tab });
  };

}
