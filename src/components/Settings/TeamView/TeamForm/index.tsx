import FormErrors from '../../../FormErrors';
import Input from '../../../Input';
import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import TeamFormController, {
  IForm,
} from '@/components/Settings/TeamView/TeamForm/TeamFormController';
import { postApiTeams } from '@/requests/api/teams';
import Form from '@/components/Form';
import Button from '@/components/Buttton';
import { toast } from 'react-toastify';

interface IProps {
  controller: TeamFormController;
  onUpdated: () => void;
}

export default function TeamForm({ controller, onUpdated }: IProps) {
  controller.useController(async (form) => {
    const team = await postApiTeams(form);
    if (team) {
      onUpdated();
      toast.success('Team information updated.');
    }
  });

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> htmlFor="name">Name</FormLabel>
        <div className="mt-2">
          <Input<IForm>
            field="name"
            errors={state.errors}
            value={form.name}
            onChange={controller.onChangeName}
          />
        </div>
        <FormErrors<IForm>
          field="name"
          errors={state.errors}
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          disabled={!_.isEmpty(state.errors)}
          isInline
        >
          Save
        </Button>
      </div>
    </Form>
  );
}
