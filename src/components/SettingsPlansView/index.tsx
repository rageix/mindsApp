'use client';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import PlansView from '@/components/PlansView';
import { EPlanId } from '@/types/IPlan';

export default function SettingsPlansView() {
  return (
    <Card className="bg-gray-900">
      <CardBody>
        <PlansView currentPlan={EPlanId.Freelancer} />
      </CardBody>
    </Card>
  );
}
