'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import LinkFormController, {IForm} from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';

interface IProps {
  controller: LinkFormController;
}

export default function LinkForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <div className="border">
      <div>
        <div>{form.label}</div>
        <div>{form.link}</div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <FormLabel<IForm> field="label">Label</FormLabel>
          <Input<IForm>
            field="label"
            errors={state.errors}
            value={form.label}
            onChange={controller.onChangeLabel}
          />
        </div>
        <div className="flex-1">
          <FormLabel<IForm> field="link">Link</FormLabel>
          <Input<IForm>
            field="link"
            errors={state.errors}
            value={form.link}
            onChange={controller.onChangeLink}
          />
        </div>
      </div>
    </div>
  );
}
