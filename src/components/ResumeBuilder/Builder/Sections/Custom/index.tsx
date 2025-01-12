'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import CustomForm from '@/components/ResumeBuilder/Builder/Sections/Custom/CustomForm';
import CustomFormController from '@/components/ResumeBuilder/Builder/Sections/Custom/CustomForm/CustomFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';

interface IProps {
  controller: SectionController;
}

export default function Custom({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title} />
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <CustomForm
            key={v.id}
            controller={v as CustomFormController}
            onDuplicate={() => controller.onDuplicateIndex(i)}
            onDelete={() => controller.onDeleteIndex(i)}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </div>
  );
}
