'use client';

import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import useSubscription from '@/hooks/UseCurrentSubscription';
import { useEffect, useState } from 'react';
import SettingsPlansView from '@/components/Settings/PlansView';
import Subscription from '@/components/SubscriptionsView/Subscription';

enum EViews {
  Plans = 'plans',
  CurrentSubscription = 'currentSubscription',
}

export default function SubscriptionsView() {
  const teamId = useTeamId();
  const [view, setView] = useState<EViews>();

  const subscription = useSubscription(teamId);

  useEffect(() => {
    if (subscription.initLoad) {
      if (subscription.data) {
        setView(EViews.CurrentSubscription);
        return;
      }

      setView(EViews.Plans);
    }
  }, [subscription.initLoad]);

  if (!subscription.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  if (view === EViews.Plans) {
    return <SettingsPlansView />;
  }

  if (subscription.data) {
    return <Subscription useCurrentSubscription={subscription} />;
  }
}
