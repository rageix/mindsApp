import { MongoId } from '@/types/MongoDocument';

export interface IResponseValue {
  key?: string,
  value: string | number,
  label?: string,
}

export interface IResponseField {
  key: string;
  values: IResponseValue[];
}

export interface IResponseSection {
  key: string;
  fields: IResponseField[];
}

export interface IFormPublicRequest {
  formId: MongoId;
  sections: IResponseSection[];
}
