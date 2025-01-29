'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { EPlan } from '@/types/IPlan';
import Checkout from './Checkout';

export default function CheckoutView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') as EPlan;

  if (!plan) {
    alert(
      'This page did not receive valid values, we are going to redirect you back to the plans page. If this continues to happen please contact support.',
    );
    router.push(`/plans`);
    return null;
  }

  return (
    <Checkout
      plan={plan}
    />
  );
}
