'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import InternshipForm from '@/components/ResumeBuilder/Builder/Sections/Internship/InternshipForm';
import InternshipFormController from '@/components/ResumeBuilder/Builder/Sections/Internship/InternshipForm/InternshipFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';
import Description
  from '@/components/ResumeBuilder/Builder/Sections/Description';

interface IProps {
  controller: SectionController;
}

export default function Internship({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <Description>
        List any internships you have had that are relevant to the job posting.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <InternshipForm
            key={v.id}
            controller={v as InternshipFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
