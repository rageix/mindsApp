import { MongoDocument, MongoId } from '@/types/MongoDocument';
import LayerController from '@/components/ImageEditor/Layer/LayerController';
import TextLayerController from '@/components/ImageEditor/Layer/Text/TextController';
import ImageLayerController from '@/components/ImageEditor/Layer/Image/ImageController';
import CircleLayerController from '@/components/ImageEditor/Layer/Circle/CircleController';

export enum ELayerType {
  Container = 'container',
  Text = 'text',
  Image = 'image',
  Circle = 'circle',
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
  visible: boolean;
  opacity: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  locked: boolean;
  dragging: boolean;
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
  TopLeft,
  Top,
  TopRight,
  Right,
  BottomRight,
  Bottom,
  BottomLeft,
  Left,
  ScaleAroundCenter
}