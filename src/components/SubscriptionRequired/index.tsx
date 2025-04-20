import SubscriptionRequiredModal from '@/components/SubscriptionRequiredModal';
import { useEffect, useState } from 'react';
import useSubscription from '@/hooks/UseSubscription';

export default function SubscriptionRequired() {
  const [isOpen, setIsOpen] = useState(false);
  const subscription = useSubscription();
  const hasSubscription = subscription.hasSubscription();

  useEffect(() => {
    if (hasSubscription) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
  }, [hasSubscription]);

  return <SubscriptionRequiredModal open={isOpen} />;
}
