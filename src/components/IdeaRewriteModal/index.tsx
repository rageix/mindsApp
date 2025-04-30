import Modal from '@/components/Modal';
import IdeaRewriteForm from '@/components/IdeaRewriteForm';
import IdeaRewriteFormController from '@/components/IdeaRewriteForm/IdeaRewriteFormController';

interface IProps {
  open: boolean;
  onClose: () => void;
  controller: IdeaRewriteFormController;
}

export default function IdeaRewriteModal({
  open,
  onClose,
  controller
}: IProps) {
  return (
    <Modal
      title="Idea Rewrite"
      open={open}
      onClose={onClose}
      size="lg"
    >
      <IdeaRewriteForm
        controller={controller}
        onClickCancel={onClose}
      />
    </Modal>
  );
}
