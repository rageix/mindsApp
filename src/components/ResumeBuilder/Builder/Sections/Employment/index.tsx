'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import EmploymentForm from '@/components/ResumeBuilder/Builder/Sections/Employment/EmploymentForm';
import EmploymentFormController from '@/components/ResumeBuilder/Builder/Sections/Employment/EmploymentForm/EmploymentFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';

interface IProps {
  controller: SectionController;
}

export default function Employment({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title} />
      <Description>
        Show your relevant experience (last 10 years). Use bullet points to note
        your achievements, if possible - use numbers/facts (Achieved X, measured
        by Y, by doing Z).{' '}
      </Description>
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <EmploymentForm
            key={v.id}
            controller={v as EmploymentFormController}
            onDuplicate={() => controller.onDuplicateIndex(i)}
            onDelete={() => controller.onDeleteIndex(i)}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </div>
  );
}
