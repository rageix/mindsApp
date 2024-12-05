import { MongoDocument, MongoId } from './MongoDocument';
import { nanoid } from 'nanoid';

export enum EFieldType {
  Input = 'input',
  TextArea = 'textArea',
  Email = 'email',
  File = 'file',
  Date = 'date',
  Select = 'select',
  Rating = 'rating',
}

export const fieldRecord: Record<EFieldType, string> = {
  [EFieldType.Input]: 'Input',
  [EFieldType.TextArea]: 'Text Area',
  [EFieldType.Email]: 'Email',
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
  placeholder?: string;
}

export function newIField(type: EFieldType): IField {
  return {
    key: nanoid(),
    type: type,
    label: `New ${fieldRecord[type]} Field`,
    isRequired: true,
    selectOptions: [],
    minLength: 0,
    maxLength: 0,
    placeholder: ''
  };
}

export interface ISection {
  key: string;
  title: string;
  description: string;
  fields: IField[];
}

export function newISection(): ISection {
  return {
    key: nanoid(),
    title: 'New Section',
    description: '',
    fields: []
  }
}

export interface IFormSettings {
  isActive: boolean;
  name: string;
}

export interface IForm extends MongoDocument, IFormSettings {
  teamId: MongoId;
  sections: ISection[];
  updatedAt?: Date;
}

export function newIForm(teamId: MongoId): IForm {
  return {
    isActive: true,
    teamId: teamId,
    name: 'New Form',
    sections: [],
  };
}
