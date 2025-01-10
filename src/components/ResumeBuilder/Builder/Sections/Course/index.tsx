'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import CourseForm from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm';
import CourseFormController from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm/CourseFormController';

interface IProps {
  controller: SectionController;
}

export default function Course({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title}/>
      {controller.state.controllers.map((v) => (
        <CourseForm
          key={v.id}
          controller={v as CourseFormController}
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
