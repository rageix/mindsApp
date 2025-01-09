'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import EducationForm
  from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm';
import EducationFormController
  from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm/EducationFormController';

interface IProps {
  controller: SectionController;
}

export default function Eduction({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title>Education</Title>
      <Description>
        A varied education on your resume sums up the value that your learnings and background will bring to job.
      </Description>
      {controller.state.controllers.map((v) => (
        <EducationForm
          key={v.id}
          controller={v as EducationFormController}
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
