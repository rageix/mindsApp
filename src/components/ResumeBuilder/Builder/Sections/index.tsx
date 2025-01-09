import { ERBType } from '@/types/ResumeBuilder';
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

interface IProps {
  controller: SectionController;
}

export default function BuilderSection({ controller }: IProps) {
  controller.useController();
  const section = controller.state.section;
  const isHidden = !!section.isHidden;

  switch (section.type) {
    case ERBType.Detail:
      return <Detail controller={controller} />;
    case ERBType.Summary:
      return <Summary controller={controller} />;
    case ERBType.Employment:
      return <Employment controller={controller} />;
    case ERBType.Education:
      return <Eduction controller={controller} />;
    case ERBType.Link:
      return <Link controller={controller} />;
    case ERBType.Skill:
      return <Skill controller={controller} />;
    case ERBType.Custom:
      return !isHidden ? <Custom controller={controller} /> : null;
    case ERBType.Course:
      return !isHidden ? <Course controller={controller} /> : null;
    case ERBType.ExtraCurricular:
      return !isHidden ? <ExtraCurricular controller={controller} /> : null;
    case ERBType.Internship:
      return !isHidden ? <Internship controller={controller} /> : null;
    case ERBType.Language:
      return !isHidden ? <Language controller={controller} /> : null;
    case ERBType.Reference:
      return !isHidden ? <Reference controller={controller} /> : null;
  }
}
