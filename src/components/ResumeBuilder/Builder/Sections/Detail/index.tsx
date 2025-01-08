'use client';
import Title from '@/components/ResumeBuilder/Builder/Sections/Title';
import DetailForm from '@/components/ResumeBuilder/Builder/Sections/Detail/DetailForm';
import SectionController from '@/components/ResumeBuilder/Builder/Sections/SectionController';
import DetailFormController
  from '@/components/ResumeBuilder/Builder/Sections/Detail/DetailForm/DetailFormController';

interface IProps {
  controller: SectionController;
}

export default function Detail({ controller }: IProps) {
  return (
    <div>
      <Title>Personal Details</Title>
      {controller.state.controllers.map((v) => (
        <DetailForm
          key={v.id}
          controller={v as DetailFormController}
        />
      ))}
    </div>
  );
}
