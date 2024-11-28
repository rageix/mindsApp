import { MongoId } from '@/types/MongoDocument';

export interface IResponseField {
  key: string;
  value: string[];
}

export interface IResponseSection {
  key: string;
  fields: IResponseField[];
}

export interface IFormResponse {
  formId: MongoId;
  sections: IResponseSection[];
}
