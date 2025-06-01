import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';
import NewChatView from '@/components/NewChatView';

export const metadata: Metadata = {
  title: pageTitle('Chat'),
};

export default function Page() {
  return <NewChatView />;
}
