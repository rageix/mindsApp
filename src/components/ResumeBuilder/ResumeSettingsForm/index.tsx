'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import ResumeSettingsFormController, {
  IForm,
} from '@/components/ResumeBuilder/ResumeSettingsForm/ResumeSettingsFormController';
import TooltipBox from '@/components/TooltipBox';
import Tooltip from '@/components/Tooltip';

interface IProps {
  controller: ResumeSettingsFormController;
}

export default function ResumeSettingsForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <div>
      <FormLabel<IForm>
        field="name"
        className="flex gap-x-1"
      >
        <span>Resume Name</span>
        <Tooltip size={15}>
          <TooltipBox>
            This is an identifier (like a file name) you can use to easily find
            it on the My Resumes page.
          </TooltipBox>
        </Tooltip>
      </FormLabel>
      <Input<IForm>
        field="name"
        errors={state.errors}
        value={form.name}
        onChange={controller.onChangeName}
        onBlur={controller.onBlurInput}
      />
    </div>
  );
}
