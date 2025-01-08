import BuilderController from '@/components/ResumeBuilder/Builder/BuilderController';
import BuilderSection from '@/components/ResumeBuilder/Builder/Sections';

interface IProps {
  controller: BuilderController;
}

export default function Builder({ controller }: IProps) {
  controller.useController();
  return (
    <div>
      {(controller.state?.controllers || []).map((v) => (
        <BuilderSection
          key={v.id}
          controller={v}
        />
      ))}
    </div>
  );
}
