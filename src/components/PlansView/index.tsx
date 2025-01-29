'use client';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import Plans from './Plans';
import { EPlan } from '@/types/IPlan';
import { useRouter } from 'next/navigation';

export default function PlansView() {
  const router = useRouter();

  function onClick(plan: EPlan) {
    router.push(`/checkout?plan=${plan}`);
  }

  return (
    <>
      <Card>
        <CardBody>
          <Plans
            onClick={onClick}
          />
        </CardBody>
      </Card>
    </>
  );
}
