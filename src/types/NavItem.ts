import { ReactElement } from 'react';

export interface INavItem {
  name: string;
  icon: ReactElement;
  onClick?: () => void;
}
