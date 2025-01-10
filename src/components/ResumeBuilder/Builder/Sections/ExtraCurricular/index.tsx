'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import ExtraCurricularForm from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular/ExtraCurricularForm';
import ExtraCurricularFormController from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular/ExtraCurricularForm/ExtraCurricularFormController';

interface IProps {
  controller: SectionController;
}

export default function ExtraCurricular({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title}/>
      {controller.state.controllers.map((v) => (
        <ExtraCurricularForm
          key={v.id}
          controller={v as ExtraCurricularFormController}
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
