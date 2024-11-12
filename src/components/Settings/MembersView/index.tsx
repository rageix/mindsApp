'use client';
import MembersList from '@/components/Settings/MembersList';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import useSubscription from '@/hooks/UseSubscription';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import MemberForm from '@/components/Settings/MemberForm';

export default function MembersView() {
  const [id, setId] = useState(nanoid());
  const subscription = useSubscription();

  return (
    <div className="max-w-3xl m-auto flex flex-col gap-y-12">
      {subscription.hasTeamPlan() && (
        <Card>
          <CardBody>
            <div className="flex justify-center">
              <MemberForm onUpdated={() => setId(nanoid())} />
            </div>
          </CardBody>
        </Card>
      )}
      <MembersList id={id} />
    </div>
  );
}
