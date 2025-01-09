'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import ReferenceForm from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm';
import ReferenceFormController from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm/ReferenceFormController';

interface IProps {
  controller: SectionController;
}

export default function Reference({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title>References</Title>
      {controller.state.controllers.map((v) => (
        <ReferenceForm
          key={v.id}
          controller={v as ReferenceFormController}
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
