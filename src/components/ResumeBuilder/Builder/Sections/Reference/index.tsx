'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import ReferenceForm from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm';
import ReferenceFormController from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm/ReferenceFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';

interface IProps {
  controller: SectionController;
}

export default function Reference({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title} />
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <ReferenceForm
            key={v.id}
            controller={v as ReferenceFormController}
            onDuplicate={() => controller.onDuplicateIndex(i)}
            onDelete={() => controller.onDeleteIndex(i)}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </div>
  );
}
