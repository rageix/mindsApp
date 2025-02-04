'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import EmploymentForm from '@/components/ResumeBuilder/Builder/Sections/Employment/EmploymentForm';
import EmploymentFormController from '@/components/ResumeBuilder/Builder/Sections/Employment/EmploymentForm/EmploymentFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function Employment({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <Description>
        List your relevant experience in the last 10 years or so.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <EmploymentForm
            key={v.id}
            controller={v as EmploymentFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
