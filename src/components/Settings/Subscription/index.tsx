'use client';

import CardBody from '@/components/Card/CardBody';
import Card from '@/components/Card';
import FormattedDate from '@/components/FormattedDate';
import TextBlock from '@/components/Settings/Subscription/TextBlock';
import Button from '@/components/Buttton';
import { PLAN_INTERVALS, PLANS } from '@/types/IPlan';
import { formatAsMoney } from '@/util/FormatAsMoney';
import { TUseCurrentSubscription } from '@/hooks/UseCurrentSubscription';

interface IProps {
  useCurrentSubscription: TUseCurrentSubscription;
}

export default function Subscription({ useCurrentSubscription }: IProps) {
  if (!useCurrentSubscription.data) {
    return null;
  }

  const subscription = useCurrentSubscription.data;

  return (
    <Card>
      <CardBody>
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-white">
              Active Subscription
            </h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-400">
              Details about your subscription.
            </p>
          </div>
          <div className="mt-6 border-t border-white/10">
            <dl className="divide-y divide-white/10">
              <TextBlock title="Started On">
                <FormattedDate
                  value={subscription.createdAt}
                  time={false}
                />
              </TextBlock>
              <TextBlock title="Plan">{PLANS[subscription.plan]}</TextBlock>
              <TextBlock title="Interval">
                {PLAN_INTERVALS[subscription.interval]}
              </TextBlock>
              <TextBlock title="Rate">
                {formatAsMoney(subscription.subtotal / 100)}
              </TextBlock>
              {subscription.canceledAt && (
                <TextBlock title="Cancled On">
                  <FormattedDate
                    value={subscription.canceledAt}
                    time={false}
                  />
                </TextBlock>
              )}
              {subscription.expiresAt && (
                <TextBlock title="Expires On">
                  <FormattedDate
                    value={subscription.expiresAt}
                    time={false}
                  />
                </TextBlock>
              )}
            </dl>
          </div>
          <div className="border-t border-white/10 pt-6">
            {!subscription.canceledAt && (
              <Button
                variant="red"
                isInline
                onClick={useCurrentSubscription.cancel}
              >
                Cancel Subscription
              </Button>
            )}
            {subscription.canceledAt && (
              <Button
                variant="green"
                isInline
                onClick={useCurrentSubscription.resume}
              >
                Resume Subscription
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
