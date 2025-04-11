import Modal from '@/components/Modal';
import { MongoId } from '@/types/MongoDocument';
import ChatsList from '@/components/MyChatsView/ChatsList';

interface IProps {
  open: boolean;
  onClose: () => void;
  onOpenId: (_id: MongoId) => void;
  onNew: () => void;
}

export default function ChatsModal({ open, onClose, onOpenId, onNew }: IProps) {
  return (
    <Modal
      title="Chats"
      open={open}
      onClose={onClose}
      size="lg"
    >
      <ChatsList
        onOpenId={onOpenId}
        onNew={onNew}
      />
    </Modal>
  );
}
