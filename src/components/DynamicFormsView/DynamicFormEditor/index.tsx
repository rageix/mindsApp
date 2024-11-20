import ProfileEditorController from '@/components/ProfilesView/ProfileEditor/ProfileEditorController';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import CardTitle from '@/components/Card/CardTitle';
import EditableProfileFields from '@/components/ProfilesView/ProfileEditor/EditableProfileFields';
import TextItemForm from '@/components/ProfilesView/ProfileEditor/TextItemForm';
import AvatarItemForm from '@/components/ProfilesView/ProfileEditor/AvatarItemForm';
import ProfileItemForm from '@/components/ProfilesView/ProfileEditor/ProfileItemForm';
import SocialItemForm from '@/components/ProfilesView/ProfileEditor/SocialItemForm';
import CardHeader from '@/components/Card/CardHeader';
import Button from '@/components/Buttton';
import Alert from '@/components/Alert';
import { postApiProfiles } from '@/requests/api/profiles';

interface IProps {
  controller: ProfileEditorController;
  onUpdated: () => void;
}

export default function ProfileEditor({ controller, onUpdated }: IProps) {
  controller.useController(async (form) => {
    const item = await postApiProfiles(form);
    if (item) {
      onUpdated();
    }
  });
  const { state } = controller;

  return (
    <div className="flex flex-col space-y-6">
      <div className="hidden">{state.id}</div>
      <Card>
        <CardHeader>
          <CardTitle>Profile Properties</CardTitle>
        </CardHeader>
        <CardBody>
          <EditableProfileFields controller={state.profileFieldsController} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Profile Basics</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-col space-y-6">
          <TextItemForm controller={state.nameController} />
          <TextItemForm controller={state.titleController} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-col space-y-6">
          {(state.avatarControllers || []).map((v) => (
            <AvatarItemForm
              key={v.id}
              controller={v}
            />
          ))}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-col space-y-6">
          {(state.itemsControllers || []).map((v) => (
            <ProfileItemForm
              key={v.id}
              controller={v}
            />
          ))}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Extra Text</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-col space-y-6">
          <TextItemForm
            controller={state.bioController}
            debug
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Socials</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-col space-y-6">
          {(state.socialControllers || []).map((v) => (
            <SocialItemForm
              key={v.id}
              controller={v}
            />
          ))}
        </CardBody>
      </Card>
      <div className="flex flex-col space-y-3">
        {state.hasErrors && (
          <Alert variant="red">
            The form has errors. Please fix them and try to save again.
          </Alert>
        )}
        <div className="flex justify-end space-x-3">
          <Button
            variant="text"
            onClick={onUpdated}
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
    </div>
  );
}
