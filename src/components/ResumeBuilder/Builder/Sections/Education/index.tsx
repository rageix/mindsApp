'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import EducationForm from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm';
import EducationFormController from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm/EducationFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';

interface IProps {
  controller: SectionController;
}

export default function Eduction({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title} />
      <Description>
        A varied education on your resume sums up the value that your learnings
        and background will bring to job.
      </Description>
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <EducationForm
            key={v.id}
            controller={v as EducationFormController}
            onDuplicate={() => controller.onDuplicateIndex(i)}
            onDelete={() => controller.onDeleteIndex(i)}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </div>
  );
}
