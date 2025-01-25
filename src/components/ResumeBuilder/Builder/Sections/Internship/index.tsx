'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import InternshipForm from '@/components/ResumeBuilder/Builder/Sections/Internship/InternshipForm';
import InternshipFormController from '@/components/ResumeBuilder/Builder/Sections/Internship/InternshipForm/InternshipFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function Internship({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title title={controller.state.section.title} />
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <InternshipForm
            key={v.id}
            controller={v as InternshipFormController}
            onDuplicate={() => controller.onDuplicateIndex(i)}
            onDelete={() => controller.onDeleteIndex(i)}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
