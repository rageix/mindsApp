'use client';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import Plans from '@/components/Plans';
import { EPlan, EPlanInterval } from '@/types/IPlan';
import { useRouter } from 'next/navigation';
import useTeamId from '@/hooks/UseTeamId';
import { useState } from 'react';
import EnterpriseModal from '@/components/Settings/PlansView/EnterpriseModal';

export default function SettingsPlansView() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const teamId = useTeamId();

  function onClick(plan: EPlan, period: EPlanInterval) {
    if (plan === EPlan.Enterprise) {
      setOpen(true);
      return;
    }

    router.push(
      `/dashboard/${teamId}/settings/checkout?plan=${plan}&period=${period}`,
    );
  }

  return (
    <>
      <Card className="bg-gray-900">
        <CardBody>
          <Plans
            // currentPlan={EPlan.Basic}
            onClick={onClick}
          />
        </CardBody>
      </Card>
      <EnterpriseModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
