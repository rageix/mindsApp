import { createContext } from 'react';
import SectionController
  from '@/components/ResumeBuilder/Builder/Sections/SectionController';

const SectionContext = createContext<SectionController>(new SectionController());
export default SectionContext;