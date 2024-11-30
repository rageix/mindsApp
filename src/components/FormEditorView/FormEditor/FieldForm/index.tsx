import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import FormErrors from '@/components/FormErrors';
import Input from '@/components/Input';

import Checkbox from '@/components/Checkbox';
import { fieldRecord } from '@/types/Form';
import { PlusIcon } from 'lucide-react';
import Alert from '@/components/Alert';
import FieldFormController, {
  IForm,
} from '@/components/FormEditorView/FormEditor/FieldForm/FieldFormController';
import FieldOption from '@/components/FormEditorView/FormEditor/FieldForm/FieldOption';

interface IProps {
  controller: FieldFormController;
  onUpdate: () => void;
}

export default function FieldForm({ controller, onUpdate }: IProps) {
  controller.useController(() => {
    onUpdate();
  });

  const { form, state } = controller;

  console.log(state.errors);

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> field="type">Type</FormLabel>
        <div className="text-gray-400">{fieldRecord[form.type]}</div>
      </div>
      <div>
        <FormLabel<IForm> field="label">Label</FormLabel>
        <Input<IForm>
          field="label"
          errors={state.errors}
          value={form.label}
          onChange={controller.onChangeLabel}
        />
        <FormErrors<IForm>
          field="label"
          errors={state.errors}
        />
      </div>
      <div className="flex items-center">
        <Checkbox<IForm>
          field="isRequired"
          errors={state.errors}
          checked={form.isRequired}
          onChange={controller.onChangeIsRequired}
        />
        <FormLabel<IForm>
          field="isRequired"
          className="ml-3"
        >
          Is Required
        </FormLabel>
      </div>
      <div>
        <FormLabel<IForm> field="placeholder">Placeholder text</FormLabel>
        <Input<IForm>
          field="placeholder"
          errors={state.errors}
          value={form.placeholder}
          onChange={controller.onChangePlaceholder}
        />
        <FormErrors<IForm>
          field="placeholder"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm> field="selectOptions">Options</FormLabel>
        <div className="overflow-hidden bg-gray-700 px-4 py-4 shadow rounded-md sm:px-6 space-y-3">
          {controller.form.selectOptions.length === 0 && (
            <Alert variant="blue">No options found.</Alert>
          )}
          {controller.form.selectOptions.length > 0 && (
            <ul
              role="list"
              className="space-y-3"
            >
              {controller.form.selectOptions.map((v, i) => (
                <li
                  key={v.key}
                  className="px-3 py-4 overflow-hidden rounded-md bg-gray-800 shadow"
                >
                  <FieldOption
                    option={v}
                    onChange={(e) => controller.onChangeOptionValue(i, e)}
                    onClickDelete={() => controller.onClickRemoveOption(i)}
                    onClickMoveUp={() => controller.onClickMoveOptionUp(i)}
                    onClickMoveDown={() => controller.onClickMoveOptionDown(i)}
                  />
                </li>
              ))}
            </ul>
          )}
          <FormErrors<IForm>
            field="selectOptions"
            errors={state.errors}
          />
          <div className="flex justify-end">
            <Button
              variant="blue"
              onClick={controller.onClickAddOption}
              isInline
            >
              <PlusIcon className="me-1" />
              <span>Add Option</span>
            </Button>
          </div>
        </div>
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
