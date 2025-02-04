'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import LinkForm from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm';
import LinkFormController from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function Link({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <Description>
        Links to places you want the hiring manager to be aware of.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <LinkForm
            key={v.id}
            controller={v as LinkFormController}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
