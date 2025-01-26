'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import CustomForm from '@/components/ResumeBuilder/Builder/Sections/Custom/CustomForm';
import CustomFormController from '@/components/ResumeBuilder/Builder/Sections/Custom/CustomForm/CustomFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables
  from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function Custom({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <FormList>
        {controller.state.controllers.map((v) => (
          <CustomForm
            key={v.id}
            controller={v as CustomFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
