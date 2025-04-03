'use client';
import FormErrors from '../FormErrors';
import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import PromptFormController, {
  IForm,
} from '@/components/PromptForm/PromptFormController';
import Textarea from '@/components/Textarea';

interface IProps {
  controller: PromptFormController;
}

export default function PromptForm({ controller }: IProps) {
  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> field="prompt">Prompt</FormLabel>
        <Textarea<IForm>
          field="prompt"
          errors={state.errors}
          value={form.prompt}
          onChange={controller.onChangePrompt}
        />
        <FormErrors<IForm>
          field="prompt"
          errors={state.errors}
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          disabled={!_.isEmpty(state.errors)}
          isInline
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}
