'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import LinkFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Link/LinkForm/LinkFormController';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItemBody
  from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';

interface IProps {
  controller: LinkFormController;
}

export default function LinkForm({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <SectionItem>
      <SectionItemHeader onClick={controller.onChangeIsExpanded}>
        <div>{form.label || '(Not specified)'}</div>
        <div>{form.link || '(Not specified)'}</div>
      </SectionItemHeader>
      <SectionItemBody>
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
      </SectionItemBody>
    </SectionItem>
  );
}
