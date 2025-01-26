import { createContext } from 'react';
import { IRBStyle, newIRBStyle } from '@/types/Resume';

const StyleContext = createContext<IRBStyle>(newIRBStyle());
export default StyleContext;