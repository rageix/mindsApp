'use client';
import Form from '@/components/Form';
import _ from 'lodash';
import Button from '@/components/Buttton';
import IdeaRewriteFormController, {IForm} from '@/components/IdeaRewriteForm/IdeaRewriteFormController';
import Textarea from '@/components/Textarea';

interface IProps {
  controller: IdeaRewriteFormController;
  onClickCancel: () => void
}

export default function IdeaRewriteForm({
  controller,
  onClickCancel
}: IProps) {
  controller.useController();

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <div className="flex-1">
          <Textarea<IForm>
            field="text"
            errors={state.errors}
            value={form.text}
            onChange={controller.onChangeText}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col space-y-3">
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
            onClick={() =>
              navigator.clipboard.writeText(
                form.text,
              )
            }
          >
            Copy
          </Button>
        </div>
      </div>
    </Form>
  );
}
