'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import LanguageForm from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm';
import LanguageFormController from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm/LanguageFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function Language({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <FormList>
        {controller.state.controllers.map((v) => (
          <LanguageForm
            key={v.id}
            controller={v as LanguageFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
