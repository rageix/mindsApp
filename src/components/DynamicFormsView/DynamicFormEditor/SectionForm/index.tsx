import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import FormErrors from '@/components/FormErrors';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import SectionFormController, {
  IForm,
} from '@/components/DynamicFormsView/DynamicFormEditor/SectionForm/SectionFormController';

interface IProps {
  controller: SectionFormController;
  onUpdate: () => void;
}

export default function SectionForm({ controller, onUpdate }: IProps) {
  controller.useController(() => {
    onUpdate();
  });

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> field="heading">Heading</FormLabel>
        <Input<IForm>
          field="heading"
          errors={state.errors}
          value={form.heading}
          onChange={controller.onChangeHeading}
        />
        <FormErrors<IForm>
          field="heading"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm> field="description">Description</FormLabel>
        <Textarea<IForm>
          field="description"
          errors={state.errors}
          value={form.description}
          onChange={controller.onChangeDescription}
        />
        <FormErrors<IForm>
          field="description"
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
          Update
        </Button>
      </div>
    </Form>
  );
}
