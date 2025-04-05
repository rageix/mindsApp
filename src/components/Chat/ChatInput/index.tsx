import ChatInputController, {
  IForm,
} from '@/components/Chat/ChatInput/ChatInputController';
import Textarea from '@/components/Textarea';
import { EModel } from '@/types/Model';
import Button from '@/components/Buttton';

interface IProps {
  model: EModel;
  controller: ChatInputController;
  onSubmit: (model: EModel, text: string, fileId?: string) => void;
}

export function ChatInput({ model, controller, onSubmit }: IProps) {
  controller.useController((form) => onSubmit(model, form.text, form.fileId));

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
