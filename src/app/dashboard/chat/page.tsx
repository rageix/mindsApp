import { Metadata } from 'next';
import { pageTitle } from '@/types/PageTitle';
import ChatView from '@/components/ChatView';

export const metadata: Metadata = {
  title: pageTitle('Chat'),
};

export default function Page() {
  return <ChatView />;
}
