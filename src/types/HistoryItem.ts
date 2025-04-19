import { MongoDocument, MongoId } from './MongoDocument.js';
import { EModel } from './Model.js';

export interface IModelActionError {
  code?: string;
  message?: string;
}

export enum EModelContentType {
  Text = 'text',
  Image = 'image',
  File = 'file',
  Refusal = 'refusal'
}

export enum EAnnotationType {
  UrlCitation = 'urlCitation'
}

export interface IAnnotation {
  type: EAnnotationType;
  startIndex?: number;
  endIndex?: number;
  url: string;
  title?: string;
}

export interface IModelContent {
  type: EModelContentType;
  value: string;
  annotations?: IAnnotation[]
}

export enum EStatus {
  Completed = 'completed',
  Failed = 'failed',
  InProgress = 'inProgress',
  Incomplete = 'incomplete',
}

export interface IModelResponse extends MongoDocument {
  userId: MongoId;
  chatId?: MongoId;
  model: EModel;
  status: EStatus,
  errorCode?: string | null;
  errorMessage?: string | null,
  incompleteDetails?: string | null,
  instructions?: string | null,
  input: IModelContent[];
  output: IModelContent[];
  responseId: string;
  modelVersion?: string; // if different or more specific from the original
  createdAt?: Date;
}
