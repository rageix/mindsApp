'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import SkillForm from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm';
import SkillFormController from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm/SkillFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';
import SectionWithDraggables from '@/components/ResumeBuilder/Builder/Sections/SectionWithDraggables';

interface IProps {
  controller: SectionController;
}

export default function Skill({ controller }: IProps) {
  controller.useController();

  return (
    <SectionWithDraggables controller={controller}>
      <Title />
      <Description>
        Choose 5 important skills that show you fit the position. Make sure they
        match the key skills mentioned in the job listing (especially when
        applying via an online system).{' '}
      </Description>
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <SkillForm
            key={v.id}
            controller={v as SkillFormController}
            index={i}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </SectionWithDraggables>
  );
}
