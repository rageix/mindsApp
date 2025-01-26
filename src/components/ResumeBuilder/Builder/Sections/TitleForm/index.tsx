'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import TitleFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/TitleForm/TitleFormController';
import Form from '@/components/Form';
import _ from 'lodash';
import Alert from '@/components/Alert';
import Button from '@/components/Buttton';
import { ISectionTitle } from '@/types/Resume';

interface IProps {
  controller: TitleFormController;
  onClickCancel: () => void;
  onSubmit: (form: ISectionTitle) => void;
}

export default function TitleForm({
  controller,
  onClickCancel,
  onSubmit,
}: IProps) {
  controller.useController((form) => onSubmit(form));

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <FormRow>
        <div className="flex-1">
          <FormLabel<IForm> field="title">Title</FormLabel>
          <Input<IForm>
            field="title"
            errors={state.errors}
            value={form.title}
            onChange={controller.onChangeTitle}
          />
        </div>
      </FormRow>
      <div className="mt-6 flex flex-col space-y-3">
        {!_.isEmpty(state.errors) && (
          <Alert variant="red">
            The form has errors. Please fix them and try to save again.
          </Alert>
        )}
        <div className="flex items-center justify-end gap-x-6">
          <Button
            variant="text"
            onClick={onClickCancel}
            isInline
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="blue"
            disabled={!_.isEmpty(state.errors)}
            isInline
          >
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
