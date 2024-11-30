'use client';
import { redirect } from 'next/navigation';
import useTeamId from '@/hooks/UseTeamId';

export default function Page() {
  const teamId = useTeamId();
  redirect(`/dashboard/${teamId}/forms`);
}
