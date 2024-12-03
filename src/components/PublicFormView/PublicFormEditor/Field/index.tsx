import FormLabel from '@/components/FormLabel';
import FormErrors from '@/components/FormErrors';
import FieldController, {
  IForm,
} from '@/components/PublicFormView/PublicFormEditor/Field/FieldController';
import { ReactElement } from 'react';
import { EFieldType } from '@/types/Form';
import FieldInput from '@/components/PublicFormView/PublicFormEditor/Field/Input';
import FieldTextarea from '@/components/PublicFormView/PublicFormEditor/Field/Textarea';
import FieldSelect from '@/components/PublicFormView/PublicFormEditor/Field/Select';
import FieldFile from '@/components/PublicFormView/PublicFormEditor/Field/File';
import FieldDate from '@/components/PublicFormView/PublicFormEditor/Field/Date';

interface IProps {
  controller: FieldController;
}

export default function Field({ controller }: IProps) {
  controller.useController();
  const { state, field } = controller;

  let input: ReactElement | null = null;
  switch (controller.field.type) {
    case EFieldType.Input:
    case EFieldType.Email:
      input = <FieldInput controller={controller} />;
      break;
    case EFieldType.TextArea:
      input = <FieldTextarea controller={controller} />;
      break;
    case EFieldType.Select:
      input = <FieldSelect controller={controller} />;
      break;
    case EFieldType.File:
      input = <FieldFile controller={controller} />;
      break;
    case EFieldType.Date:
      input = <FieldDate controller={controller} />;
  }

  return (
    <div>
      <FormLabel<IForm> field="values">
        <span>{field.label}</span>
        {field.isRequired &&
          <span className="text-red-400">
          <span className="sr-only">Required field</span>
            *
          </span>
        }
      </FormLabel>
      <div className="mt-2">
        {input}
      </div>
      <FormErrors<IForm>
        field="values"
        errors={state.errors}
      />
    </div>
  );
}
