import ChatInputController, {
  IForm,
} from '@/components/ChatInput/ChatInputController';
import Textarea from '@/components/Textarea';
import Button from '@/components/Buttton';
import { ArrowUpIcon } from 'lucide-react';

interface IProps {
  controller: ChatInputController;
  onSubmit: () => void;
}

export function ChatInput({ controller, onSubmit }: IProps) {
  controller.useController(() => onSubmit());

  const { form, state } = controller;

  return (
    <div className="relative w-full">
      <Textarea<IForm>
        field="text"
        errors={state.errors}
        value={form.text}
        onChange={controller.onChangeText}
        placeholder="Type your question here..."
        className="!outline-blue-400 !rounded-xl !bg-gray-100 !p-3 !outline-2 focus:!outline-blue-600"
      ></Textarea>
      <div className="absolute right-3 bottom-3">
        <Button
          variant="blue"
          className="!rounded-full !p-0 size-8"
          onClick={() => controller.onClickSubmit()}
          isInline
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  );
}
