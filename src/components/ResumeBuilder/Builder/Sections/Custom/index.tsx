'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import CustomForm from '@/components/ResumeBuilder/Builder/Sections/Custom/CustomForm';
import CustomFormController from '@/components/ResumeBuilder/Builder/Sections/Custom/CustomForm/CustomFormController';

interface IProps {
  controller: SectionController;
}

export default function Custom({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title}/>
      {controller.state.controllers.map((v) => (
        <CustomForm
          key={v.id}
          controller={v as CustomFormController}
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
