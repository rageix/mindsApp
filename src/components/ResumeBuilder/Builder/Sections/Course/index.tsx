'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import CourseForm from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm';
import CourseFormController from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm/CourseFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables
  from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function Course({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title title={controller.state.section.title} />
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <CourseForm
            key={v.id}
            controller={v as CourseFormController}
            onDuplicate={() => controller.onDuplicateIndex(i)}
            onDelete={() => controller.onDeleteIndex(i)}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
