import * as react from 'react';
import { ForwardRefExoticComponent } from 'react';
import { LucideProps } from 'lucide-react';

export interface INavItem {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
  >;
}
