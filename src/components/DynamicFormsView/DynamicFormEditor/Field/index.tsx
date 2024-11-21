import FieldController from '@/components/DynamicFormsView/DynamicFormEditor/Field/FieldController';

interface IProps {
  controller: FieldController;
}

export default function Field({ controller }: IProps) {
  controller.useController();

  return <div className="text-gray-900">{controller.form.type}</div>;
}
