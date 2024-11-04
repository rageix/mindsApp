import Modal from '@/components/Modal';
import { MongoId } from '@/types/MongoDocument';
import ProfileEditorController from '@/components/ProfilesView/ProfileEditor/ProfileEditorController';
import ProfileEditor from '@/components/ProfilesView/ProfileEditor';

interface IProps {
  controller: ProfileEditorController;
  show: boolean;
  onClose: () => void;
  id?: MongoId;
}

export default function ProfilesModal({
  controller,
  show,
  onClose,
  id,
}: IProps) {
  return (
    <Modal
      title={(id ? 'Edit' : 'New') + ' Profile'}
      open={show}
      onClose={onClose}
      disableClose={true}
      size="lg"
    >
      <ProfileEditor
        controller={controller}
        onUpdated={onClose}
      />
    </Modal>
  );
}
