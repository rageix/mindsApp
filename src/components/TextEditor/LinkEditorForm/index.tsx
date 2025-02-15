'use client';

import FormLabel from '@/components/FormLabel';
import Form from '@/components/Form';
import LinkEditorController, {IForm}
  from '@/components/TextEditor/LinkEditorForm/LinkEditorController';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';

interface IProps {
 controller: LinkEditorController,
}

export default function LinkEditorForm({controller}: IProps) {

  const { form, state } = controller;

  return (
    <Form
      onSubmit={controller.onSubmitForm}
    >
      <div>
        <FormLabel<IForm> field="url">Url</FormLabel>
        <Input<IForm>
          field="url"
          errors={state.errors}
          value={form.url}
          onChange={controller.onChangeUrl}
          isClearable={true}
          onClear={controller.onClearUrl}
        />
        <FormErrors<IForm>
          field="url"
          errors={state.errors}
        />
      </div>
    </Form>
  );
}
