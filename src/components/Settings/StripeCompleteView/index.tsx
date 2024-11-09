'use client';
import { useParams } from 'next/navigation';
import useCheckoutStatus from '@/hooks/UseCheckoutStatus';
import Loading from '@/components/Loading';
import CardBody from '@/components/Card/CardBody';
import Card from '@/components/Card';
import Button from '@/components/Buttton';
import Link from 'next/link';
import useTeamId from '@/hooks/UseTeamId';

export default function StripeCompleteView() {
  const teamId = useTeamId();
  const { sessionId } = useParams<{ sessionId: string }>();
  const checkoutStatus = useCheckoutStatus({ stripeSessionId: sessionId });

  if (!checkoutStatus.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  if (
    checkoutStatus.data?.status !== 'complete' ||
    checkoutStatus.data.paymentStatus !== 'paid'
  ) {
    return (
      <Card>
        <CardBody>
          <div>
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
              <div className="max-w-xl">
                <h1 className="text-base font-medium text-blue-600">Wooops!</h1>
                <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  Payment was not completed!
                </p>
                <p className="mt-2 text-base text-gray-500">
                  You can try and reload this page this might fix the issue. If
                  you continue to see this page please contact support at{' '}
                  <a
                    className="text-blue-600 hover:text-blue-500"
                    href="mailto:support@cluvv.com"
                  >
                    support@cluvv.com
                  </a>
                  .
                </p>

                <div className="mt-12 text-sm font-medium">
                  <Button
                    variant="blue"
                    onClick={checkoutStatus.reload}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
          <div className="max-w-xl">
            <h1 className="text-base font-medium text-blue-500">Thank you!</h1>
            <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Payment success!
            </p>
            <p className="mt-2 text-base text-gray-500">
              Your order is now complete. Thank you for your support!
            </p>
            <p className="mt-6">
              <Link href={`/dashboard/${teamId}/settings/subscriptions`}>
                <Button variant="link">View Subscriptions</Button>
              </Link>
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
