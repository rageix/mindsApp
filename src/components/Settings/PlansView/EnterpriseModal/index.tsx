import Modal from '@/components/Modal';
import FormLink from '@/components/Link';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export default function EnterpriseModal({ open, onClose }: IProps) {
  return (
    <Modal
      size="xl"
      title="Enterprise Plan Information"
      open={open}
      onClose={onClose}
    >
      <p className="mt-6">Thanks for your interest in the Enterprise plan.</p>
      <p className="mt-6">
        We can accommodate <strong>any</strong> size team.
      </p>
      <p className="mt-6">
        To make sure we can deliver the best experience possible please send an
        email to:
      </p>
      <p className="mt-6">
        <FormLink href="mailto:support@cluvv.com">support@cluvv.com</FormLink>
      </p>
      <p className="mt-6">
        Include how many seats you would like, as well as any questions you
        have.
      </p>
      <p className="mt-6">
        Once we have your request we will be in touch in less than 24 hours
        excluding weekends and holidays.
      </p>
    </Modal>
  );
}
