import FormErrors from '../../FormErrors';
import _ from 'lodash';
import Form from '@/components/Form';
import Button from '@/components/Buttton';
import MemberFormController, {
  IForm,
} from '@/components/Settings/MemberForm/MemberFormController';
import { postApiMembers } from '@/requests/api/members';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { useMemo, useState } from 'react';
import FormLabel from '@/components/FormLabel';
import { PlusIcon } from 'lucide-react';
import useTeamId from '@/hooks/UseTeamId';
import { roleSelectOptions } from '@/common/SelectOptions';
import { toast } from 'react-toastify';

interface IProps {
  onUpdated: () => void;
}

export default function MemberForm({ onUpdated }: IProps) {
  const teamId = useTeamId();
  const [controller] = useState(new MemberFormController());
  controller.useController(async (form) => {
    const member = await postApiMembers({ ...form, teamId });
    if (member) {
      onUpdated();
      controller.reset();
      toast.success('Invite email sent.');
    }
  });

  const { form, state } = controller;

  const selectedRoleOption = useMemo(
    () => roleSelectOptions.find((v) => v.value === form.role),
    [form.role],
  );

  return (
    <Form
      onSubmit={controller.onSubmitForm}
      className="!space-y-0 flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 sm:gap-x-3 max-w-sm sm:max-w-4xl"
    >
      <div className="grow-1">
        <FormLabel<IForm> field="inviteEmail">Email</FormLabel>
        <Input<IForm>
          field="inviteEmail"
          errors={state.errors}
          value={form.inviteEmail}
          onChange={controller.onChangeInviteEmail}
        />

        <FormErrors<IForm>
          field="inviteEmail"
          errors={state.errors}
        />
      </div>
      <div className="shrink-0 xs:shrink-1">
        <FormLabel<IForm> field="role">Role</FormLabel>
        <Select
          options={roleSelectOptions}
          value={selectedRoleOption}
          onChange={controller.onChangeRole}
          className="w-auto sm:w-28"
        />
      </div>
      <div className="sm:shrink-0">
        <FormLabel<IForm>
          field="role"
          className="hidden sm:block"
        >
          &nbsp;
        </FormLabel>

        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          className="w-full"
          disabled={!_.isEmpty(state.errors)}
          isInline
        >
          <PlusIcon />
          <span className="st-1">New Member</span>
        </Button>
      </div>
    </Form>
  );
}
