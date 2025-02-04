'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import ReferenceForm from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm';
import ReferenceFormController from '@/components/ResumeBuilder/Builder/Sections/Reference/ReferenceForm/ReferenceFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';
import Description
  from '@/components/ResumeBuilder/Builder/Sections/Description';

interface IProps {
  controller: SectionController;
}

export default function Reference({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <Description>
        List any references you would be OK with a hiring manager contacting.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <ReferenceForm
            key={v.id}
            controller={v as ReferenceFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
