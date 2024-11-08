'use client';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import PlansView from '@/components/PlansView';
import { EPlan, EPlanInterval } from '@/types/IPlan';
import { useRouter } from 'next/navigation';
import useTeamId from '@/hooks/UseTeamId';

export default function SettingsPlansView() {
  const router = useRouter();
  const teamId = useTeamId();

  function onClick(plan: EPlan, period: EPlanInterval) {
    router.push(
      `/dashboard/${teamId}/settings/checkout?plan=${plan}&period=${period}`,
    );
  }

  return (
    <Card className="bg-gray-900">
      <CardBody>
        <PlansView
          // currentPlan={EPlan.Basic}
          onClick={onClick}
        />
      </CardBody>
    </Card>
  );
}
