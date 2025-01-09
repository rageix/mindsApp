'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import Button from '@/components/Buttton';
import SkillForm from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm';
import SkillFormController from '@/components/ResumeBuilder/Builder/Sections/Skill/SkillForm/SkillFormController';

interface IProps {
  controller: SectionController;
}

export default function Skill({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title>Skills</Title>
      <Description>
        Choose 5 important skills that show you fit the position. Make sure they
        match the key skills mentioned in the job listing (especially when
        applying via an online system).{' '}
      </Description>
      {controller.state.controllers.map((v) => (
        <SkillForm
          key={v.id}
          controller={v as SkillFormController}
        />
      ))}
      <Button
        variant="link"
        onClick={controller.onClickAddForm}
      >
        + Add One
      </Button>
    </div>
  );
}
