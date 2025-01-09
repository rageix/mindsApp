'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import InternshipForm
  from '@/components/ResumeBuilder/Builder/Sections/Internship/InternshipForm';
import InternshipFormController
  from '@/components/ResumeBuilder/Builder/Sections/Internship/InternshipForm/InternshipFormController';

interface IProps {
  controller: SectionController;
}

export default function Internship({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title>Internships</Title>
      {controller.state.controllers.map((v) => (
        <InternshipForm
          key={v.id}
          controller={v as InternshipFormController}
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
