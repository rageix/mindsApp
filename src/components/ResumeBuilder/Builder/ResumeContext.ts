import { createContext } from 'react';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';

const SectionContext = createContext<ResumeController>(new ResumeController());
export default SectionContext;
