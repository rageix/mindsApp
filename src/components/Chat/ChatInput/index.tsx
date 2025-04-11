import ChatInputController, {
  IForm,
} from '@/components/Chat/ChatInput/ChatInputController';
import Textarea from '@/components/Textarea';
import Button from '@/components/Buttton';

interface IProps {
  controller: ChatInputController;
  onSubmit: () => void;
}

export function ChatInput({ controller, onSubmit }: IProps) {
  controller.useController(() => onSubmit());

  const { form, state } = controller;

  return (
    <div>
      <Textarea<IForm>
        field="text"
        errors={state.errors}
        value={form.text}
        onChange={controller.onChangeText}
        placeholder="What you want to ask."
      ></Textarea>
      <div className="flex justify-end mt-3">
        <Button
          variant="sky"
          onClick={() => controller.onClickSubmit()}
          isInline
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
