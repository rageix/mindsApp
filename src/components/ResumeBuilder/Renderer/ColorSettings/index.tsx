import FormLabel from '@/components/FormLabel';
import ColorPicker from '@/components/ResumeBuilder/Renderer/ColorPicker';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';
import TooltipBox from '@/components/TooltipBox';
import Tooltip from '@/components/Tooltip';

interface IProps {
  controller: ResumeController;
}

export default function ColorSettings({ controller }: IProps) {
  const { primaryColorController, secondaryColorController } = controller.state;

  return (
    <div className="flex gap-x-2 justify-center w-full">
      <div>
        <FormLabel className="flex gap-x-1">
          <span>Primary color</span>
          <Tooltip size={15}>
            <TooltipBox>
              This is the main text color.
            </TooltipBox>
          </Tooltip>
        </FormLabel>
        <ColorPicker
          controller={primaryColorController}
          title="Primary color"
          titleText="Primary color"
        />
      </div>
      <div>
        <FormLabel className="flex gap-x-1">
          <span>Secondary color</span>
          <Tooltip size={15}>
            <TooltipBox>
              Not all templates support a secondary color. If it does
              it will affect the background and title colors.
            </TooltipBox>
          </Tooltip>
        </FormLabel>
        <ColorPicker
          controller={secondaryColorController}
          title="Scondary color"
          titleText="Scondary color"
        />
      </div>
    </div>
  );
}
