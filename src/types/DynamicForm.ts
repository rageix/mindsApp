import { MongoDocument, MongoId } from './MongoDocument';
import { nanoid } from 'nanoid';

export enum EFieldType {
  Input = 'input',
  Text = 'text',
  File = 'file',
  Date = 'date',
  Select = 'select',
  Rating = 'rating',
}

export const fieldRecord: Record<EFieldType, string> = {
  [EFieldType.Input]: 'Input',
  [EFieldType.Text]: 'Text',
  [EFieldType.File]: 'File',
  [EFieldType.Date]: 'Date',
  [EFieldType.Select]: 'Select',
  [EFieldType.Rating]: 'Rating',
}

export interface IFieldOption {
  key: string,
  value: string,
}

export function newIFieldOption(): IFieldOption {
  return {
    key: nanoid(),
    value: 'New Option',
  };
}

export interface IField {
  key: string;
  type: EFieldType;
  label: string;
  isRequired: boolean;
  selectOptions: IFieldOption[];
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  placeholder?: string;
}

export function newIField(type: EFieldType): IField {
  return {
    key: nanoid(),
    type: type,
    label: `New ${fieldRecord[type]} Field`,
    isRequired: true,
    selectOptions: [],
    isEmail: false,
    minLength: 0,
    maxLength: 0,
    placeholder: ''
  };
}

export interface ISection {
  key: string;
  heading: string;
  description: string;
  fields: IField[];
}

export function newISection(): ISection {
  return {
    key: nanoid(),
    heading: 'New Section',
    description: '',
    fields: []
  }
}

export interface IDynamicFormSettings {
  isActive: boolean;
  name: string;
}

export interface IDynamicForm extends MongoDocument, IDynamicFormSettings {
  teamId: MongoId;
  sections: ISection[];
  updatedAt?: Date;
}

export function newIDynamicForm(teamId: MongoId): IDynamicForm {
  return {
    isActive: true,
    teamId: teamId,
    name: 'New Form',
    sections: [],
  };
}
