'use client';
import FormErrors from '../FormErrors';
import Input from '../Input';
import { useEffect, useState } from 'react';
import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import UserAccountFormController, {
  IForm,
} from '@/components/UserAccountForm/UserAccountFormController';
import { toast } from 'react-toastify';
import { postApiUserCurrent } from '@/requests/api/user/current';
import userService from '@/services/UserService';
import useUser from '@/hooks/UseUser';

export default function UserAccountForm() {
  const [controller] = useState(new UserAccountFormController());
  const user = useUser();

  // const path = usePathname();
  controller.useController(async (form) => {
    const response = await postApiUserCurrent(form);

    if (!response) {
      return;
    }

    toast.success('Your profile was updated.');
    userService.reload();
  });

  useEffect(() => {
    if (user.data) {
      controller.setForm(user.data);
    }
  }, [user.data]);

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> field="name">Name</FormLabel>
        <Input<IForm>
          field="name"
          errors={state.errors}
          value={form.name}
          onChange={controller.onChangeName}
        />
        <FormErrors<IForm>
          field="name"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel<IForm> field="email">Email</FormLabel>
        <Input<IForm>
          field="email"
          errors={state.errors}
          value={form.email}
          onChange={controller.onChangeEmail}
        />
        <FormErrors<IForm>
          field="email"
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
