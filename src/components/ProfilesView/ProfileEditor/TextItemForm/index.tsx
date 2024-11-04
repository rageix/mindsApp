import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import Switch from '@/components/Switch';
import TextItemFormController, {
  IForm,
} from '@/components/ProfilesView/ProfileEditor/TextItemForm/TextItemFormController';
import Textarea from '@/components/Textarea';
import { ETextItemType } from '@/types/Profile';

interface IProps {
  controller: TextItemFormController;
  debug?: boolean;
}

export default function TextItemForm({ controller, debug }: IProps) {
  controller.useController();
  const { form, state } = controller;

  if (debug) {
    console.log('form.fieldname', form.fieldName, form.type, form.value);
  }

  return (
    <div>
      <div className="flex justify-between">
        <FormLabel>{form.fieldName}</FormLabel>
        {form.canDisable && (
          <Switch
            checked={form.enabled}
            onChange={controller.onChangeEnabled}
          />
        )}
      </div>
      <div>
        <div>
          {form.type === ETextItemType.Input && (
            <Input<IForm>
              field="value"
              errors={state.errors}
              value={form.value}
              onChange={controller.onChangeValue}
            />
          )}
          {form.type === ETextItemType.TextArea && (
            <Textarea<IForm>
              field="value"
              errors={state.errors}
              value={form.value}
              onChange={controller.onChangeValue}
            />
          )}
        </div>
        <FormErrors<IForm>
          field="value"
          errors={state.errors}
        />
      </div>
    </div>
  );
}
