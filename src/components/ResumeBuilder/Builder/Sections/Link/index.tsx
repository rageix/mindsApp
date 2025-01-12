'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import Description from '@/components/ResumeBuilder/Builder/Sections/Description';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import LinkForm from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm';
import LinkFormController from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';
import FormList from '../FormList';
import AddFormButton from '@/components/ResumeBuilder/Builder/Sections/AddFormButton';

interface IProps {
  controller: SectionController;
}

export default function Link({ controller }: IProps) {
  controller.useController();

  return (
    <div>
      <Title title={controller.state.section.title} />
      <Description>
        You can add links to websites you want hiring managers to see! Perhaps
        It will be a link to your portfolio, LinkedIn profile, or personal
        website
      </Description>
      <FormList>
        {controller.state.controllers.map((v, i) => (
          <LinkForm
            key={v.id}
            controller={v as LinkFormController}
            onDuplicate={() => controller.onDuplicateIndex(i)}
            onDelete={() => controller.onDeleteIndex(i)}
          />
        ))}
      </FormList>
      <AddFormButton onClick={controller.onClickAddForm} />
    </div>
  );
}
