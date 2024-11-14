import Modal from '@/components/Modal';
import Logo from '@/components/Logo';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: IProps) {
  return (
    <Modal
      title="About"
      open={open}
      onClose={onClose}
      size="lg"
    >
      <div className="sm:p-16">
        <div className="flex justify-center">
          <div className="w-36 h-auto">
            <Logo />
          </div>
        </div>
        <div className="mt-6 sm:mt-12 text-center">
          Copyright &copy; 2024 and beyond RAGEIX LLC.
        </div>
      </div>
    </Modal>
  );
}
