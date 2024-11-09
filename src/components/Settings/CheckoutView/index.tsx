'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import useTeamId from '@/hooks/UseTeamId';
import { EPlan, EPlanInterval } from '@/types/IPlan';
import Checkout from './Checkout';

export default function SettingsCheckoutView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = useTeamId();
  const plan = searchParams.get('plan') as EPlan;
  const period = searchParams.get('period') as EPlanInterval;

  if (!plan || !period) {
    alert(
      'This page did not receive valid values, we are going to redirect you back to the pricing page. If this continues to happen please contact support.',
    );
    router.push(`/dashboard/${teamId}/settings/plans`);
    return null;
  }

  return (
    <Checkout
      plan={plan}
      period={period}
    />
  );
}
