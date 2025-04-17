'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import Form from '@/components/Form';
import _ from 'lodash';
import Alert from '@/components/Alert';
import Button from '@/components/Buttton';
import RenameFormController, {IForm} from '@/components/RenameForm/RenameFormController';

interface IProps {
  controller: RenameFormController;
  onClickCancel: () => void;
  onSubmit: (name: string) => void;
}

export default function RenameForm({
  controller,
  onClickCancel,
  onSubmit,
}: IProps) {
  controller.useController((form) => onSubmit(form.name));

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <div className="flex-1">
          <FormLabel<IForm> field="name">Name</FormLabel>
          <Input<IForm>
            field="name"
            errors={state.errors}
            value={form.name}
            onChange={controller.onChangeName}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col space-y-3">
        {!_.isEmpty(state.errors) && (
          <Alert variant="red">
            The form has errors. Please fix them and try to save again.
          </Alert>
        )}
        <div className="flex items-center justify-end gap-x-2">
          <Button
            variant="link"
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
