import BasicController from '@/util/BasicController';
import {
  ELayerType,
  ETab,
  ETool,
  IImageEditor,
  ILayer,
  ILayout,
  IStyle,
  TLayerControllers,
} from '@/types/ImageEditor';
import { nanoid } from 'nanoid';
import TransformerToolController from '@/components/ImageEditor/TransformerTool/TransformerToolController';
import DocumentController from '@/components/ImageEditor/DocumentController';
import { ILayerTransform, newILayerTransform } from '@/types/LayerTransform';
import { MouseEvent } from 'react';
import { IVector2 } from '@/types/Vectors';
import { getCanvasVector } from '@/util/GetCanvasVector';
import { getDiff } from '@/util/GetDiff';
import { getMidpoint } from '@/util/GetMidpoint';
import { roundTo1Place } from '@/util/RoundTo1Place';
import { IColor, newIColor } from '@/types/Color';
import hslToRgb from '@/util/HslToRgb';
import rgbToHex from '@/util/RgbToHex';
import rgbToHsl from '@/util/RgbToHsl';
import hexStrToRgb from '@/util/HexStringToRgb';

export interface IState {
  width: number;
  height: number;
  layers: ILayer[];
  selected: number[];
  tab: ETab;
  transform: ILayerTransform;
  layout: ILayout | null;
  style: IStyle;
  tool: ETool;
  fillColor: IColor;
  // borderColor: IColorAlpha
}

export default class ImageEditorController extends BasicController<IState> {
  layers: TLayerControllers[] = [];
  name: string;
  transformController: TransformerToolController;
  documentController: DocumentController;

  constructor(data: IImageEditor) {
    super();

    this.name = data.name;
    this.transformController = new TransformerToolController(
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
      selected: [],
      tab: ETab.Layers,
      transform: newILayerTransform(),
      layout: null,
      style: {
        fillColor: '0x6B7280',
      },
      tool: ETool.Pointer,
      fillColor: newIColor(),
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

  save = () => {
    const state: IImageEditor = {
      name: this.name,
      width: this.state.width,
      height: this.state.height,
      layers: this.state.layers,
    };

    return state;
  };

  onTransformSelection = (value: ILayerTransform) => {
    // console.log('onTransformSelection');
    const layers = [...this.state.layers];

    for (const layerIndex of this.state.selected) {
      layers[layerIndex] = { ...layers[layerIndex], ...value };
    }

    this.setState({ layers, transform: value });
  };

  onClickLayer = (index: number) => {
    // console.log('onClickLayer', index);
    // let layers = [...this.state.layers];

    // console.log('onClickLayer', index);
    // const selectedIndexes = toggleInArray(this.state.selectedLayers, index);
    // console.log(layers.length - index - 1);

    // convert the index from the list index where it
    // was rendered to its actual index in the array
    const selected = [index];
    const layer = this.state.layers[index];
    const fillColor = this.hexToColor(layer.fillColor.substring(2), (layer.fillAlpha || 1) * 100);

    // layers = layers.map((v, i) => {
    //   v.isSelected = selectedLayers.findIndex((x) => x === i) > -1;
    //   return v;
    // });
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

    if (selected.length === 1) {
      //   const { state } = this.state.layers[selectedIndexes[0]];
      // const layer = this.state.layers[selected[0]];
      // const corners = getCorners(state.x, state.y, state.width, state.height, state.angle);
      transform = {
        x: layer.x,
        y: layer.y,
        width: layer.width,
        height: layer.height,
        angle: layer.angle,
      };

      // this.transformController.onShow();
    }

    this.setState({ selected, transform, fillColor });

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

  onCanvasMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    let layout: ILayout | null = null;
    const { tool } = this.state;

    if (tool !== ETool.Pointer) {
      const mousePoint: IVector2 = getCanvasVector(e);
      const docState = this.documentController.state;
      const mousePointTranslated: IVector2 = {
        x: (mousePoint.x - docState.x) * docState.scaleX,
        y: (mousePoint.y - docState.y) * docState.scaleY,
      };

      layout = {
        downX: roundTo1Place(mousePointTranslated.x),
        downY: roundTo1Place(mousePointTranslated.y),
        x: roundTo1Place(mousePointTranslated.x),
        y: roundTo1Place(mousePointTranslated.y),
        width: 0,
        height: 0,
      };
      this.setState({
        layout,
      });
      return;
    }

    this.setState({
      selected: [],
    });
  };

  onCanvasMouseUp = () => {
    const { layout, style, tool, selected } = this.state;

    if (layout && layout.width > 1 && layout.height > 1 && tool && tool > 0) {
      const layers = [...this.state.layers];
      let layerType: ELayerType = ELayerType.Container;
      let layerName = 'New Layer';

      switch (tool) {
        case ETool.Text:
          layerType = ELayerType.Text;
          layerName = 'Text';
          break;
        case ETool.Image:
          layerType = ELayerType.Image;
          layerName = 'Image';
          break;
        case ETool.Box:
          layerType = ELayerType.Box;
          layerName = 'Box';
          break;
        case ETool.Ellipse:
          layerType = ELayerType.Ellipse;
          layerName = 'Ellipse';
          break;
      }

      const newLayer: ILayer = {
        id: this.newLayerId(),
        parentId: null,
        name: layerName,
        type: layerType,
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height,
        angle: 0,
        isVisible: true,
        locked: false,
        dragging: false,
        ...style,
      };

      let newIndex =
        selected.length === 0 ? layers.length - 1 : Math.max(...selected);

      // if (newIndex === Infinity || newIndex === -Infinity) {
      //   newIndex = layers.length - 1;
      // }

      newIndex += 1;

      layers.splice(newIndex, 0, newLayer);
      const newSelected = [newIndex];

      const transform: ILayerTransform = {
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height,
        angle: 0,
      };

      this.setState({
        layout: null,
        layers,
        transform,
        selected: newSelected,
      });
      return;
    }

    // this.setState({ layout: null });
  };

  onLayoutMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!this.state.layout) {
      return;
    }

    const layout = { ...this.state.layout };
    const docState = this.documentController.state;

    const mousePoint: IVector2 = getCanvasVector(e);
    // translate mouse from global space to scaled space
    const mousePointTranslated: IVector2 = {
      x: (mousePoint.x - docState.x) * docState.scaleX,
      y: (mousePoint.y - docState.y) * docState.scaleY,
    };

    const midPoint = getMidpoint(
      { x: layout.downX, y: layout.downY },
      mousePointTranslated,
    );

    layout.x = roundTo1Place(midPoint.x);
    layout.y = roundTo1Place(midPoint.y);
    layout.width = roundTo1Place(getDiff(layout.downX, mousePointTranslated.x));
    layout.height = roundTo1Place(
      getDiff(layout.downY, mousePointTranslated.y),
    );

    this.setState({ layout });
  };

