'use client';
import useCheckoutSession from '@/hooks/UseCheckoutSession';
import Loading from '@/components/Loading';
import useTeamId from '@/hooks/UseTeamId';
import { EPlan, EPlanInterval } from '@/types/IPlan';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import Alert from '@/components/Alert';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import { useRouter } from 'next/navigation';

if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
  alert('NEXT_PUBLIC_STRIPE_KEY is not set!');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '', {});

interface IProps {
  plan: EPlan;
}

export default function Checkout({ plan }: IProps) {
  const router = useRouter();

  const checkoutSession = useCheckoutSession({
    plan,
  });

  if (!checkoutSession.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  if (!checkoutSession.data) {
    return (
      <Alert variant="red">
        Failed to load checkout. Please contact support.
      </Alert>
    );
  }

  const { stripeSessionId, clientSecret } = checkoutSession.data;

  return (
    <Card>
      <CardBody>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{
            clientSecret,
            onComplete: () =>
              router.push(
                `/checkout/stripe/${stripeSessionId}`,
              ),
          }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </CardBody>
    </Card>
  );
}
