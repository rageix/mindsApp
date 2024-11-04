import { ReactElement } from 'react';

export interface ISelectOption<T> {
  key: string;
  value: T;
  label: ReactElement | string;
}
