import { ERBType } from '@/types/ResumeBuilder';
import Detail from '@/components/ResumeBuilder/Builder/Sections/Detail';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Summary from '@/components/ResumeBuilder/Builder/Sections/Summary';
import Link from '@/components/ResumeBuilder/Builder/Sections/Link';

interface IProps {
  controller: SectionController;
}

export default function BuilderSection({ controller }: IProps) {
  controller.useController();

  switch (controller.state.section.type) {
    case ERBType.Detail:
      return <Detail controller={controller} />;
    case ERBType.Summary:
      return <Summary controller={controller} />;
    case ERBType.Link:
      return <Link controller={controller} />;
  }
}
