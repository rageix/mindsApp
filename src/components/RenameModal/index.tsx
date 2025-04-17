import Modal from '@/components/Modal';
import RenameFormController from '@/components/RenameForm/RenameFormController';
import RenameForm from '@/components/RenameForm';

interface IProps {
  open: boolean;
  onClose: () => void;
  controller: RenameFormController;
  onSubmit: (name: string) => void;}

export default function RenameModal({
  open,
  onClose,
  controller,
  onSubmit,
}: IProps) {
  return (
    <Modal
      title="Rename"
      open={open}
      onClose={onClose}
      size="sm"
    >
      <RenameForm
        controller={controller}
        onClickCancel={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
