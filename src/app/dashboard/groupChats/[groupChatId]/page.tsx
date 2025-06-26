import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';
import GroupChatView from '@/components/GroupChatView';

export const metadata: Metadata = {
  title: pageTitle('Group Chat'),
};

export default function Page() {
  return <GroupChatView />;
}
