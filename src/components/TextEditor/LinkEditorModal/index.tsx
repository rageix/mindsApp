import Modal from '@/components/Modal';
import LinkEditorForm from '../LinkEditorForm';
import LinkEditorController from '@/components/TextEditor/LinkEditorForm/LinkEditorController';
import Button from '@/components/Buttton';

interface IProps {
  open: boolean;
  onClose: (url?: string) => void;
  controller: LinkEditorController;
}

export default function LinkEditorModal({ open, onClose, controller }: IProps) {
  controller.useController((form) => {
    onClose(form.url);
  });

  return (
    <Modal
      title="Link editor"
      open={open}
      onClose={() => onClose()}
      size="sm"
    >
      <div className="flex flex-col gap-y-2">
        <LinkEditorForm controller={controller} />
        <div className="flex justify-end gap-x-2">
          <Button
            variant="link"
            onClick={() => onClose()}
            isInline
          >
            Cancel
          </Button>
          <Button
            variant="blue"
            onClick={() => onClose(controller.getForm().url)}
            isInline
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}
