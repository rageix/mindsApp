'use client';
import { useState } from 'react';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import ProfileEditorController from '@/components/ProfilesView/ProfileEditor/ProfileEditorController';
import { useParams, useRouter } from 'next/navigation';
import EditableProfileFields from '@/components/ProfilesView/ProfileEditor/EditableProfileFields';
import Form from '@/components/Form';
import FormBlock from '@/components/FormBlock';
import TextItemForm from '@/components/ProfilesView/ProfileEditor/TextItemForm';
import AvatarItemForm from '@/components/ProfilesView/ProfileEditor/AvatarItemForm';
import ProfileItemForm from '@/components/ProfilesView/ProfileEditor/ProfileItemForm';
import Button from '@/components/Buttton';
import Alert from '@/components/Alert';
import { postApiProfiles } from '@/requests/api/profiles';
import { toast } from 'react-toastify';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import SocialItemForm from '@/components/ProfilesView/ProfileEditor/SocialItemForm';
import BackButton from '@/components/BackButton';
import FormBlockBody from '@/components/FormBlock/FormBlockBody';
import DashboardPageHeader from '@/components/DashboardPageHeader';

export default function ProfileEditorView() {
  const { profileId } = useParams<{ profileId: string }>();
  const teamId = useTeamId();
  const [controller] = useState(new ProfileEditorController(profileId, teamId));
  const router = useRouter();
  controller.useController(async (form) => {
    const item = await postApiProfiles({ ...form, teamId: teamId });
    if (item && !form._id) {
      console.log('replace');
      router.replace(`/dashboard/${teamId}/profiles/${item._id}`, {
        scroll: true,
      });
    }
    toast.success('Profile saved.');
  });

  function onClickCancel() {
    if (confirm('Are you sure? Any unsaved data will be lost!')) {
      router.push(`/dashboard/${teamId}/profiles`);
    }
  }

  const { state } = controller;

  if (!state.initLoad) {
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
      <DashboardPageHeader title="Profile Editor" />
      <BackButton
        onClick={() => router.push(`/dashboard/${teamId}/profiles`)}
      />
      <Form
        onSubmit={controller.onClickSave}
        className="mt-3"
      >
        <Card>
          <CardBody className="space-y-12">
            <FormBlock
              title="Settings"
              description="Basic settings that belong to this profile."
            >
              <FormBlockBody className="flex flex-col gap-y-6">
                <EditableProfileFields
                  controller={state.profileFieldsController}
                />
              </FormBlockBody>
            </FormBlock>
            <FormBlock
              title="Profile Basics"
              description="Basic information about you."
            >
              <FormBlockBody className="flex flex-col gap-y-6">
                <TextItemForm controller={state.nameController} />
                <TextItemForm controller={state.titleController} />
                {state.itemsControllers.map((v) => (
                  <ProfileItemForm
                    key={v.id}
                    controller={v}
                  />
                ))}
              </FormBlockBody>
            </FormBlock>
            <FormBlock
              title="Bio"
              description="A short blurb about yourself and what you do, or whatever usefull text you think would be great on the front of your card."
            >
              <FormBlockBody>
                <TextItemForm controller={state.bioController} />
              </FormBlockBody>
            </FormBlock>
            <FormBlock
              title="Images"
              description="Images that will be displayed."
            >
              <FormBlockBody>
                {state.avatarControllers.map((v) => (
                  <AvatarItemForm
                    key={v.id}
                    controller={v}
                  />
                ))}
              </FormBlockBody>
            </FormBlock>

            <FormBlock
              title="Socials"
              description="Links to your various social accounts."
            >
              <FormBlockBody className="flex flex-col gap-y-6">
                {state.socialControllers.map((v) => (
                  <SocialItemForm
                    key={v.id}
                    controller={v}
                  />
                ))}
              </FormBlockBody>
            </FormBlock>
            <div className="mt-6 flex flex-col space-y-3">
              {state.hasErrors && (
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
                  variant="blue"
                  onClick={controller.onClickSave}
                  isInline
                >
                  Save
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Form>
    </>
  );
}