  onChangeTool = (tool: ETool) => {
    this.setState({ tool });
  };

  onDeleteSelected = () => {
    const layers = this.state.layers.filter(
      (_, i) => this.state.selected.findIndex((x) => x === i) === -1,
    );

    this.setState({ layers, selected: [] });
  };

  onDeselect = () => {
    this.setState({ selected: [] });
  };

  onChangeFill = (value: IColor) => {
    const layers = [...this.state.layers];

    const fillColor = '0x' + value.hex.substring(1);
    const fillAlpha = value.opacity / 100;
    // fillAlpha = fillAlpha === 0 ? -1 : fillAlpha;

    for (const index of this.state.selected) {
      layers[index].fillColor = fillColor;
      layers[index].fillAlpha = fillAlpha;
    }

    this.setState({ layers, fillColor: value });
  };

  onChangeHSL = (h: number, s: number, l: number) => {
    const [r, g, b] = hslToRgb(h / 360, s / 100, l / 100);
    if (r === undefined || g === undefined || b === undefined) {
      this.setState({ ...this.state, fillColor: newIColor() });
      return;
    }
    const hex = rgbToHex(r, g, b);

    const color: IColor = {
      ...this.state.fillColor,
      h,
      s,
      l,
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
      hex,
    };

    this.onChangeFill(color);
  };

  onChangeH = (h: number) => {
    const color = this.state.fillColor;
    this.onChangeHSL(h, color.s, color.l);
  };

  onChangeS = (s: number) => {
    const color = this.state.fillColor;
    this.onChangeHSL(color.h, s, color.l);
  };

  onChangeL = (l: number) => {
    const color = this.state.fillColor;
    this.onChangeHSL(color.h, color.s, l);
  };

  onChangeRgb = (r: number, g: number, b: number) => {
    const [h, s, l] = rgbToHsl(r, g, b);
    if (h === undefined || s === undefined || l === undefined) {
      this.onChangeFill(newIColor());
      return;
    }
    const hex = rgbToHex(r, g, b);

    const out: IColor = {
      ...this.state.fillColor,
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      r,
      g,
      b,
      hex,
    };

    this.onChangeFill(out);
  };

  onChangeR = (r: number) => {
    const color = this.state.fillColor;
    this.onChangeRgb(r, color.g, color.b);
  };

  onChangeG = (g: number) => {
    const color = this.state.fillColor;
    this.onChangeRgb(color.r, g, color.b);
  };

  onChangeB = (b: number) => {
    const color = this.state.fillColor;
    this.onChangeRgb(color.r, color.g, b);
  };

  onChangeOpacity = (opacity: number) => {
    const out: IColor = {
      ...this.state.fillColor,
      opacity,
    };

    this.onChangeFill(out);
  };

  hexToColor(hex: string, opacity?: number) {
    hex = hex.trim();
    // add # sign if missing
    if (hex.substring(0, 1) !== '#') {
      hex = '#' + hex;
    }
    // if using shortened format like #fff,
    // make it long format like #ffffff
    if (hex.substring(1).length === 3) {
      hex += hex.substring(1);
    }
    const [r, g, b] = hexStrToRgb(hex);
    if (r === undefined || g === undefined || b === undefined) {
      return newIColor();
    }
    const [h, s, l] = rgbToHsl(r, g, b);
    hex = rgbToHex(r, g, b);

    const out: IColor = {
      opacity: opacity ? opacity : 1,
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      r,
      g,
      b,
      hex,
    };

    return out;
  }

  onChangeHex(hex: string, opacity?: number) {
    const out = this.hexToColor(hex, opacity);

    this.onChangeFill(out);
  }
}
