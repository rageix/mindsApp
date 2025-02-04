'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import CourseForm from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm';
import CourseFormController from '@/components/ResumeBuilder/Builder/Sections/Course/CourseForm/CourseFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';
import Description
  from '@/components/ResumeBuilder/Builder/Sections/Description';

interface IProps {
  controller: SectionController;
}

export default function Course({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <Description>
        List any relevant courses for the job position.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <CourseForm
            key={v.id}
            controller={v as CourseFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
