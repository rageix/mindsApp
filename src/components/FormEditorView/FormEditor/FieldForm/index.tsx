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
import useTheme from '@/hooks/UseTheme';
import { cn } from '@/util/Cn';
import { ETheme } from '@/common/Theme';
import Textarea from "@/components/Textarea";

interface IProps {
  controller: FieldFormController;
  onUpdate: () => void;
}

export default function FieldForm({ controller, onUpdate }: IProps) {
  const theme = useTheme();
  controller.useController(() => {
    onUpdate();
  });

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> field="type">Type</FormLabel>
        <div
          className={cn(
            theme === ETheme.light ? 'text-gray-500' : null,
            theme === ETheme.dark ? 'text-gray-400' : null,
          )}
        >
          {fieldRecord[form.type]}
        </div>
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
        <div
          className={cn(
            'overflow-hidden px-4 py-4 shadow rounded-md sm:px-6 space-y-3',
            theme === ETheme.light ? 'bg-gray-200' : null,
            theme === ETheme.dark ? 'bg-gray-700' : null,
          )}
        >
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
                  className={
                    cn('px-3 py-4 overflow-hidden rounded-md  shadow',
                      theme === ETheme.light ? 'bg-gray-300' : null,
                      theme === ETheme.dark ? 'bg-gray-800' : null,
                    )
                  }
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
      <div className="flex justify-end">
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
