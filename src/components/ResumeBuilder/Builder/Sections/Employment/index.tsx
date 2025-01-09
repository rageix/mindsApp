'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import EmploymentForm from '@/components/ResumeBuilder/Builder/Sections/Employment/EmploymentForm';
import EmploymentFormController from '@/components/ResumeBuilder/Builder/Sections/Employment/EmploymentForm/EmploymentFormController';

interface IProps {
  controller: SectionController;
}

export default function Employment({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title>Employment</Title>
      <Description>
        Show your relevant experience (last 10 years). Use bullet points to note
        your achievements, if possible - use numbers/facts (Achieved X, measured
        by Y, by doing Z).{' '}
      </Description>
      {controller.state.controllers.map((v) => (
        <EmploymentForm
          key={v.id}
          controller={v as EmploymentFormController}
        />
      ))}
      <Button
        variant="link"
        onClick={controller.onClickAddForm}
      >
        + Add One
      </Button>
    </div>
  );
}
