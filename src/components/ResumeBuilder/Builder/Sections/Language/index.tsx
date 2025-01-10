'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import LanguageForm from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm';
import LanguageFormController from '@/components/ResumeBuilder/Builder/Sections/Language/LanguageForm/LanguageFormController';

interface IProps {
  controller: SectionController;
}

export default function Language({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title}/>
      {controller.state.controllers.map((v) => (
        <LanguageForm
          key={v.id}
          controller={v as LanguageFormController}
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
