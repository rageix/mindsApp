'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SummaryFormController from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm/SummaryFormController';
import SummaryForm from '@/components/ResumeBuilder/Builder/Sections/Summary/SummaryForm';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';

interface IProps {
  controller: SectionController;
}

export default function Summary({ controller }: IProps) {
  // controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title}/>
      <Description>
        Write 2-4 short, energetic sentences about how great you are. Mention
        the role and what you did. What were the big achievements? Describe your
        motivation and list your skills.
      </Description>
      {controller.state.controllers.map((v) => (
        <SummaryForm
          key={v.id}
          controller={v as SummaryFormController}
        />
      ))}
    </div>
  );
}
