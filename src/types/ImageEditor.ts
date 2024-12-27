import { MongoDocument, MongoId } from '@/types/MongoDocument';
import LayerController from '@/components/ImageEditor/Layer/LayerController';
import TextLayerController from '@/components/ImageEditor/Layer/Text/TextController';
import ImageLayerController from '@/components/ImageEditor/Layer/Image/ImageController';
import CircleLayerController from '@/components/ImageEditor/Layer/Circle/CircleController';
import { ICorners } from '@/types/Corners';

export enum ELayerType {
  Container = 'container',
  Text = 'text',
  Image = 'image',
  Box = 'box',
  Ellipse = 'ellipse',
}

export interface ILayer {
  id: string;
  parentId: string | null;
  name: string;
  type: ELayerType;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  isVisible: boolean;
  locked: boolean;
  dragging: boolean;
  fillColor: string;
  fillAlpha?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderAlpha?: number;
  corners?: ICorners;
}

export interface IImageLayer extends ILayer {
  imageId: MongoId | null;
}

// https://konvajs.org/api/Konva.Text.html
export interface ITextLayer extends ILayer {
  fontFamily: string;
  fontSize: number;
  fontStyle: string;
  textDecoration: string;
  text: string;
  align: string;
  fill: string;
}

export interface ICircleLayer extends ILayer {
  fill: string;
}

export interface IImageEditor extends MongoDocument {
  name: string;
  width: number;
  height: number;
  layers: ILayer[];
}

export type TLayer = ILayer | IImageLayer | ITextLayer | ICircleLayer;

export type TLayerControllers =
  | LayerController
  | TextLayerController
  | ImageLayerController
  | CircleLayerController;

export interface ILayoutTool {
  type: ELayerType | null;
  active: boolean;
  startX: number;
  startY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum EHandle {
  NoHandle,
  TopLeft,
  Top,
  TopRight,
  Right,
  BottomRight,
  Bottom,
  BottomLeft,
  Left,
  ScaleAroundCenter,
  Rotate,
  Move,
}

export enum ETool {
  Pointer,
  Text,
  Image,
  Ellipse,
  Box,
}

export enum ETab {
  Layers,
  Settings,
  History,
}

export interface ILayout {
  downX: number;
  downY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IStyle {
  fillColor: string;
  fillAlpha?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderAlpha?: number;
}