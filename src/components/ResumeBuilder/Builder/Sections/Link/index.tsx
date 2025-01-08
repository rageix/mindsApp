'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import LinkForm from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm';
import LinkFormController from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';
import Button from '@/components/Buttton';

interface IProps {
  controller: SectionController;
}

export default function Link({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title>Websites & Social Links</Title>
      <Description>
        You can add links to websites you want hiring managers to see! Perhaps
        It will be a link to your portfolio, LinkedIn profile, or personal
        website
      </Description>
      {controller.state.controllers.map((v) => (
        <LinkForm
          key={v.id}
          controller={v as LinkFormController}
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
