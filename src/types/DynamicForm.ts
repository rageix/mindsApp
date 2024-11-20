import { MongoDocument, MongoId } from './MongoDocument';
import { ISelectOption } from './SelectOption';
import { nanoid } from 'nanoid';

export enum EFieldType {
  Input = 'input',
  Text = 'text',
  File = 'file',
  Date = 'date',
  Select = 'select',
  Rating = 'rating',
}

export interface IField {
  key: string;
  type: EFieldType;
  label: string;
  isRequired: boolean;
  selectOptions: ISelectOption<string>[];
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  placeholder?: string;
}

export function newIField(type: EFieldType): IField {
  return {
    key: nanoid(),
    type: type,
    label: '',
    isRequired: true,
    selectOptions: [],
  };
}

export interface ISection {
  key: string;
  heading: string;
  description: string;
  fields: IField[];
}

export interface IDynamicForm extends MongoDocument {
  isActive: boolean;
  teamId: MongoId;
  name: string;
  sections: ISection[];
  updatedAt?: Date;
}

export function newIDynamicForm(teamId: MongoId): IDynamicForm {
  return {
    isActive: true,
    teamId: teamId,
    name: '',
    sections: [],
  };
}
