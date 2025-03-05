'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import EducationForm from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm';
import EducationFormController from '@/components/ResumeBuilder/Builder/Sections/Education/EducationForm/EducationFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function Eduction({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <Description>
        List the education institutions you have attended.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <EducationForm
            key={v.id}
            controller={v as EducationFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
