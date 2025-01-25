'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import ExtraCurricularForm from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular/ExtraCurricularForm';
import ExtraCurricularFormController from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular/ExtraCurricularForm/ExtraCurricularFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function ExtraCurricular({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title title={controller.state.section.title} />
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <ExtraCurricularForm
            key={v.id}
            controller={v as ExtraCurricularFormController}
            onDuplicate={() => controller.onDuplicateIndex(i)}
            onDelete={() => controller.onDeleteIndex(i)}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
