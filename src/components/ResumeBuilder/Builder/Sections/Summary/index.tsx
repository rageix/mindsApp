'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SummaryFormController from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm/SummaryFormController';
import SummaryForm from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import FormList from '../FormList';

interface IProps {
  controller: SectionController;
}

export default function Summary({ controller }: IProps) {
  return (
    <div>
      <Title />
      <Description>
        A couple of sentences telling the reader how great you are. List your
        role or last role, what you did, what you achieved, and what skills you
        used or developed.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <SummaryForm
            key={v.id}
            controller={v as SummaryFormController}
          />
        ))}
      </FormList>
    </div>
  );
}
