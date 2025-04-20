'use client';
import Plans from './Plans';
import { EPlan } from '@/types/IPlan';
import { useRouter } from 'next/navigation';

export default function PlansView() {
  const router = useRouter();

  function onClick(plan: EPlan) {
    router.push(`/billing/checkout?plan=${plan}`);
  }

  return (
    <div>
      <Plans onClick={onClick} />
    </div>
  );
}
