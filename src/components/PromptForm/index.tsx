import FormErrors from '../FormErrors';
import FormLabel from '@/components/FormLabel';
import Form from '@/components/Form';
import PromptFormController, {
  IForm,
} from '@/components/PromptForm/PromptFormController';
import Textarea from '@/components/Textarea';

interface IProps {
  controller: PromptFormController;
  disabled?: boolean;
}

export default function PromptForm({ controller, disabled }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <div>
        <FormLabel<IForm>
          field="prompt"
          className="sr-only"
        >
          Prompt
        </FormLabel>
        <Textarea<IForm>
          field="prompt"
          errors={state.errors}
          value={form.prompt}
          rows={3}
          placeholder="Add your prompt..."
          onChange={controller.onChangePrompt}
          defaultClassName="block w-full resize-vertical border-0 bg-transparent pb-2 mt-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          disabled={disabled}
        />
        <FormErrors<IForm>
          field="prompt"
          errors={state.errors}
        />
      </div>
    </Form>
  );
}
