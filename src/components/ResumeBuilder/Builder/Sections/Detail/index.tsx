'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import DetailForm from '@/components/ResumeBuilder/Builder/Sections/Detail/DetailForm';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import DetailFormController from '@/components/ResumeBuilder/Builder/Sections/Detail/DetailForm/DetailFormController';
import FormList from '../FormList';
import Description
  from '@/components/ResumeBuilder/Builder/Sections/Description';

interface IProps {
  controller: SectionController;
}

export default function Detail({ controller }: IProps) {
  return (
    <div>
      <Title menu={false} />
      <Description>
        Basic details about you.
      </Description>
      <FormList>
        {controller.state.controllers.map((v) => (
          <DetailForm
            key={v.id}
            controller={v as DetailFormController}
          />
        ))}
      </FormList>
    </div>
  );
}
