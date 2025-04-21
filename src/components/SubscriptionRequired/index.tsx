import SubscriptionRequiredModal from '@/components/SubscriptionRequiredModal';
import { useEffect, useState } from 'react';
import useSubscription from '@/hooks/UseSubscription';

export default function SubscriptionRequired() {
  const [isOpen, setIsOpen] = useState(false);
  const subscription = useSubscription();
  const hasSubscription = subscription.hasSubscription();

  useEffect(() => {
    if (subscription.isLoaded()) {
      if (hasSubscription) {
        setIsOpen(false);
        return;
      }

      setIsOpen(true);
    }
  }, [subscription.isLoaded(), hasSubscription]);

  return <SubscriptionRequiredModal open={isOpen} />;
}
