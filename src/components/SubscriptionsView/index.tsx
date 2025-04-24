'use client';

import Loading from '@/components/Loading';
import useSubscription from '@/hooks/UseCurrentSubscription';
import Subscription from '@/components/SubscriptionsView/Subscription';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import { Wallet } from 'lucide-react';
import Button from '@/components/Buttton';
import Link from 'next/link';

export default function SubscriptionsView() {
  const subscription = useSubscription();

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

  if (subscription.data) {
    return <Subscription useCurrentSubscription={subscription} />;
  }

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-center">
            <Wallet
              className="text-gray-400"
              size="48"
            />
          </div>
          <div>
            <p className="text-center font-bold text-2xl">
              No Subscriptions Found
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/billing/plans">
                <Button
                  variant="blue"
                  isInline
                >
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
