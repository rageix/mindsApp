import Modal from '@/components/Modal';
import Button from '@/components/Buttton';
import { useRouter } from 'next/navigation';

interface IProps {
  open: boolean;
}
export default function SubscriptionRequiredModal({ open }: IProps) {
  const router = useRouter();

  return (
    <Modal
      title="Subscription Required"
      variant="warning"
      open={open}
      onClose={() => null}
      disableClose
      size="sm"
    >
      <div className="mt-4 flex flex-col gap-y-3">
        <p className="text-sm text-gray-500">
          A subscription is required to access this feature.
        </p>
        <div>
          <Button
            variant="blue"
            onClick={() => router.push('/billing/plans')}
          >
            See Plans
          </Button>
        </div>
        <div>
          <Button
            variant="link"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </Modal>
  );
}
