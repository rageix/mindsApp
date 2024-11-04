'use client';
import MembersList from '@/components/MembersList';
import { useState } from 'react';
import { nanoid } from 'nanoid';
// import MemberForm from '@/components/MemberForm';
// import Card from '@/components/Card';
// import CardBody from '@/components/Card/CardBody';

export default function MembersView() {
  const [id, _setId] = useState(nanoid());
  return (
    <div className="max-w-3xl m-auto flex flex-col gap-y-12">
      {/*<Card>*/}
      {/*  <CardBody>*/}
      {/*    <div className="flex justify-center">*/}
      {/*      <MemberForm onUpdated={() => setId(nanoid())} />*/}
      {/*    </div>*/}
      {/*  </CardBody>*/}
      {/*</Card>*/}
      <MembersList id={id} />
    </div>
  );
}
