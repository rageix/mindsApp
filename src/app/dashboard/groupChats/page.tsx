import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';
import NewGroupChatView from '@/components/NewGroupChatView';

export const metadata: Metadata = {
  title: pageTitle('Group Chats'),
};

export default function Page() {
  return <NewGroupChatView />;
}
