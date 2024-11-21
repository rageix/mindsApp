import DynamicFormEditorController from '@/components/DynamicFormsView/DynamicFormEditor/DynamicFormEditorController';
import { postApiDynamicForms } from '@/requests/api/dynamicForms';
import Section from '@/components/DynamicFormsView/DynamicFormEditor/Section';
import Button from '@/components/Buttton';

interface IProps {
  controller: DynamicFormEditorController;
  onUpdated: () => void;
}

export default function DynamicFormEditor({ controller, onUpdated }: IProps) {
  const { state } = controller;

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <Button
          variant="blue"
          onClick={controller.onClickNewSection}
        >
          Add Section
        </Button>
      </div>
      <div className="mt-6">
        {state.sectionControllers.map((v) => (
          <Section
            key={v.id}
            controller={v}
          />
        ))}
      </div>
    </div>
  );
}
