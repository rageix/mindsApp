import Modal from '@/components/Modal';
import IdeaBoardsList from '@/components/IdeaBoardsView/IdeaBoardsList';
import { MongoId } from '@/types/MongoDocument';

interface IProps {
  open: boolean;
  onClose: () => void;
  onOpenId: (_id: MongoId) => void;
}

export default function ImageUploadModal({
  open,
  onClose,
  onOpenId
}: IProps) {
  return (
    <Modal
      title="Idea Boards"
      open={open}
      onClose={onClose}
      size="lg"
    >
      <IdeaBoardsList onOpenId={onOpenId} />
    </Modal>
  );
}
