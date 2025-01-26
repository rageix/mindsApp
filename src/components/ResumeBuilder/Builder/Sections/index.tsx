import { ERBType } from '@/types/Resume';
import Detail from '@/components/ResumeBuilder/Builder/Sections/Detail';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Summary from '@/components/ResumeBuilder/Builder/Sections/Summary';
import Link from '@/components/ResumeBuilder/Builder/Sections/Link';
import Eduction from '@/components/ResumeBuilder/Builder/Sections/Education';
import Skill from '@/components/ResumeBuilder/Builder/Sections/Skill';
import Custom from '@/components/ResumeBuilder/Builder/Sections/Custom';
import Course from '@/components/ResumeBuilder/Builder/Sections/Course';
import ExtraCurricular from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular';
import Internship from '@/components/ResumeBuilder/Builder/Sections/Internship';
import Language from '@/components/ResumeBuilder/Builder/Sections/Language';
import Reference from '@/components/ResumeBuilder/Builder/Sections/Reference';
import Employment from '@/components/ResumeBuilder/Builder/Sections/Employment';
import SectionContext from '@/components/ResumeBuilder/Builder/Sections/SectionContext';
import { ReactElement } from 'react';

interface IProps {
  controller: SectionController;
}

export default function BuilderSection({ controller }: IProps) {
  controller.useController();
  const section = controller.state.section;
  const isHidden = controller.isHidden;
  let element: ReactElement | null;

  switch (section.type) {
    case ERBType.Detail:
      element = <Detail controller={controller} />;
      break;
    case ERBType.Summary:
      element = <Summary controller={controller} />;
      break;
    case ERBType.Employment:
      element = !isHidden ? <Employment controller={controller} /> : null;
      break;
    case ERBType.Education:
      element = !isHidden ? <Eduction controller={controller} /> : null;
      break;
    case ERBType.Link:
      element = !isHidden ? <Link controller={controller} /> : null;
      break;
    case ERBType.Skill:
      element = !isHidden ? <Skill controller={controller} /> : null;
      break;
    case ERBType.Custom:
      element = !isHidden ? <Custom controller={controller} /> : null;
      break;
    case ERBType.Course:
      element = !isHidden ? <Course controller={controller} /> : null;
      break;
    case ERBType.ExtraCurricular:
      element = !isHidden ? <ExtraCurricular controller={controller} /> : null;
      break;
    case ERBType.Internship:
      element = !isHidden ? <Internship controller={controller} /> : null;
      break;
    case ERBType.Language:
      element = !isHidden ? <Language controller={controller} /> : null;
      break;
    case ERBType.Reference:
      element = !isHidden ? <Reference controller={controller} /> : null;
      break;
  }

  return (
    <SectionContext.Provider value={controller}>
      {element}
    </SectionContext.Provider>
  );
}
