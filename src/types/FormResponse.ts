import { MongoDocument, MongoId } from './MongoDocument';
import { EFieldType } from './Form';
import { IResponseValue } from './FormPublicRequest';

export interface IFormResponseField {
  label: string,
  type: EFieldType,
  values: IResponseValue[],
}

export interface IFormResponseSection {
  title: string,
  description: string,
  fields: IFormResponseField[]
}

export interface IFormResponse extends MongoDocument{
  teamId: MongoId,
  formId: MongoId,
  formName: string,
  sections: IFormResponseSection[],
  ip: string,
  thumbsUp?: number,
  thumbsDown?: number,
  createdAt?: Date
}