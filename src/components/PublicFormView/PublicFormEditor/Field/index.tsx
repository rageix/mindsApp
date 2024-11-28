import FormLabel from "@/components/FormLabel";
import Input from "@/components/Input";
import FormErrors from "@/components/FormErrors";
import FieldController, {IForm}
  from "@/components/PublicFormView/PublicFormEditor/Field/FieldController";
import { useMemo } from "react";
import { EFieldType } from "@/types/Form";
import Textarea from "@/components/Textarea";

interface IProps {
  controller: FieldController
}

export default function Field({controller}: IProps) {
  controller.useController();

  const input = useMemo(() => {

    switch (controller.field.type) {
      case EFieldType.Input:
      case EFieldType.Email:
        return (
          <Input<IForm>
            errors={state.errors}
            value={controller.form.value[0]}
            onChange={controller.onChangeInput}
          />
        );
        break;
      case EFieldType.TextArea:
        return (
          <Textarea<IForm>
            errors={state.errors}
            value={controller.form.value[0]}
            onChange={controller.onChangeTextArea}
          />
        );
        break;
     // todo: add others
    }

  }, [controller.field.key])


  const {state} = controller;

  return (
      <div>
        <FormLabel<IForm> field="value">{controller.field.label}</FormLabel>
        <div className="mt-2">
          {input}
        </div>
        <FormErrors<IForm>
          field="value"
          errors={state.errors}
        />
      </div>
  );
}
