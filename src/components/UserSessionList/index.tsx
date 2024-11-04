'use client';
import useSessions from '@/hooks/UseSessions';
import SessionList from '@/components/SessionList';
import { MongoId } from '@/types/MongoDocument';
import { deleteApiUserCurrentSessions } from '@/requests/api/user/current/sessions';

export default function UserSessionList() {
  const sessions = useSessions();

  async function onClickDelete(id: MongoId) {
    await deleteApiUserCurrentSessions({ ids: [id] });
    sessions.query.refetch();
  }

  return (
    <SessionList
      items={sessions.data}
      onClickDelete={onClickDelete}
    />
  );
}
