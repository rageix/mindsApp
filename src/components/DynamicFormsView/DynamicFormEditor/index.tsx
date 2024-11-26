import DynamicFormEditorController from '@/components/DynamicFormsView/DynamicFormEditor/DynamicFormEditorController';
import Section from '@/components/DynamicFormsView/DynamicFormEditor/Section';
import Button from '@/components/Buttton';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import FormBlock from '@/components/FormBlock';
import FormBlockBody from '@/components/FormBlock/FormBlockBody';
import _ from 'lodash';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import useTeamId from '@/hooks/UseTeamId';
import SettingsForm from '@/components/DynamicFormsView/DynamicFormEditor/SettingsForm';
import { PlusIcon } from 'lucide-react';

interface IProps {
  controller: DynamicFormEditorController;
  onUpdated: () => void;
}

export default function DynamicFormEditor({ controller, onUpdated }: IProps) {
  const router = useRouter();
  const { state } = controller;
  const teamId = useTeamId();

  console.log(onUpdated);

  function back() {
    router.push(`/dashboard/${teamId}/cards`);
  }

  function onClickCancel() {
    // if (!controller.state.dirty) {
    //   back();
    //   return;
    // }
    if (confirm('Are you sure? Any unsaved data will be lost!')) {
      back();
    }
  }

  if (!controller.state.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardBody className="space-y-12">
          <div
           className="mt-3 space-y-12"
          >
            <FormBlock
              heading="Settings"
              description="Basic settings that belong to this dynamic form."
            >
              <FormBlockBody>
                {controller.state.settingsController && (
                  <SettingsForm
                    controller={controller.state.settingsController}
                  />
                )}
              </FormBlockBody>
            </FormBlock>
            <FormBlock
              heading="Form Builder"
              description="Build your form"
            >
              <FormBlockBody>
                <div className="flex flex-col space-y-6">
                  <div className="mt-6 space-y-3">
                    {state.sectionControllers.map((v, i) => (
                      <Section
                        key={v.id}
                        controller={v}
                        // onClickEdit={() => controller.onEditSection(i)}
                        onClickDelete={() => controller.onClickDeleteSection(i)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="blue"
                      onClick={controller.onClickNewSection}
                      isInline
                    >
                      <PlusIcon className="me-1" />
                      <span>Add Section</span>
                    </Button>
                  </div>
                </div>
              </FormBlockBody>
            </FormBlock>
            <div className="mt-6 flex flex-col space-y-3">
              {!_.isEmpty(state.hasErrors) && (
                <Alert variant="red">
                  The form has errors. Please fix them and try to save again.
                </Alert>
              )}
              <div className="flex items-center justify-end gap-x-6">
                <Button
                  variant="text"
                  onClick={onClickCancel}
                  isInline
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="blue"
                  disabled={!_.isEmpty(state.hasErrors)}
                  isInline
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
