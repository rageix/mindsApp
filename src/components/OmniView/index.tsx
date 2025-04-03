'use client';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { useParams, useRouter } from 'next/navigation';
import Form from '@/components/Form';
import FormBlock from '@/components/FormBlock';
import Button from '@/components/Buttton';
import Alert from '@/components/Alert';
import { toast } from 'react-toastify';
import BackButton from '@/components/BackButton';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import CardFormController, { IForm } from './CardFormController';
import { postApiCards } from '@/requests/api/cards';
import useCard from '@/hooks/UseCard';
import _ from 'lodash';
import FormBlockBody from '@/components/FormBlock/FormBlockBody';
import DashboardPageHeader from '@/components/DashboardPageHeader';

export default function CardEditorView() {
  const [controller] = useState(new CardFormController());
  const { chatId } = useParams<{ chatId: string }>();
  const profile = useCard(cardId, teamId);
  const router = useRouter();
  controller.useController(async (form) => {
    const item = await postApiCards({ ...form, teamId: teamId });
    if (item) {
      router.replace(`/dashboard/${teamId}/cards/${item._id}`);
      toast.success('Card saved.');
    }
  });

  useEffect(() => {
    if (profile.initLoad) {
      if (profile.data) {
        controller.setForm(profile.data);
      }
    }
  }, [profile.initLoad, profile.data]);

  useEffect(() => {
    controller.reset();
  }, []);

  function back() {
    router.push(`/dashboard/${teamId}/cards`);
  }

  function onClickCancel() {
    if (!controller.state.dirty) {
      back();
      return;
    }
    if (confirm('Are you sure? Any unsaved data will be lost!')) {
      back();
    }
  }

  if (!profile.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const { form, state } = controller;

  return (
    <>
      <DashboardPageHeader title="Card Editor" />
      <BackButton onClick={onClickCancel} />
      <Card>
        <CardBody className="space-y-12">
          <Form
            onSubmit={controller.onSubmitForm}
            className="mt-3 space-y-12"
          >
            <FormBlock
              title="Settings"
              description="Basic settings that belong to this card."
            >
              <FormBlockBody>
                <FormLabel<IForm> field="name">Name</FormLabel>
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
              </FormBlockBody>
            </FormBlock>
            <FormBlock
              title="Card Settings"
              description="Basic settings for the card."
            >
              <FormBlockBody>
                <FormLabel<IForm> field="profileId">Profile</FormLabel>
                <div className="mt-2">
                {/*  empty */}
                </div>
                <FormErrors<IForm>
                  field="profileId"
                  errors={state.errors}
                />
              </FormBlockBody>
            </FormBlock>
            <div className="mt-6 flex flex-col space-y-3">
              {!_.isEmpty(state.errors) && (
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
                  disabled={!_.isEmpty(state.errors)}
                  isInline
                >
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}
