import FormBlock from '@/components/FormBlock';
import FormBlockBody from '@/components/FormBlock/FormBlockBody';
import SectionController from '@/components/PublicFormView/PublicFormEditor/Section/SectionController';
import Field from '@/components/PublicFormView/PublicFormEditor/Field';

interface IProps {
  controller: SectionController;
}

export default function Section({ controller }: IProps) {
  controller.useController();

  const { state, section } = controller;

  return (
    <FormBlock
      heading={section.heading}
      description={section.description}
    >
      <FormBlockBody>
        <div className="space-y-3">
        {state.fieldControllers.map((v) => (
          <Field
            key={v.field.key}
            controller={v}
          />
        ))}
        </div>
      </FormBlockBody>
    </FormBlock>
  );
}
