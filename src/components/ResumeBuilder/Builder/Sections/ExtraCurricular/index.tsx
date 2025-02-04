'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import ExtraCurricularForm from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular/ExtraCurricularForm';
import ExtraCurricularFormController from '@/components/ResumeBuilder/Builder/Sections/ExtraCurricular/ExtraCurricularForm/ExtraCurricularFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';

interface IProps {
  controller: SectionController;
}

export default function ExtraCurricular({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <Description>
        Talk about your favorite hobbies, but only if they directly tie to the
        job listing.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <ExtraCurricularForm
            key={v.id}
            controller={v as ExtraCurricularFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
