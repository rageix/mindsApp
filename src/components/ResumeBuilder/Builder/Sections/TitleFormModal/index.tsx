import Modal from '@/components/Modal';
import TitleFormController
  from '@/components/ResumeBuilder/Builder/Sections/TitleForm/TitleFormController';
import TitleForm from '@/components/ResumeBuilder/Builder/Sections/TitleForm';
import { ISectionTitle } from '@/types/Resume';

interface IProps {
  open: boolean;
  onClose: () => void;
  controller: TitleFormController,
  onSubmit: (form: ISectionTitle) =>void;
}

export default function TitleFormModal({
  open,
  onClose,
  controller,
  onSubmit
}: IProps) {
  return (
    <Modal
      title="Edit Title"
      open={open}
      onClose={onClose}
      size="sm"
    >
      <TitleForm
        controller={controller}
        onClickCancel={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
