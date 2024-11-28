import FormBlock from '@/components/FormBlock';
import FormBlockBody from '@/components/FormBlock/FormBlockBody';
import SectionController from '@/components/PublicFormView/PublicFormEditor/Section/SectionController';
import Field from '@/components/PublicFormView/PublicFormEditor/Field';

interface IProps {
  controller: SectionController;
}

export default function Section({ controller }: IProps) {
  controller.useController();

  const { state } = controller;

  return (
    <FormBlock
      heading="Settings"
      description="Basic settings that belong to this card."
    >
      <FormBlockBody>
        {state.fieldControllers.map((v) => (
          <Field
            key={v.field.key}
            controller={v}
          />
        ))}
      </FormBlockBody>
    </FormBlock>
  );
}
