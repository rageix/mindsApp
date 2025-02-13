import FormLabel from '@/components/FormLabel';
import ColorPicker from '@/components/ResumeBuilder/Renderer/ColorPicker';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';

interface IProps {
  controller: ResumeController;
}

export default function ColorSettings({ controller }: IProps) {
  const { primaryColorController, secondaryColorController } = controller.state;

  return (
    <div className="flex gap-x-2 justify-center w-full">
      <div>
        <FormLabel>Primary color</FormLabel>
        <ColorPicker
          controller={primaryColorController}
          title="Primary color"
        />
      </div>
      <div>
        <FormLabel>Secondary color</FormLabel>
        <ColorPicker
          controller={secondaryColorController}
          title="Scondary color"
        />
      </div>
    </div>
  );
}
