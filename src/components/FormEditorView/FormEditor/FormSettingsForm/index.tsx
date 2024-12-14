'use client';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import FormSettingsFormController, {
  IForm,
} from './FormSettingsFormController';
import Form from '@/components/Form';
import Button from "@/components/Buttton";
import _ from "lodash";

interface IProps {
  controller: FormSettingsFormController;
  onUpdate: () => void;
}

export default function FormSettingsForm({ controller, onUpdate }: IProps) {
  controller.useController(() => {
    onUpdate();
  });

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div className="space-y-6">
        <div>
          <FormLabel<IForm> field="completionUrl">Completion Url</FormLabel>
          <div className="mt-2">
            <Input<IForm>
              field="completionUrl"
              errors={state.errors}
              value={form.completionUrl}
              onChange={controller.onChangeCompletionUrl}
            />
          </div>
          <FormErrors<IForm>
            field="completionUrl"
            errors={state.errors}
          />
        </div>
        <div>
          <FormLabel<IForm> field="postbackUrl">Postback Url</FormLabel>
          <div className="mt-2">
            <Input<IForm>
              field="postbackUrl"
              errors={state.errors}
              value={form.postbackUrl}
              onChange={controller.onChangePostbackUrl}
            />
          </div>
          <FormErrors<IForm>
            field="postbackUrl"
            errors={state.errors}
          />
        </div>
        <div>
          <FormLabel<IForm> field="googleAnalyticsId">
            Google Analytics Id
          </FormLabel>
          <div className="mt-2">
            <Input<IForm>
              field="googleAnalyticsId"
              errors={state.errors}
              value={form.googleAnalyticsId}
              onChange={controller.onChangeGoogleAnalyticsId}
            />
          </div>
          <FormErrors<IForm>
            field="googleAnalyticsId"
            errors={state.errors}
          />
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
      </div>
    </Form>
  );
}
