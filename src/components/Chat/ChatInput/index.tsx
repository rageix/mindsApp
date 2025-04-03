import ChatInputController, {
  IForm,
} from '@/components/Chat/ChatInput/ChatInputController';
import Textarea from '@/components/Textarea';

interface IProps {
  controller: ChatInputController;
}

export function ChatInput({ controller }: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <Textarea<IForm>
      field="text"
      errors={state.errors}
      value={form.text}
      onChange={controller.onChangeText}
    ></Textarea>
  );
}
